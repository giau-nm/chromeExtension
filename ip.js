// Set variables
var url = window.location.host;

$(document).ready(function() {

	chrome.extension.sendMessage({name: "checkSecurity"}, function(response) {
		if (response.isShow === false) return null;

		var securityHtml = '<span class="red-dot-security"></span>';
		if (response.iconType == 'safe') securityHtml = '<span class="green-dot-security"></span>';
		console.log(response);
		$("body").append('<div id="chrome_security_check" class="chrome_security_check_left">' + securityHtml + '</div>');
		$("#chrome_security_check").mouseenter( function(){
			console.log('asdfasdfsadf');
			$(this).css('display', 'none');
		});
	});

});
