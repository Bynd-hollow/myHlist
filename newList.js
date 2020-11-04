let newList = document.querySelector('#newList' );

newList.addEventListener("click", ()=>{
    var modal = document.getElementById("myModal");
    var cSpan = document.getElementById("NoB");
    var dSpan = document.getElementById("makeList");
    modal.style.display = "block";
    cSpan.onclick = function() {
        modal.style.display = "none";
      };
    dSpan.onclick = function(){
      const listName = document.getElementById('newListName').value;
      if(listName){
        chrome.storage.local.get('SysList', function(outcome) {
          if(outcome.SysList){
            let tempList = outcome.SysList;
            tempList.push(listName);
            chrome.storage.local.set({'SysList': tempList}, function() {
              var emTList = {}; 
              emTList[listName] = [];
              chrome.storage.local.set(emTList, function() {
                location.reload();
              });
            });
          }
        });
      }
    };
})