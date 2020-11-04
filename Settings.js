  var currentSettings = false;  
  var currentWindow;
  // Same purpouse as Displaylists, but for initializing settings 
  if(currentSettings === false){
    chrome.storage.local.get('UserSettings', function(setConfig) {
        if(setConfig.UserSettings){
            // If found, sets the settings
            currentSettings = setConfig.UserSettings;
        } else {
            // If no lists are found, initialises the extension with the 3 system conifgs
            // Note: if this happens upon regular use and not the initial installaiton of the extension, something has gone wrong.
            let defSet = {
                currentRead: "r",
                snakeHide: true,
                noteHide: true,
                snakeHideKey: "h",
                noteHideKey: "n",
                backKey: "b",
                frontKey: "v",
                saveDirectory: true,
            };
            chrome.storage.local.set({'UserSettings': defSet}, function() {
                console.log("Initialised storage with" + defSet);
                location.reload();
              });
        }
      });
  }
  
  // Check directory, if savedirectory is enabled redirect to previous directory
  // Currently Not Working
/*   if(window.location.href == "chrome-extension://jcflclpcodkeeoocpnbacgkeijbbdpcn/Redirect.html"){
    if(currentSettings.saveDirectory){
        let cd = localStorage.getItem("cd");
        if(cd){
            window.location.href = "popup.html";
        } else {
          window.location.href = cd;
        }
    } else{
        window.location.href = "popup.html";
    }
} else {
  localStorage.setItem("cd", window.location.href);
} */

  // Listener for keyshortcuts 
  document.addEventListener("keydown", (e) =>{
    if(currentSettings){
        let cur = currentSettings
      switch(e.key){
          case cur.currentRead:
              chrome.windows.create({"url": "https://www.nhentai.net", "incognito": true, "focused": true});
              break;
          case cur.snakeHideKey:
              if(cur.noteHide){
                  window.location.href = "Hide.html"
                  break;
              } else{
                  break;
              };
          case cur.frontKey:
              window.history.forward();
              break;
          case cur.backKey:
              window.history.back();
              break;
        /*   case cur.noteHideKey:
              if(cur.noteHide){
                  window.location.href = "Note.html"
                  break;
              } else {
                  break;
              }; */
      }
    }
})