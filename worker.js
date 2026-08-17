const PLAN_BY_LINK = {
  plink_1U5PrbIYwgpxGEoZNlgC660s: "monthly",
  plink_1U5PrfIYwgpxGEoZKRm8HAsv: "yearly",
  plink_1U5PjuIYwgpxGEoZkgP5d0IL: "claimpack",
};

const responseJson = (data, status = 200) => Response.json(data, {
  status,
  headers: {
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  },
});

function bytesToHex(bytes) {
  return [...new Uint8Array(bytes)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

async function verifyStripeSignature(payload, header, secret) {
  if (!header || !secret) return false;
  const parts = header.split(",").map((part) => part.trim().split("="));
  const timestamp = parts.find(([key]) => key === "t")?.[1];
  const signatures = parts
    .filter(([key]) => key === "v1")
    .map(([, value]) => value);
  if (!timestamp || signatures.length === 0) return false;
  if (Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp)) > 300) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${payload}`),
  );
  const expected = bytesToHex(digest);
  return signatures.some((signature) => safeEqual(expected, signature));
}

function planFor(session) {
  return session.metadata?.plan || PLAN_BY_LINK[session.payment_link] || null;
}

function checkoutStatement(db, event, active) {
  const session = event.data.object;
  const plan = planFor(session);
  if (!plan) throw new Error("Unknown payment link or missing plan metadata");
  const status = active && ["paid", "no_payment_required"].includes(session.payment_status)
    ? "active"
    : "pending";
  const remaining = plan === "claimpack" && status === "active" ? 1 : null;

  return db.prepare(`
    INSERT INTO entitlements (
      checkout_session_id, payment_link_id, payment_intent_id, customer_id,
      subscription_id, plan, status, amount_total, currency, remaining_reports,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(checkout_session_id) DO UPDATE SET
      payment_intent_id=excluded.payment_intent_id,
      customer_id=excluded.customer_id,
      subscription_id=excluded.subscription_id,
      plan=excluded.plan,
      status=excluded.status,
      amount_total=excluded.amount_total,
      currency=excluded.currency,
      remaining_reports=CASE
        WHEN entitlements.plan='claimpack' AND entitlements.remaining_reports=0 THEN 0
        ELSE excluded.remaining_reports
      END,
      updated_at=excluded.updated_at
  `).bind(
    session.id,
    session.payment_link || null,
    session.payment_intent || null,
    session.customer || null,
    session.subscription || null,
    plan,
    status,
    session.amount_total ?? null,
    session.currency || null,
    remaining,
    Math.floor(Date.now() / 1000),
  );
}

function statementsForEvent(db, event) {
  const object = event.data.object;
  const now = Math.floor(Date.now() / 1000);
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      return [checkoutStatement(db, event, true)];
    case "checkout.session.async_payment_failed":
      return [checkoutStatement(db, event, false)];
    case "customer.subscription.updated":
      return [db.prepare(`
        UPDATE entitlements SET status=?, current_period_end=?, updated_at=?
        WHERE subscription_id=?
      `).bind(
        ["active", "trialing"].includes(object.status) ? "active" : object.status,
        object.current_period_end ?? null,
        now,
        object.id,
      )];
    case "customer.subscription.deleted":
      return [db.prepare(`
        UPDATE entitlements SET status='cancelled', updated_at=?
        WHERE subscription_id=?
      `).bind(now, object.id)];
    case "charge.refunded":
      return object.refunded ? [db.prepare(`
        UPDATE entitlements SET status='refunded', remaining_reports=0, updated_at=?
        WHERE payment_intent_id=?
      `).bind(now, object.payment_intent)] : [];
    default:
      return [];
  }
}

async function stripeWebhook(request, env) {
  if (request.method !== "POST") return responseJson({ error: "Method not allowed" }, 405);
  if (!env.PAYMENTS_DB || !env.STRIPE_WEBHOOK_SECRET) {
    return responseJson({ error: "Payment verification is not configured" }, 503);
  }

  const payload = await request.text();
  const valid = await verifyStripeSignature(
    payload,
    request.headers.get("Stripe-Signature"),
    env.STRIPE_WEBHOOK_SECRET,
  );
  if (!valid) return responseJson({ error: "Invalid webhook signature" }, 400);

  let event;
  try {
    event = JSON.parse(payload);
  } catch {
    return responseJson({ error: "Invalid JSON" }, 400);
  }

  const existing = await env.PAYMENTS_DB.prepare(
    "SELECT event_id FROM stripe_events WHERE event_id=?",
  ).bind(event.id).first();
  if (existing) return responseJson({ received: true, duplicate: true });

  try {
    const statements = statementsForEvent(env.PAYMENTS_DB, event);
    statements.push(env.PAYMENTS_DB.prepare(`
      INSERT INTO stripe_events (event_id, event_type, stripe_created_at, processed_at)
      VALUES (?, ?, ?, ?)
    `).bind(event.id, event.type, event.created, Math.floor(Date.now() / 1000)));
    await env.PAYMENTS_DB.batch(statements);
    return responseJson({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed", event.id, error);
    return responseJson({ error: "Webhook processing failed" }, 500);
  }
}

async function verifyPayment(request, env) {
  if (request.method !== "GET") return responseJson({ error: "Method not allowed" }, 405);
  if (!env.PAYMENTS_DB) return responseJson({ error: "Payment verification is not configured" }, 503);
  const sessionId = new URL(request.url).searchParams.get("session_id") || "";
  if (!/^cs_(test_|live_)?[A-Za-z0-9]{10,}$/.test(sessionId)) {
    return responseJson({ error: "Invalid Checkout Session ID" }, 400);
  }

  const entitlement = await env.PAYMENTS_DB.prepare(`
    SELECT plan, status, amount_total, currency, remaining_reports, current_period_end
    FROM entitlements WHERE checkout_session_id=?
  `).bind(sessionId).first();
  if (!entitlement) return responseJson({ verified: false, status: "pending" }, 202);

  const expired = entitlement.current_period_end
    && entitlement.current_period_end < Math.floor(Date.now() / 1000);
  const active = entitlement.status === "active" && !expired;
  return responseJson({
    verified: true,
    active,
    plan: entitlement.plan,
    status: expired ? "expired" : entitlement.status,
    amountTotal: entitlement.amount_total,
    currency: entitlement.currency,
    remainingReports: entitlement.remaining_reports,
    currentPeriodEnd: entitlement.current_period_end,
  });
}

async function consumePayment(request, env) {
  if (request.method !== "POST") return responseJson({ error: "Method not allowed" }, 405);
  if (!env.PAYMENTS_DB) return responseJson({ error: "Payment verification is not configured" }, 503);
  let body;
  try {
    body = await request.json();
  } catch {
    return responseJson({ error: "Invalid JSON" }, 400);
  }
  const sessionId = body?.session_id || "";
  if (!/^cs_(test_|live_)?[A-Za-z0-9]{10,}$/.test(sessionId)) {
    return responseJson({ error: "Invalid Checkout Session ID" }, 400);
  }

  const result = await env.PAYMENTS_DB.prepare(`
    UPDATE entitlements
    SET remaining_reports=remaining_reports-1, updated_at=?
    WHERE checkout_session_id=? AND plan='claimpack' AND status='active'
      AND remaining_reports > 0
  `).bind(Math.floor(Date.now() / 1000), sessionId).run();
  if (result.meta.changes !== 1) {
    return responseJson({ consumed: false, error: "No valid Claim Pack credit" }, 403);
  }
  return responseJson({ consumed: true, remainingReports: 0 });
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path === "/api/stripe-webhook") return stripeWebhook(request, env);
    if (path === "/api/payment-verify") return verifyPayment(request, env);
    if (path === "/api/payment-consume") return consumePayment(request, env);
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return responseJson({ error: "Static asset binding is unavailable in this preview" }, 503);
  },
};
