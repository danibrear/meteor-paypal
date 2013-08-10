paypal_json = {
"intent": "sale",
"payer": {
  "payment_method": "credit_card",
  "funding_instruments": [{
    "credit_card": {
      "type": "",
      "number": "",
      "expire_month": "",
      "expire_year": "",
      "cvv2": "",
      "first_name": "",
      "last_name": "",
      "billing_address": {
        "line1": "",
        "city": "",
        "state": "",
        "postal_code": "",
        "country_code": "" }}}]},
"transactions": [{
  "amount": {
    "total": "",
    "currency": "",
    "details": {
      "subtotal": "",
      "tax": "",
      "shipping": ""}},
  "description": "This is the payment transaction description." }]};
