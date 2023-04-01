// script to create and populate the talks table

// function to print the array to the console
function printArray(array) {
    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
  }
  
  // function to parse a json array file and return a javascript array
  function parseJSON(file) {
    let array = [];
    $.ajax({
      url: file,
      dataType: 'json',
      async: false,
      success: function(data) {
        array = data;
      }
    });
    return array;
  }
  
  // function to call the table creation function at page load
  function createTable() {
    let arr = parseJSON("data/talks.json");
  
    for (let i = 0; i < arr.length; i++) {
      let temp = "<a style=\"color:#333747\" href=\"" + arr[i][1] + "\">" + arr[i][0] + "</a>";
      arr[i][0] = temp;
      arr[i].splice(1, 1); // deleting the old element 1
      temp = "<a style=\"color:#333747\" href=\"" + arr[i][4] + "\">" + arr[i][3] + "</a>";
      arr[i][3] = temp;
      arr[i].splice(4, 1); // deleting the old element 4
    }
  
    printArray(arr);
  
    $(document).ready(function () {
      $('#talkTable').DataTable(
      {
        "paging": false,
        "data": arr,
        "autoWidth": true,
        "bFilter": false,
        "bInfo": false,
      });
    });
  }