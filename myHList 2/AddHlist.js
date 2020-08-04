let addEntry = document.querySelector( '#buttAdd' );
let addEntry2 = document.querySelector( '#addCurrent' );
let addEntry3 = document.querySelector( '#addCurrentW' );
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    let doc = new DOMParser().parseFromString(request.source, 'text/html');
    let div = doc.getElementsByClassName("tags");
    let cog = [];
    let hentaiName = doc.getElementsByClassName("pretty");
    let hName = hentaiName[0].textContent;
    for(var n = 2; n < div.length - 1; n++){
      let div2 = div[n].getElementsByClassName("name");
      for (var t = 0; t < div2.length; t++){
        let cogg = cog.push(div2[t].textContent);
      }
  }
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      var tabURL = tabs[0].url;
      var shrtnd = tabURL.substring(22);
      var codeR = shrtnd.substr(0, shrtnd.indexOf('/'));
      var storageL = localStorage.length + 1;
      var page = shrtnd.substr(shrtnd.indexOf('/'));
      var storeEntry = {id: storageL, name: hName, code: codeR, page: page, data: cog};
      localStorage.setItem(storageL, JSON.stringify(storeEntry));
});
}
});

addEntry.addEventListener("click", () => {
  const entry = document.getElementById('addToList').value;
  const nickname = document.getElementById('addToList2').value;
  if (entry && nickname){
    if (entry.length < 7){
      if (entry == parseInt(entry)){
      var storageL = localStorage.length + 1;
      var storeEntry = {id: storageL, name: nickname, code: entry, page: "/"};
    localStorage.setItem(storageL, JSON.stringify(storeEntry));
    document.getElementById('addedd').textContent = "Added to your list!";
    document.getElementById('addedd').style.color = "white";
    setTimeout(function(){  document.getElementById('addedd').style.color = "Black";}, 1000);
    setTimeout(function(){ location.reload();}, 1000);
  } else {
    document.getElementById('addedd').textContent = "That code is numbers only!";
    document.getElementById('addedd').style.color = "white";
    setTimeout(function(){  document.getElementById('addedd').style.color = "Black";}, 1000);
  }
} else {
  document.getElementById('addedd').textContent = "Code must be 6 digits!";
  document.getElementById('addedd').style.color = "white";
  setTimeout(function(){  document.getElementById('addedd').style.color = "Black";}, 1000);
}
}
});

addCurrent.addEventListener("click", () => {
  var nickname2 = document.getElementById('addToList3').value;
  if (nickname2 != null){
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      var tabURL = tabs[0].url;
      if (nickname2 && tabURL){
        var shrtnd = tabURL.substring(22);
        var storageL = localStorage.length + 1;
        var page = shrtnd.substr(shrtnd.indexOf('/'));
        var codeR = shrtnd.substr(0, shrtnd.indexOf('/'));
        var storeEntry = {id: storageL, name: nickname2, code: codeR, page: page};
        localStorage.setItem(storageL, JSON.stringify(storeEntry));
        document.getElementById('addedd').textContent = "Added to your list!";
        document.getElementById('addedd').style.color = "white";
        setTimeout(function(){  document.getElementById('addedd').style.color = "Black";}, 1000);
        setTimeout(function(){ location.reload();}, 1000);
      }
  });
  }
});

addCurrentW.addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    var tabURLD = tabs[0].url;
    if (tabURLD.substring(0).indexOf("nhentai.net/g") > -1){
      chrome.tabs.executeScript(null, {
        file: "Content.js"
      }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
          alert('There was an error injecting script : \n' + chrome.runtime.lastError.message);
        }
      });
      document.getElementById('addedd').textContent = "Added to your list!";
      document.getElementById('addedd').style.color = "white";
      setTimeout(function(){  document.getElementById('addedd').style.color = "Black";}, 1000);
      setTimeout(function(){ location.reload();}, 1000);
    } else {
      document.getElementById('addedd').textContent = "Your not on a nhentai doujinshi page!";
      document.getElementById('addedd').style.color = "white";
      setTimeout(function(){  document.getElementById('addedd').style.color = "Black";}, 1000);
      setTimeout(function(){ location.reload();}, 1000);
    }
  })
})
