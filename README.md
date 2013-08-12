meteor-paypal
=============

Meteor Package for Paypal integration

### Requirements
  * MRT
  * NPM - mrt add npm

### Usage
```console
mrt add npm
#clone into your packages directory
cd packages && git clone http://github.com/davidbrear/meteor-paypal
```

In your callback method:
```javascript
Meteor.subscribe('paypal_transactions', unique_session_id);
Meteor.Paypal.authorize({/*credit card info (number, cvv2, etc...)*/}, 
    {/*payment info (amount, currency)*/}, 
    unique_session_id);
```
