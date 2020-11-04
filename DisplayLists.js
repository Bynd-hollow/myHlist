// The current listst the user has created
var listsSelection = [];

//Initialisation, checking whether the system list, the settings entry and currently reading lists are present
    chrome.storage.local.get('SysList', function(outcome) {
        if(outcome.SysList){
            // If found, sets the users lists to the list found
            listsSelection = outcome.SysList;
            // Loops through the user's list to display all of his lists 
            for(var i = 0; i < listsSelection.length; i++){
                let listEntry = document.createElement('a');
                listEntry.className = "selector";
                listEntry.setAttribute("title", listsSelection[i]);
                listEntry.setAttribute("href","MyList.html");
                listEntry.setAttribute("data-before", listsSelection[i]);
                document.getElementById('selection').appendChild(listEntry);
            }
        } else {
            // If no lists are found, initialises the extension with the 3 system conifgs
            // Note: if this happens if its not the initial installaiton of the extension, something has gone wrong.
            let defList = ["ALL"]
            chrome.storage.local.set({'SysList': defList}, function() {
                console.log("Initialised storage with" + defList);
                chrome.storage.local.set({"ALL": []}, function() {
                    location.reload();
                  });
              });
        }
      });

      const selectorCheck = document.querySelector('#selection');

      selectorCheck.addEventListener("click", (evnt)=>{
          var dest = evnt.target.getAttribute("title");
          localStorage.setItem("od", dest);
      })
