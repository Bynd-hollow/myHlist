var currentList = localStorage.getItem("od");

//retrieves list  
chrome.storage.local.get(currentList, function(result){
// sets the list to display
let loadList = result[currentList];
// Loops though lists array and dynamically displays all of the entries
if(loadList){
for (let i = 0; i < loadList.length; i++){

  let entry = loadList[i];
  //Outdated 
/*   const keyCode = localStorage.key(i);
  const vNickname = localStorage.getItem(keyCode);
  const eObj = JSON.parse(vNickname) */

  var tableTop1 = document.createElement("tr");
  var tableEntry = document.createElement("td");
  var tableEntry2 = document.createElement("td");
  var tableEntry3 = document.createElement("td");
  var tableEntry0 = document.createElement("td");
  var tableEntry4 = document.createElement("td");
  var hyper = document.createElement("a");

// Deprecated 
  if (entry.data){
  var nodeName = entry.name;
  var tableText = document.createTextNode(nodeName);
  tableEntry.id = "snowflake";
} else {
  var tableText = document.createTextNode(entry.name);
}

  var tableText2 = document.createTextNode(entry.code);
  var tableText3 = document.createTextNode("-->");
  var removeTextE = document.createTextNode("X");
  if (entry.page == "/"){
    var p = 0;
  } else {
    var p = entry.page;
  }
  var pageText = document.createTextNode(p);
  tableTop1.className = "testing";
  tableEntry.className = "t5";
  tableEntry2.className = "t6";
  tableEntry3.className = "t4";
  tableEntry0.className = "r1";
  tableEntry4.className = "t7";
  tableEntry0.appendChild(removeTextE);
  tableEntry.appendChild(tableText);
  tableEntry2.appendChild(tableText2);
  tableEntry4.appendChild(pageText);
  hyper.setAttribute("href", "https://www.nhentai.net/g/" + entry.code + entry.page);
  hyper.setAttribute("target", "_blank");
  hyper.style.color = "White";
  hyper.style.textDecoration = "none";
  hyper.style.zIndex = "1";
  hyper.appendChild(tableText3);
  tableEntry3.appendChild(hyper);

  tableTop1.appendChild(tableEntry0);
  tableTop1.appendChild(tableEntry);
  tableTop1.appendChild(tableEntry2);
  tableTop1.appendChild(tableEntry4);
  tableTop1.appendChild(tableEntry3);
  document.getElementById('stableT').appendChild(tableTop1);

}
} else{
  let sBar = document.getElementById('searchMyList');
  sBar.style.display = "none";
  let nO = document.getElementById('in');
  let n = document.createElement('img');
  n.setAttribute("src", "Assets/Icon.png");
  nO.appendChild(n);
}
});

const toppTable = document.querySelector('#stableT');

toppTable.addEventListener("click", function(event){
  const target = event.target;
  tableTopp = document.getElementById('stableT');
  trr = tableTopp.getElementsByTagName('tr');

  if (target.id == ('snowflake')){
    for (var s = 0; s < trr.length; s++){
      if (trr[s].contains(target)){
        var modal = document.getElementById("myModal");
        var cSpan = document.getElementById("NoB");
        var dSpan = document.getElementById("yesB");
        var moodle = document.getElementById("mood");
        var goodle = document.getElementById("grood");
        ssey = localStorage.key(s)
        sssey = JSON.parse(localStorage.getItem(ssey));
        moodle.textContent = sssey.name + sssey.data;
        goodle.textContent = "Data is in order of: title, tags, author, language, pages:";
        modal.style.display = "block";
        cSpan.textContent = "ok";
        dSpan.style.display = "none"
        cSpan.onclick = function() {
          goodle.textContent = "Are you sure you want to delete";
          cSpan.textContent = "No";
          modal.style.display = "none";
          dSpan.style.display = "";
        };
      }
    }
  }

  if (target.classList.contains('t7')){
    for (var b = 0; b < trr.length; b++){
      if (trr[b].contains(target)){
        var pPnput = document.getElementById("pagess");
        var pInput = document.getElementById("pageNm");
        var pTc = document.getElementById("pTcontent");
        var savve = document.getElementById("save");
        bbey = localStorage.key(b)
        bbbey = JSON.parse(localStorage.getItem(bbey));
        pTc.textContent = bbbey.name;
        pInput.setAttribute("placeholder", bbbey.page);
        pPnput.style.display = "block";

        savve.onclick = function() {
          bbbey.page = pInput.value;
          localStorage.setItem(bbey, JSON.stringify(bbbey));
          location.reload();
        };
      }
    }


  }

  if (target.classList.contains('r1')){
    for (var k = 0; k < trr.length; k++){
      if (trr[k].contains(target)){
        var modal = document.getElementById("myModal");
        var cSpan = document.getElementById("NoB");
        var dSpan = document.getElementById("yesB");
        var moodle = document.getElementById("mood");
        moodle.textContent = trr[k].getElementsByTagName("td")[1].textContent + "   " + trr[k].getElementsByTagName("td")[2].textContent;
        modal.style.display = "block";
        kkey = localStorage.key(k)
        cSpan.onclick = function() {
          modal.style.display = "none";
        };
        dSpan.onclick = function() {
        localStorage.removeItem(kkey);
        location.reload();
      }
      }
    }


  }
})
