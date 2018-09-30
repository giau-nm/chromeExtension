var apiUrl = "http://search-google.com/api/";
var isSave = false;

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
                    url: sender.tab.url
                }


                $.ajax({
                    async: false,
                    type: "POST",
                    url: apiUrl + 'check-security',
                    data: data,
                    success: function(data, status) {
                        if (data.status === true) {
                            sendResponse({
                                isSave: true
                            });
                        } else {
                            sendResponse({
                                isSave: false
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
