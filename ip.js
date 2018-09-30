// Set variables
var url = window.location.host;

$(document).ready(function() {

	chrome.extension.sendMessage({name: "checkSecurity"}, function(response) {
		console.log(response);
		var securityHtml = '<span class="red-dot-security"></span>';
		if (response.isSave === true) securityHtml = '<span class="green-dot-security"></span>';

		$("body").append('<div id="chrome_websiteIP" class="chrome_websiteIP_left">' + securityHtml + '</div>');
	});
});
