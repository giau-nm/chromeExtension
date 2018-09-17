$(document).ready(function(){
	chrome.storage.sync.get('total', function(budget){
		$("#amount").html(budget.total)
	});
	$(document).on('click', "#button-add-amount", function() {
		chrome.storage.sync.get('total', function(budget){
			var newTotal = 0;
			if (budget.total) {
				newTotal += parseInt(newTotal);
			}
			
			var amount = $("#amout-add").val();
			if (amount) newTotal += parseInt(amount);
			chrome.storage.sync.set({'total': newTotal});
			$("#amount").html(newTotal);
			$("#amout-add").val('');
		});
	});
})