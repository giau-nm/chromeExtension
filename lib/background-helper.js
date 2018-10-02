var currentIPList   = {};
chrome.webRequest.onCompleted.addListener(
    function(info) {
        if (typeof info.initiator !== 'undefined') currentIPList[info.initiator] = info.ip;
        if (typeof info.url !== 'undefined') currentIPList[info.url] = info.ip;
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
    if (currentIPList[currentURL] !== undefined)
        return currentIPList[currentURL]

    var myarr = currentURL.split("/");
    if (myarr.length < 3) return null;

    currentURL = myarr[0] + '/' + myarr[1] + '/' + myarr[2];
    if (currentIPList[currentURL] !== undefined)
        return currentIPList[currentURL]

    return null
}