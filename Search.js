let searchListBar = document.querySelector('#searchMyList');



searchListBar.addEventListener("keyup", () => {
   // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchMyList');
  filter = input.value.toUpperCase();
  tableTopp = document.getElementById('stableT');
  trr = tableTopp.getElementsByTagName('tr');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < trr.length; i++) {
    td = trr[i].getElementsByTagName('td')[1];
    td2 = trr[i].getElementsByTagName('td')[2];
    if (td || td2){
      txtValue = td.textContent || td.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
        trr[i].style.display = "";
      } else {
        trr[i].style.display = "none";
      }
    }
  }} );
