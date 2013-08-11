Template.paypalNotices.helpers({
  paypal_notices: function(){
    return Meteor.paypal_transactions.find();
  },
  has_errors: function(){
    return Meteor.paypal_transactions.find().count() > 0;
  }
});
