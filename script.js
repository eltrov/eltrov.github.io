let requestURL = 'https://raw.githubusercontent.com/eltrov/json-test/master/acnh/fish.json'
let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
  const superHeroes = request.response;



  populateHeader(superHeroes);
}


function populateHeader(jsonObj) {
  const hrs = jsonObj['hrs'];
  // EXTRACT VALUE FOR HTML HEADER. 
  // ('Book ID', 'Book Name', 'Category' and 'Price')
  var col = [];
  for (var i = 0; i < hrs.length; i++) {
    for (var key in hrs[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1); // TABLE ROW.
  /*
    for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th"); // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
    }
  */
  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < hrs.length; i++) {

    tr = table.insertRow(-1);

    for (var j = 0; j < col.length; j++) {
      //if (j == 5) { }
      //if (j == 6) { th.colSpan = 1; th.bgColor = "pink"; }

      

      var th = document.createElement("th"); // TABLE HEADER.        
      th.innerHTML = hrs[i][col[j]];

      if (j == 5) { 
      th.colSpan = 2; 
      th.bgColor = "pink"; 
      th.innerHTML = "Hours Available";
      th.width = 300;
      }

      
      if (j == 11) { 
        th.colSpan = 2; 
        th.bgColor = "pink"; 
        th.innerHTML = "Months Available (Northern Hemisphere)";
        th.width = 300;
        }

        if (j == 16) { 
          th.colSpan = 2; 
          th.bgColor = "pink"; 
          th.innerHTML = "Months Available (Southern Hemisphere)";
          th.width = 300;
          }

      if (j == 6 || j == 7) { }
      else if (j == 8 || j == 9) { }
      else if (j == 10) { }
      else if (j == 12 || j == 13 || j == 14 || j == 15) { }
      else if (j == 17 || j == 18 || j == 19 || j == 20) { }
      else { tr.appendChild(th); }

        

      /*
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = hrs[i][col[j]];
      */
    }
  }


  const heroes = jsonObj['fish'];

  var col2 = [];
  for (var i = 0; i < heroes.length; i++) {
    for (var key in heroes[i]) {
      if (col2.indexOf(key) === -1) {
        col2.push(key);
      }
    }
  }
  for (var i = 0; i < heroes.length; i++) {

    tr = table.insertRow(-1);

    for (var j = 0; j < col2.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.align = "center";
      if (j == 0) {
        var img = document.createElement("img");
        var src = heroes[i][col2[0]];
        
        img.src = "https://raw.githubusercontent.com/eltrov/json-test/master/acnh/pic/" + src + ".png"
        img.title = heroes[i][col2[1]];
        //img.width = 70;
        //img.height = 70;
        //this is in the css now under .icon
        img.className = "icon";
        tabCell.appendChild(img);
      } 
      else if (j == 5) {
        var TimeLimited = heroes[i][col2[j]];
        if (TimeLimited === false) {
          tabCell.innerHTML = "All day";
          tabCell.colSpan = 2;
         }
         else {
           timeStart = heroes[i][col2[j+1]]
           timeEnd = heroes[i][col2[j+2]]
           
           time2Start = heroes[i][col2[8]]
           time2End = heroes[i][col2[9]]

          tabCell.colSpan = 2;
          if (time2Start == "") {
            tabCell.innerHTML = timeStart + " - " + timeEnd;
          }
          else {
            tabCell.innerHTML = timeStart + " - " + timeEnd + ", " + time2Start + " - " + time2End;
          }
          }
       }     
       else if (j == 11) {
        var TimeLimited = heroes[i][col2[j]];
        var timeStart = heroes[i][col2[12]];
        var timeEnd = heroes[i][col2[13]];

        if (TimeLimited === false) {
          tabCell.innerHTML = "All year";
          tabCell.colSpan = 2;
         }

         // Logic for Salmon/King Salmon, only available in September
         else if (timeStart == timeEnd)
         {
          tabCell.innerHTML = timeStart;
          tabCell.colSpan = 2;
         }

        else {
          timeStart = heroes[i][col2[j+1]]
          timeEnd = heroes[i][col2[j+2]]
          tabCell.colSpan = 2;
          tabCell.innerHTML = timeStart + " - " + timeEnd;
         }
       }           

       else if (j == 16) {
        var TimeLimited = heroes[i][col2[11]];
        var timeStart = heroes[i][col2[16]];
        var timeEnd = heroes[i][col2[17]];

        if (TimeLimited === false) {
          tabCell.innerHTML = "All year";
          tabCell.colSpan = 2;
         }

         // Logic for Salmon/King Salmon, only available in September
         else if (timeStart == timeEnd)
         {
          tabCell.innerHTML = timeStart;
          tabCell.colSpan = 2;
         }

        else {
          tabCell.colSpan = 2;
          tabCell.innerHTML = timeStart + " - " + timeEnd;
         }
       }  

       else if (j == 6 || j == 7 || j == 8 || j == 9) { tabCell.innerHTML = ""; tabCell.style = "display:none;"}
       else if (j == 10) { tabCell.innerHTML = ""; tabCell.style = "display:none;"}
       else if (j == 12 || j == 13 || j == 14 || j == 15) { tabCell.innerHTML = ""; tabCell.style = "display:none;"}
       else if (j == 17 || j == 18 || j == 19 || j == 20) { tabCell.innerHTML = ""; tabCell.style = "display:none;"}

       else { tabCell.innerHTML = heroes[i][col2[j]]; }
  }
}

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var elem = document.createElement('div');
  elem.style.cssText = 'position:absolute;width:100%;height:100%;z-index:100;'
  document.body.appendChild(elem);
  elem.appendChild(table);

}
