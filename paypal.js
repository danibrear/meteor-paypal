//we don't want to store this information on the server
Meteor.transactions = new Meteor.Collection(null);

Meteor.Paypal = {
  authorize: function(card_info, payment_info, callback){
    Meteor.call('paypal_submit', card_info, payment_info, function(err, payment){
      if(err){
        console.err(err)
      } else {
        console.log('done with the submission');
      }
    });
  },
  config: function(options){
    this.account_options = options;
  },
  parseCardData: function(data){
    var card_data = {
      credit_card: {
        type: 'visa',
        number: data.number,
        first_name: data.name.split(' ')[0],
        last_name: data.name.split(' ')[1],
        cvv2: data.cvv2,
        expire_month: data.expire_month,
        expire_year: data.expire_year
      }};
    this.payment_json.payer.funding_instruments.push(card_data);
  },
  parsePaymentData: function(data){
    var payment_data = {amount: {total: data.total, currency: data.currency}};
    this.payment_json.transactions.push(payment_data);
  }
};

if(Meteor.isServer){
  var paypal_sdk = Npm.require('paypal-rest-sdk');
  Meteor.methods({
    paypal_submit: function(cardData, paymentData){
      if(typeof(paypal_sdk) === 'undefined')
        return;
      var config = Meteor.Paypal.account_options;
      paypal_sdk.configure(config);
      Meteor.Paypal.parseCardData(cardData);
      Meteor.Paypal.parsePaymentData(paymentData);
      paypal_sdk.payment.create(Meteor.Paypal.payment_json, function(err, payment){
      });
    }
  });
}
