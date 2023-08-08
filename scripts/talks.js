// The JETSCAPE Collaboration
//
// This script runs when the talks page is loaded.
// It calls the createTable function from scripts/tables.js
// and passes in the data file to populate the table,
// the html id of the table, and a function to write the
// anchor tag, which merges the url and text description fields
// into one array element.

let dataFile = "data/talks.json";
let tableID = "#talkTable";

let makeTable = ()=> {
  createTable(dataFile, tableID, (arr)=> {
    for (let i = 0; i < arr.length; i++) {

      if (arr[i][1] != "") {
        arr[i][0] = "<a style=\"color:#333747\" href=\"" + arr[i][1] + "\">" + arr[i][0] + "</a>";
      }

      arr[i].splice(1, 1); // deleting the old element 1

      if (arr[i][4] != "") {
        arr[i][3] = "<a style=\"color:#333747\" href=\"" + arr[i][4] + "\">" + arr[i][3] + "</a>";
      }

      arr[i].splice(4, 1); // deleting the old element 4
    }
    return arr;
  });
};
