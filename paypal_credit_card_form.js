Template.paypalCreditCardForm.card_data = function(){
	return {
      type: $('#card-type').val(),
	    name: $('#name').val(),
	    number: $('#card-number').val(),
	    expire_month: $('#expire-month').val(),
	    expire_year: $('#expire-year').val(),
	    cvv: $('#cvv').val()
	};
};
