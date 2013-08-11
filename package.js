Package.describe({
  summary: 'A paypal package that helps make restful API calls to Paypal'
});

Npm.depends({'paypal-rest-sdk': '0.6.3'});

Package.on_use(function(api, where){
  api.use(['templating', 'npm'], ['client', 'server']);
  api.add_files(['paypal.js', './lib/paypal.js', 'collections/transactions.js'], ['client', 'server']);
  api.add_files(['paypal_notices.html', 'paypal_notices.js'], ['client']);
});
