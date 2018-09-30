$(document).ready(function () {
    $( "input" ).keyup(function(event) {
        if (event.which === 13) {
            var string = $(this).val();
            chrome.runtime.sendMessage({name: "searchAction", searchStr: string});
        } 
    });
})