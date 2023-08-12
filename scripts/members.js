
let dataFile = "data/JETSCAPE_Authors.json";
let tableID = "#authorsTable";

// function to write JETSCAPE_Authors.json as an unordered list
function writeAuthors() {
    // read in the JSON file
    $.getJSON(dataFile, function(data) {
        // loop over the authors
        $.each(data, function(key, val) {
            // write the author to the unordered list
            $(tableID).append("<li>" + val + "</li>");
        });
    });
}