// script to create and populate the talks table

// function to read an Excel file into an array
function readExcel(file) {
    var data = [];
    var lines = file.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].split(",");
        data.push(line);
    }
    return data;
}

// function to print the array to the console
function printArray(array) {
    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
}

// function to create a data table and populate it with the data from an array
function createTable(array) {
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");
    for (var i = 0; i < array.length; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < array[i].length; j++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(array[i][j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    document.body.appendChild(table);
}

// function to read the excel file and create the table
function createTalksTable() {
    var file = "data/talks.xlsx";
    var array = readExcel(file);
    createTable(array);
}



