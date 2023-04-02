// The JETSCAPE Collaboration
//
// This script provides functionality for the talks creation
// and for parsing the json files in the data folder.

// function to print the array to the console
// useful for debugging
function printArray(array) {
  for (var i = 0; i < array.length; i++) {
      console.log(array[i]);
  }
}
  
// function to parse a json file and return a javascript array object
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

// function to call the table creation function at page load.
// input parameters: dataFile - the json file to parse, 
// tableID - the id of the table to create, 
// and a function parameter called linkFunc.
// the original json files may have the url and text description
// for the links in separate fields. 
// this function argument accepts a function as a parameter that
// can modify the array so the url and text description are in the
// same field as a complete anchor tag.
function createTable(dataFile, tableID, linkFunc) {
  let arr = parseJSON(dataFile);

  // processes the array if fields need to be combined
  arr = linkFunc(arr);

  // console.log output for debugging
  printArray(arr);

  // establishes the data source for the table
  $(document).ready(function () {
    $(tableID).DataTable(
    {
      "paging": false,
      "data": arr,
      "autoWidth": true,
      "bFilter": false,
      "bInfo": false,
      "select": true,
      "order": [[1, 'desc']],
    });

    // adds a mouseover and mouseout event to the table rows
    // to highlight the row when the mouse is over it
    $('#talkTable tbody').on( 'mouseover', 'tr', function () {
      $(this).toggleClass('selected');
    } );

    $('#talkTable tbody').on( 'mouseout', 'tr', function () {
      $(this).toggleClass('selected');
    } );
  });
}
