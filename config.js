// CrashReport public config — Payment Links only in browser (no sk_ secrets)
window.CRASHREPORT_CONFIG = {
  brand: 'CrashReport',
  domain: 'https://crashreport.uk',
  beta: true,
  stripe: {
    publishableKey: '',
    paymentLinkMonthly: '',
    paymentLinkYearly: ''
  }
};
