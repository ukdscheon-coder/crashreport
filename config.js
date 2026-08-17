// CrashReport public config — Payment Links only in browser (no secret keys)
window.CRASHREPORT_CONFIG = {
  brand: 'CrashReport UK',
  domain: 'https://crashreport.uk',
  beta: true,
  stripe: {
    mode: 'live',
    paymentLinkClaimPack: 'https://buy.stripe.com/cNi6oIcTbbdh12z45s57W04',
    paymentLinkMonthly: 'https://buy.stripe.com/7sY6oIcTbgxBfXtfOa57W05',
    paymentLinkYearly: 'https://buy.stripe.com/bJe9AU6uNchl8v1gSe57W06'
  }
};
