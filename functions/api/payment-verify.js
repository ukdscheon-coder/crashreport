const json = (data, status = 200) =>
  Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });

export async function onRequestGet({ request, env }) {
  if (!env.PAYMENTS_DB) return json({ error: "Payment verification is not configured" }, 503);

  const sessionId = new URL(request.url).searchParams.get("session_id") || "";
  if (!/^cs_(test_|live_)?[A-Za-z0-9]{10,}$/.test(sessionId)) {
    return json({ error: "Invalid Checkout Session ID" }, 400);
  }

  const entitlement = await env.PAYMENTS_DB.prepare(`
    SELECT plan, status, amount_total, currency, remaining_reports, current_period_end
    FROM entitlements WHERE checkout_session_id=?
  `).bind(sessionId).first();

  if (!entitlement) return json({ verified: false, status: "pending" }, 202);

  const expired = entitlement.current_period_end &&
    entitlement.current_period_end < Math.floor(Date.now() / 1000);
  const active = entitlement.status === "active" && !expired;

  return json({
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

export function onRequest() {
  return json({ error: "Method not allowed" }, 405);
}
