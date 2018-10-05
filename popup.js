document.addEventListener('DOMContentLoaded', function () {
    chrome.extension.sendMessage({name: "getOptions"}, function(response) {
    	if (response.enableDisableSecurity === null || response.enableDisableSecurity === 'Enable') {
            $("#EnableDisableProtect").html('Đang bật');
		} else {
            chrome.extension.sendMessage({name: "setOptions", status: 'Enable'}, function(response) {});
            $("#EnableDisableProtect").html('Đang tắt');
		}
    });

    document.querySelector('button').addEventListener('click', function() {
        if ($('#EnableDisableProtect').html() == "Đang tắt") {
            chrome.extension.sendMessage({name: "setOptions", status: 'Enable'}, function(response) {});
            $('#EnableDisableProtect').html('Đang bật')
        }
        else if ($('#EnableDisableProtect').html() == "Đang bật") {
            chrome.extension.sendMessage({name: "setOptions", status: 'Disable'}, function(response) {});
            $('#EnableDisableProtect').html('Đang tắt');
        }
    });
});