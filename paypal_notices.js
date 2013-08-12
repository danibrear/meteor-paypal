Template.paypalNotices.helpers({
  paypal_notices: function(){
    return Meteor.PaypalTransactions.find()
  },
  has_errors: function(){
    return Meteor.PaypalTransactions.find({status: 'failed'}).count() > 0;
  }
});
