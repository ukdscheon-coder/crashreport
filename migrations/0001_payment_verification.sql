CREATE TABLE IF NOT EXISTS stripe_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  stripe_created_at INTEGER NOT NULL,
  processed_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS entitlements (
  checkout_session_id TEXT PRIMARY KEY,
  payment_link_id TEXT,
  payment_intent_id TEXT,
  customer_id TEXT,
  subscription_id TEXT,
  plan TEXT NOT NULL CHECK (plan IN ('claimpack', 'monthly', 'yearly')),
  status TEXT NOT NULL,
  amount_total INTEGER,
  currency TEXT,
  remaining_reports INTEGER,
  current_period_end INTEGER,
  updated_at INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_entitlements_payment_intent
  ON entitlements(payment_intent_id) WHERE payment_intent_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_entitlements_subscription
  ON entitlements(subscription_id);
