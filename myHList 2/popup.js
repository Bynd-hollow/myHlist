chrome.extension.isAllowedIncognitoAccess(function(isAllowedAccess) {
    if (isAllowedAccess) document.getElementById('Incog').style.color = "Black"; return ; // Great, we've got access

    // alert for a quick demonstration, please create your own user-friendly UI
    document.getElementById('Incog').style.color = "red";

    chrome.tabs.create({
        url: 'chrome://extensions/?id=' + chrome.runtime.id
    });
});
