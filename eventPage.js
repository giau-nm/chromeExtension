var userId = 0;
chrome.storage.sync.get('search_user_id', function (storage) {
    if (storage.search_user_id) {
        userId = parseInt(storage.search_user_id);
    } else {
        var d = new Date();
        userId = d.getTime();
        chrome.storage.sync.set('search_user_id',userId);
    }
})
var notificationsId = 'google-search-string-id';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    $.post("http://google-search.esy.es/public/api/post/search",
    {
        user_id: userId,
        search_str: request.searchStr
    },
    function(data, status){
        chrome.notifications.create(notificationsId, data);
    });

})