// script to create and populate the talks table'

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
  function createTable(dataFile, tableID, linkFunc) {
    let arr = parseJSON(dataFile);
  
    arr = linkFunc(arr);
  
    printArray(arr);
  
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

      $('#talkTable tbody').on( 'mouseover', 'tr', function () {
        $(this).toggleClass('selected');
      } );

      $('#talkTable tbody').on( 'mouseout', 'tr', function () {
        $(this).toggleClass('selected');
      } );
    });
  }
