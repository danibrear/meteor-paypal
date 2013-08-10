//we don't want to store this information on the server
Meteor.transaction = new Meteor.Collection(null);

Meteor.Paypal = {
  authorize: function(card_info, callback){
    Meteor.call('paypal_submit', card_info, function(err){
      console.log('done with the submission');
    });
  },
  config: function(options){
    this.account_options = options;
  }
};

var parsePaymentData = function(data){
  var card_data = {type: 'visa', first_name: data.name.split(' ')[0], last_name: data.name.split(' ')[1], cvv2: data.cvv2, expire_month: data.expire_month, expire_year: data.expire_year};
  console.log(card_data);
  paypal_json.payer.funding_instruments.push(card_data);
};

var paypal_sdk = undefined;
if(Meteor.isServer){
  paypal_sdk = Npm.require('paypal-rest-sdk');
}
Meteor.methods({
  paypal_submit: function(paymentData){
    if(typeof(paypal_sdk) === 'undefined')
      return;
    var config = Meteor.Paypal.account_options;
    parsePaymentData(paymentData);
    paypal_sdk.payment.create(paypal_json, function(err, payment){
      console.log('err: ' + err);
      console.log('payment: ' + payment);
    });
  }
});
