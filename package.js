Package.describe({
  summary: 'A paypal package that helps make restful API calls to Paypal'
});

Npm.depends({'paypal-rest-sdk': '0.6.3'});

Package.on_use(function(api, where){
  api.use(['templating', 'npm'], ['client', 'server']);
  api.add_files(['paypal.js'], ['client', 'server']);
  api.add_files(['paypal_credit_card_form.html', 'paypal_credit_card_form.js'], ['client']);
});
