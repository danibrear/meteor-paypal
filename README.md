meteor-paypal
=============

Meteor Package for Paypal integration

### Requirements
  * MRT

### Usage
```console
mrt add paypal
```

In your callback method:
```javascript
Meteor.subscribe('paypal_transactions', unique_session_id);
Meteor.Paypal.authorize({/*credit card info (number, cvv2, etc...)*/}, 
    {/*payment info (amount, currency)*/}, 
    unique_session_id);
```
