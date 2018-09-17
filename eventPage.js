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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    alert('user_id: ' + userId + "; searchStr: " + request.searchStr)
    // 'http://google-search.esy.es/public/api/post/search';
    $.post("http://google-search.esy.es/public/api/post/search",
    {
        user_id: userId,
        search_str: request.searchStr
    },
    function(data, status){
    });

})