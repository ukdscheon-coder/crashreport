// CrashReport public config — Payment Links only in browser (no secret keys)
window.CRASHREPORT_CONFIG = {
  brand: 'CrashReport UK',
  domain: 'https://crashreport.uk',
  beta: true,
  stripe: {
    mode: 'test',
    publishableKey: '',
    paymentLinkMonthly: 'https://buy.stripe.com/test_6oU00jbIwa3xaXL8xW9AA01',
    paymentLinkYearly: 'https://buy.stripe.com/test_4gM9AT6ocejN5DraG49AA00'
  }
};
