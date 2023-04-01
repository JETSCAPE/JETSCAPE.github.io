let jetscapeMeetingsDataFile = "data/jetscapeMeetings.json";
let otherMeetingsDataFile = "data/otherMeetings.json";

let jetscapeMeetingsID = "#jetscapeMeetingsTable";
let otherMeetingsID = "#otherMeetingsTable";

let processLink = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let temp = "<a style=\"color:#333747\" href=\"" + arr[i][1] + "\">" + arr[i][0] + "</a>";
    arr[i][0] = temp;
    arr[i].splice(1, 1); // deleting the old element 1
  }
  return arr;
};

let makeTable = ()=> {
  createTable(jetscapeMeetingsDataFile, jetscapeMeetingsID, processLink);
  createTable(otherMeetingsDataFile, otherMeetingsID, processLink);
};
