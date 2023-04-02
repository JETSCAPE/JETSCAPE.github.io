// The JETSCAPE Collaboration
//
// This script runs when the meetings page is loaded.
// It calls the createTable function from scripts/tables.js
// and passes in the data files to populate the tables,
// the html IDs of the relevant tables, and a function to write the
// anchor tag, which merges the url and text description fields
// into one array element.

// the data files for each table
let jetscapeMeetingsDataFile = "data/jetscapeMeetings.json";
let otherMeetingsDataFile = "data/otherMeetings.json";

// the html IDs of each table
let jetscapeMeetingsID = "#jetscapeMeetingsTable";
let otherMeetingsID = "#otherMeetingsTable";

// the function to write the anchor tag
let processLink = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let temp = "<a style=\"color:#333747\" href=\"" + arr[i][1] + "\">" + arr[i][0] + "</a>";
    arr[i][0] = temp;
    arr[i].splice(1, 1); // deleting the old element 1
  }
  return arr;
};

// makeTable is the function that runs at page load.
// calls createTable twice, once for each table.
let makeTable = ()=> {
  createTable(jetscapeMeetingsDataFile, jetscapeMeetingsID, processLink);
  createTable(otherMeetingsDataFile, otherMeetingsID, processLink);
};
