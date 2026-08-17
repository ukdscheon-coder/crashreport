const json = (data, status = 200) =>
  Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });

export async function onRequestPost({ request, env }) {
  if (!env.PAYMENTS_DB) return json({ error: "Payment verification is not configured" }, 503);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const sessionId = body?.session_id || "";
  if (!/^cs_(test_|live_)?[A-Za-z0-9]{10,}$/.test(sessionId)) {
    return json({ error: "Invalid Checkout Session ID" }, 400);
  }

  const result = await env.PAYMENTS_DB.prepare(`
    UPDATE entitlements
    SET remaining_reports=remaining_reports-1, updated_at=?
    WHERE checkout_session_id=? AND plan='claimpack' AND status='active'
      AND remaining_reports > 0
  `).bind(Math.floor(Date.now() / 1000), sessionId).run();

  if (result.meta.changes !== 1) {
    return json({ consumed: false, error: "No valid Claim Pack credit" }, 403);
  }
  return json({ consumed: true, remainingReports: 0 });
}

export function onRequest() {
  return json({ error: "Method not allowed" }, 405);
}
