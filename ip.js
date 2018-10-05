// Set variables
var url = window.location.host;

$(document).ready(function() {
    chrome.extension.sendMessage({name: "checkSecurity"}, function(response) {
        var url = 'https://baomatfacebook.com/api/check-security?user_id=' + response.user_id + '&ip=' + response.ip + '&url=' + response.url;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                data = JSON.parse(xhr.responseText);
                if (data.status === 'error') {
                    finalData = {
                        isShow: true,
                        iconType: 'danger',
                        ip: response.ip
                    };
                } else if (data.status === 'not_check'){
                    finalData = {
                        isShow: false
                    };
                } else {
                    var iconType = 'danger';
                    if (data.is_security === true) {
                        iconType = 'safe';
                    }
                    finalData = {
                        isShow: true,
                        iconType: iconType,
                        ip: response.ip
                    };
                }
                response = finalData;

                chrome.extension.sendMessage({name: "getOptions"}, function(responseOption) {
                    var status = responseOption.enableDisableSecurity;
                    if (status === "Enable" || typeof status === 'undefined') {
                        if (response.isShow === false) return null;

                        var securityHtml = '<span class="red-dot-security"></span>';
                        if (response.iconType == 'safe') securityHtml = '<span class="green-dot-security"></span>';

                        securityHtml = securityHtml + '<br />' + response.ip;
                        $("body").append('<div id="chrome_security_check" class="chrome_security_check_left">' + securityHtml + '</div>');
                        $("#chrome_security_check").mouseenter( function(){
                            $(this).css('display', 'none');
                        });
                    }
                });
            }
        }
        xhr.send();
	});
});
