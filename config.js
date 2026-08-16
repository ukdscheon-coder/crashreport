// CrashReport public config — Payment Links only in browser (no secret keys)
window.CRASHREPORT_CONFIG = {
  brand: 'CrashReport UK',
  domain: 'https://crashreport.uk',
  beta: true,
  stripe: {
    mode: 'test',
    publishableKey: 'pk_test_51U3QjtIryG8HCIAEfdKnir6yXe9UvR2M9SgLG3yGtBsYXDnKugfdloSKSVapW7AKuqcz4inHvZfCshaqL0cLvQmI00V9ajAfhg',
    paymentLinkMonthly: 'https://buy.stripe.com/test_6oU00jbIwa3xaXL8xW9AA01',
    paymentLinkYearly: 'https://buy.stripe.com/test_4gM9AT6ocejN5DraG49AA00'
  }
};
