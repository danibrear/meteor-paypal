meteor-paypal
=============

Meteor Package for Paypal integration

### Requirements
  * MRT

### Usage
```console
mrt add paypal
```

#### Basic
```javascript
  Meteor.Paypal.authorize({
      name: 'Buster Bluth',
      number: '4111111111111111',
      cvv2: '123',
      expire_year: '2015',
      expire_month: '01'
    },
    {
      total: '100.10',
      currency: 'USD'
    },
    function(error, results){
      if(error)
        //Deal with Error
      else
        //results contains boolean for saved
        // and a payment object with information about the transaction
    });
```
