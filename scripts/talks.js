let dataFile = "data/talks.json";
let tableID = "#talkTable";

let makeTable = ()=> {
  createTable(dataFile, tableID, (arr)=> {
    for (let i = 0; i < arr.length; i++) {
      let temp = "<a style=\"color:#333747\" href=\"" + arr[i][1] + "\">" + arr[i][0] + "</a>";
      arr[i][0] = temp;
      arr[i].splice(1, 1); // deleting the old element 1
      temp = "<a style=\"color:#333747\" href=\"" + arr[i][4] + "\">" + arr[i][3] + "</a>";
      arr[i][3] = temp;
      arr[i].splice(4, 1); // deleting the old element 4
    }
    return arr;
  });
};
