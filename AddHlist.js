let addEntry = document.querySelector( '#buttAdd' );
let addEntry2 = document.querySelector( '#addCurrent' );
let addEntry3 = document.querySelector( '#addCurrentW' );
let dropInput = document.querySelector('#dropDown');
let switchMode = document.querySelector('#switch');
let textSwTC = document.getElementById("sTC");
var mood = document.getElementById("myModal");
var slele = document.getElementById("switch");
var selectedValue;
var possibleModes = ["Add Single Entry Manually", "Add Current Page With Nickname", "Add Current Page", "Bulk Add List"];
var selectedMode;
var iterator = 0;

document.getElementById("dropDown").textContent = "ALL";
 textSwTC.textContent = "Add Single Entry Manually";

// List selector 
chrome.storage.local.get('SysList', function(res) {
  if(res.SysList){
      // If found, sets the users lists to the list found
      // Loops through the user's list to display all of his lists to be selected
      for(var i = 0; i < res.SysList.length; i++){
          let selectionEntry = document.createElement('button');
          selectionEntry.setAttribute("value", res.SysList[i]);
          selectionEntry.textContent = res.SysList[i]
          selectionEntry.className = "Sdrop";
          document.getElementById("mood").appendChild(selectionEntry);
      }
  } 
});

var dis = false;
// Display lists for selection
dropInput.addEventListener("click", ()=> {
  mood.style.display = "block";
  mood.addEventListener("click", (e)=>{
    if(e.target.classList.contains("Sdrop")){
      selectedValue = e.target.value;
       mood.style.display = "none";
       document.getElementById("dropDown").textContent = selectedValue;
    }
  })
});

// sets the selected value 

switchMode.addEventListener("click", ()=>{
  if(iterator == 3){
    iterator = 0;
  } else {
    iterator++;
  }
  selectedMode = possibleModes[iterator];
  textSwTC.textContent = selectedMode;
})



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


//Listener for adding codes manually 
addEntry.addEventListener("click", () => {
  //Retreiving text fields input 
  //Nickname value
  const entry = document.getElementById('addToList').value;
  // 6 digit code value 
  const nickname = document.getElementById('addToList2').value;
  // check if fields are empty or invalid to pervent storing empty objects (can cause a shit ton of errors later)
  if (entry && nickname){
    if (entry.length < 7){
      if (entry == parseInt(entry)){
        //Outdated, now using chrome.storage API
      /* var storageL = localStorage.length + 1;
      var storeEntry = {id: storageL, name: nickname, code: entry, page: "/"};
    localStorage.setItem(storageL, JSON.stringify(storeEntry)); */
    // Sets values to dropInput's value, done only when button is clicked so it gets the value at that time
    //Gets selected list from local storage 
    chrome.storage.local.get(selectedValue, function(result){
      //creates a new entry based on input 
      let newEntry = {name: nickname, code: entry, page: 0, origin: 1};
      // sets a temporary variable to the retreived value using a computed selector with the selected value 
      let tempR = result[selectedValue];
      // Pushes new entry to the variable (object) 
      tempR.push(newEntry);
      let tempL = {};
      // Uses computed operator to set the key value to the selected variable so it can be retored 
      tempL[selectedValue] = tempR;
      chrome.storage.local.set(tempL, function(){    
      document.getElementById('addedd').textContent = "Added to your list!";
      document.getElementById('addedd').style.color = "white";
      setTimeout(function(){  document.getElementById('addedd').style.color = "Black";}, 1000);
      setTimeout(function(){ location.reload();}, 1000);})
    });
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

//add current page with nickname 
// Listener for click event for button
addCurrent.addEventListener("click", () => {
  var nickname2 = document.getElementById('addToList3').value;
  //Checks if there is a nickname in input field so it wont cause storage errors later
  if (nickname2 != null){
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      var tabURL = tabs[0].url;
      //Checks both nickname and current tab to ensure its a nhentai page 
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
