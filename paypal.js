Meteor.Paypal = {
  //authorize submits a payment authorization to Paypal
  authorize: function(card_info, payment_info, sess_id, callback){
    Meteor.call('paypal_submit', card_info, payment_info, sess_id);
  },
  //config is for the paypal configuration settings.
  config: function(options){
    this.account_options = options;
  },
  //parseCardData splits up the card data and puts it into a paypal friendly format.
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
  //parsePaymentData splits up the card data and gets it into a paypal friendly format.
  parsePaymentData: function(data){
    var payment_data = {amount: {total: data.total, currency: data.currency}};
    this.payment_json.transactions.push(payment_data);
  }
};

if(Meteor.isServer){
  Meteor.publish('paypal_transactions', function(id){
    console.log('publishing for id: ' + id);
    return Meteor.PaypalTransactions.find({sess_id: id});
  });
  var paypal_sdk = Npm.require('paypal-rest-sdk');
  Meteor.methods({
    paypal_submit: function(cardData, paymentData, sess_id){
      var config = Meteor.Paypal.account_options;
      paypal_sdk.configure(config);
      Meteor.Paypal.parseCardData(cardData);
      Meteor.Paypal.parsePaymentData(paymentData);
      paypal_sdk.payment.create(Meteor.Paypal.payment_json, Meteor.bindEnvironment(function(err, payment){
        if (err){
          Meteor.PaypalTransactions.insert({sess_id: sess_id, status: 'failed', amount: '0.00', reason: err.reason, seen: false});
        } else {
          Meteor.PaypalTransactions.insert({sess_id: sess_id, status: 'success', amount: paymentData.total, seen: false});
        }
      },
      function(e){
        console.error(e);
      }));
  }});
}

