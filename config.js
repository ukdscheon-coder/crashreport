// CrashReport public config — Payment Links only in browser (no secret keys)
window.CRASHREPORT_CONFIG = {
  brand: 'CrashReport UK',
  domain: 'https://crashreport.uk',
  beta: true,
  stripe: {
    mode: 'live',
    paymentLinkClaimPack: 'https://buy.stripe.com/cNi6oIcTbbdh12z45s57W04',
    paymentLinkMonthly: 'https://buy.stripe.com/dRm7sM3iBept9z5cBY57W02',
    paymentLinkYearly: 'https://buy.stripe.com/6oUeVe5qJ0yDdPleK657W03'
  }
};
