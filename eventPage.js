var userId = 0;
chrome.storage.local.get('search_user_id', function (storage) {
    if (storage.search_user_id) {
        userId = parseInt(storage.search_user_id);
    } else {
        var d = new Date();
        userId = d.getTime();
        chrome.storage.local.set('search_user_id',userId);
    }
})
var notificationsId = 'google-search-string-id';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    $.post("http://google-search.esy.es/public/api/search",
    {
        user_id: userId,
        search_str: request.searchStr
    },
    function(data, status){
        if (data.isShowNotification === true) {
            chrome.notifications.create('google-search-string-id', data.notificationData);
        }
        
    });

})