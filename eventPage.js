var apiUrl = "http://baomatfacebook.com/api/";
var isSave = false;
var notificationsId = 'chrome-notification-id-push';
var userId = 0;

chrome.cookies.get({url: apiUrl, name: 'userId_cookie'}, function (cookiesValue) {
    if (cookiesValue !== null) {
        userId = parseInt(cookiesValue.value);
    } else {
        var d = new Date();
        userId = d.getTime();
        chrome.cookies.set({url: apiUrl, name: 'userId_cookie', expirationDate:  (userId*5), value: userId.toString()});
    }
})

setInterval(function(){
    searchAction({});
}, 300000);
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.name) {
            case "searchAction":
                var data = { user_id: userId, search_str: request.searchStr};
                searchAction(data);
                break;
        
            case "checkSecurity":
                var data = {
                    ip: getCurrentTabIp(sender),
                    url: sender.tab.url,
                    user_id: userId
                }

                $.ajax({
                    async: false,
                    type: "POST",
                    url: apiUrl + 'check-security',
                    data: data,
                    success: function(data, status) {
                        if (data.status === 'error') {
                            sendResponse({
                                isShow: true,
                                iconType: 'danger',
                            });
                        } else if (data.status === 'not_check'){
                            sendResponse({
                                isShow: false
                            });
                        } else {
                            var iconType = 'danger';
                            if (data.is_security === true) {
                                iconType = 'safe';
                            }
                            sendResponse({
                                isShow: true,
                                iconType: iconType,
                            });
                        }
                    },
                });
                break;
            
            default:
                sendResponse({});
        }
    }
);


function searchAction(data) {
    $.post(
        apiUrl + 'search',
        data,
        function(data, status) {
            if (data.isShowNotification === true) {
                chrome.notifications.create(notificationsId, data.notificationData);
            }
        }
    );
}

function checkSecurity(data) {
    $.post(
        apiUrl + 'check-security',
        data,
        function(data, status) {
            if (data.status === true) {
                console.log('here');
                return true;
            }
        }
    );
}
