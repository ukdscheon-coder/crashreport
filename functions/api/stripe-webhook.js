const PLAN_BY_LINK = {
  plink_1U5PrbIYwgpxGEoZNlgC660s: "monthly",
  plink_1U5PrfIYwgpxGEoZKRm8HAsv: "yearly",
  plink_1U5PjuIYwgpxGEoZkgP5d0IL: "claimpack",
};

const json = (data, status = 200) =>
  Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });

function bytesToHex(bytes) {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i += 1) difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return difference === 0;
}

async function verifyStripeSignature(payload, header, secret) {
  if (!header || !secret) return false;
  const parts = header.split(",").map((part) => part.trim().split("="));
  const timestamp = parts.find(([key]) => key === "t")?.[1];
  const signatures = parts.filter(([key]) => key === "v1").map(([, value]) => value);
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

async function handleCheckout(db, event, active) {
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

async function eventStatements(db, event) {
  const object = event.data.object;
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      return [await handleCheckout(db, event, true)];
    case "checkout.session.async_payment_failed":
      return [await handleCheckout(db, event, false)];
    case "customer.subscription.updated":
      return [db.prepare(`
        UPDATE entitlements
        SET status=?, current_period_end=?, updated_at=?
        WHERE subscription_id=?
      `).bind(
        ["active", "trialing"].includes(object.status) ? "active" : object.status,
        object.current_period_end ?? null,
        Math.floor(Date.now() / 1000),
        object.id,
      )];
    case "customer.subscription.deleted":
      return [db.prepare(`
        UPDATE entitlements SET status='cancelled', updated_at=? WHERE subscription_id=?
      `).bind(Math.floor(Date.now() / 1000), object.id)];
    case "charge.refunded":
      return object.refunded
        ? [db.prepare(`
            UPDATE entitlements SET status='refunded', remaining_reports=0, updated_at=?
            WHERE payment_intent_id=?
          `).bind(Math.floor(Date.now() / 1000), object.payment_intent)]
        : [];
    default:
      return [];
  }
}

export async function onRequestPost({ request, env }) {
  if (!env.PAYMENTS_DB || !env.STRIPE_WEBHOOK_SECRET) {
    return json({ error: "Payment verification is not configured" }, 503);
  }

  const payload = await request.text();
  const valid = await verifyStripeSignature(
    payload,
    request.headers.get("Stripe-Signature"),
    env.STRIPE_WEBHOOK_SECRET,
  );
  if (!valid) return json({ error: "Invalid webhook signature" }, 400);

  let event;
  try {
    event = JSON.parse(payload);
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const existing = await env.PAYMENTS_DB.prepare(
    "SELECT event_id FROM stripe_events WHERE event_id=?",
  ).bind(event.id).first();
  if (existing) return json({ received: true, duplicate: true });

  try {
    const statements = await eventStatements(env.PAYMENTS_DB, event);
    statements.push(
      env.PAYMENTS_DB.prepare(
        "INSERT INTO stripe_events (event_id, event_type, stripe_created_at, processed_at) VALUES (?, ?, ?, ?)",
      ).bind(event.id, event.type, event.created, Math.floor(Date.now() / 1000)),
    );
    await env.PAYMENTS_DB.batch(statements);
    return json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed", event.id, error);
    return json({ error: "Webhook processing failed" }, 500);
  }
}

export function onRequest() {
  return json({ error: "Method not allowed" }, 405);
}
