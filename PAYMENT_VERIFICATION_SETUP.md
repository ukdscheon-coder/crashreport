# CrashReport UK — Stripe server verification setup

The application code expects Cloudflare Pages Functions, a D1 binding named `PAYMENTS_DB`,
and an encrypted secret named `STRIPE_WEBHOOK_SECRET`.

## 1. Create and initialise D1

1. Cloudflare Dashboard → Workers & Pages → D1 → Create database: `crashreport-payments`.
2. Open its Console and run `migrations/0001_payment_verification.sql`.
3. Workers & Pages → CrashReport Pages project → Settings → Bindings → Add D1.
4. Variable name: `PAYMENTS_DB`; database: `crashreport-payments`.
5. Add the binding to Production (and Preview if test deployments need it).

## 2. Add Stripe webhook

In Stripe **Live mode** → Developers → Webhooks → Add destination:

- Endpoint: `https://crashreport.uk/api/stripe-webhook`
- Events:
  - `checkout.session.completed`
  - `checkout.session.async_payment_succeeded`
  - `checkout.session.async_payment_failed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `charge.refunded`

Reveal the endpoint signing secret once. Do not paste it into source control.

In Cloudflare → CrashReport Pages project → Settings → Variables and Secrets → Add:

- Name: `STRIPE_WEBHOOK_SECRET`
- Value: the Stripe `whsec_...` endpoint secret
- Encrypt: enabled
- Environment: Production

Redeploy after adding the D1 binding and secret.

## 3. Update live Payment Link redirects

Each link must use a redirect (not Stripe's hosted confirmation) and include the exact placeholder:

- Monthly: `https://crashreport.uk/?payment=success&plan=monthly&session_id={CHECKOUT_SESSION_ID}`
- Yearly: `https://crashreport.uk/?payment=success&plan=yearly&session_id={CHECKOUT_SESSION_ID}`
- Claim Pack: `https://crashreport.uk/?payment=success&plan=claimpack&session_id={CHECKOUT_SESSION_ID}`

## 4. Verify

1. Use a Stripe test-mode webhook endpoint and test Payment Links first.
2. Confirm Stripe Webhooks shows HTTP 200.
3. Confirm `GET /api/payment-verify?session_id=...` returns `verified:true`.
4. Confirm a fabricated success URL does not unlock Premium.
5. Confirm a Claim Pack can be consumed only once.
6. Confirm subscription deletion/refund changes access to inactive.

Never use a publishable key or success-return URL as proof of payment.
