var currentIPList   = {};
chrome.webRequest.onCompleted.addListener(
  function(info) {
      currentIPList[ info.url ] = info.ip;
    return;
  },
  {
    urls: [],
    types: []
  },
  []
);

function getCurrentTabIp(sender) {
    var currentURL = sender.tab.url;
    if (currentIPList[currentURL] !== undefined) {
        return currentIPList[currentURL]
    } else {
        return null
    }
}

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