Paypal for Meteor
=============

Meteor Package for easy Paypal payment processing.

### Usage
```console
mrt add paypal
```

#### Setup

If you haven't already, sign up for a developer account at: [https://developer.paypal.com/](https://developer.paypal.com/)

Create a sandbox application and copy your *REST API CREDENTIALS*.

Create a file `server/paypal_config.js` including:
``` javascript
  Meteor.Paypal.config({
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'Your Paypal Client Id',
    'client_secret': 'Your Paypal Client Secret'
  });
```

#### Basic

Format is `Meteor.Paypal.*transaction_type*({ {/*card data*/}, {/*transaction data*/}, function(err, res){...})`

```javascript
  Meteor.Paypal.authorize({
      name: 'Buster Bluth',
      number: '4111111111111111',
      type: 'visa',
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
        //results contains:
        //  saved (true or false)
        //  if false: "error" contains the reasons for failure
        //  if true: "payment" contains the transaction information
    });
```

For information on the **payment** object returned see [Paypal's Payment Option Documentation](https://developer.paypal.com/webapps/developer/docs/api/#common-payments-objects)

Transaction types are: `Meteor.Paypal.authorize` and
`Meteor.Paypal.purchase` for the difference, see [Paypal's
Documentation](https://developer.paypal.com/webapps/developer/docs/api/#payments)
#### Extras

Include `{{> paypalCreditCardForm }}` in a template. In the template's javascript file, include: 
``` javascript
  Template.paypalCreditCardForm.events({
    'submit #paypal-payment-form': function(evt, tmp){
      evt.preventDefault();
      
      var card_data = Template.paypalCreditCardForm.card_data();
      
      //Probably a good idea to disable the submit button here to prevent multiple submissions.
      
      Meteor.Paypal.purchase(card_data, {total: '100.50', currency: 'USD'}, function(err, results){
        if (err) console.error(err);
        else console.log(results);
      });
    }
  });
```

### Acknowledgements

Special Thanks to Phillip Jacobs ([@phillyqueso](https://twitter.com/phillyqueso)) for his help with Fibers and Futures without which, this project would've failed.
