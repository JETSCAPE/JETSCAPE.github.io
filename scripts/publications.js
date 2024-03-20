// The JETSCAPE Collaboration
//
// This makeList function in this script runs when the publications page 
// is loaded.  This script writes the html for the publications list
// using data from the data/publications.json file.

let pubDataFile = "data/publications.json";
let pubID = "#pubList";

// The html for the publications list is passed to this function,
// which writes it to the page at location of the "pubList" id.
let writeHTML = (str) => {
    let container = document.getElementById("pubList");
    let newDiv = document.createElement("div");
    newDiv.innerHTML = str;
    container.appendChild(newDiv);
};

// One of the fields in the json file lists the article year.
// This function returns an array of unique keys, sorted in descending 
// order, and can be used to return an array of unique years.
let getUnique = (arr, key) => {
    let unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i][key]) === -1) {
            unique.push(arr[i][key]);
        }
    }
    return unique.sort().reverse();
};

// This function builds the html string for the publications list.
let buildString = (arr) => {
    let str = "";
    let uniqueYears = getUnique(arr, "earliest_year");

    for (let i = 0; i < uniqueYears.length; i++) {

        // prints the relevant as a header
        str += "<h3 class=\"yearHeader\">" + uniqueYears[i] + "</h3>";
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].earliest_year === uniqueYears[i]) {

                // a div to apply css formatting to the article block
                str += "<div = class=\"articleBlock\">";

                // if the author field is not empty, print it
                if (arr[j].author)
                    str += "<p>" + arr[j].author;
                    if (arr[j].first_author_affiliation)
                        str += " (" + arr[j].first_author_affiliation + ")";
                    if (arr[j].et_al)
                        str += " et al.";
                    if (arr[j].date)
                        str += " (" + arr[j].date + ")";
                    str += "</p>";

                // if the title also includes an url, print it as a link
                if (arr[j].title && arr[j].url)
                    str += "<p><a href=\"" + arr[j].url + "\">" + arr[j].title + "</a></p>";
                else if (arr[j].title)
                    str += "<p>" + arr[j].title + "</p>";
                
                // if the journal fields are not empty, print them
                // along with any volume number, issue number, page numbers, year
                if (arr[j].journal) {
                    if (arr[j].journal)
                        str += "<p>" + arr[j].journal;
                    if (arr[j].volume)
                        str += ", vol. " + arr[j].volume;
                    if (arr[j].number)
                        str += ", no. " + arr[j].number;
                    if (arr[j].pages)
                        str += ", pp. " + arr[j].pages;
                    if (arr[j].pub_year)
                        str += " (" + arr[j].pub_year + ")";
                    str += "</p>";
                }

                // if the url, doi, or arxiv_eprint fields are not empty, print them as links
                // in a collapsible div
                if (arr[j].url || arr[j].doi) {
                    str += "<button type=\"button\" class=\"collapsible\">Links</button>";
                    str += "<div class=\"content\">";
                    if (arr[j].doi)
                        str += "<p><a href=\"https://doi.org/" + arr[j].doi + "\">" +
                         arr[j].doi + "</a></p>";
                    if (arr[j].url)
                        str += "<p><a href=\"" + arr[j].url + "\">" + arr[j].url + "</a></p>";
                    if (arr[j].arxiv_eprint)
                        str += "<p>e-print: <a href=\"https://arxiv.org/abs/" + arr[j].arxiv_eprint + "\">" +
                         arr[j].arxiv_eprint + "</a></p>";
                    str += "</div>";
                }

                // if the abstract field is not empty, print it in a collapsible div
                if (arr[j].abstract) {
                    str += "<button type=\"button\" class=\"collapsible\">Abstract</button>";
                    str += "<div class=\"content\">";
                    str += "<p>" + arr[j].abstract + "</p>";
                    str += "</div>";
                }

                str += "</div>"; // end articleBlock
                str += "<br>";
            }
        }
    }
    return str;
};

// This function provides listeners so the links and abstract fields
// can be expanded and collapsed.
let collapseListeners = () => {
    let coll = document.getElementsByClassName("collapsible");

    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } 
            else {
                content.style.display = "block";
            }
        });
    }
};

// This function runs when the publications page is loaded.
let makeList = ()=> {
    // parse the data file
    let arr = parseJSON(pubDataFile);
    
    // prints to console for debugging
    printArray(arr);

    // build the html string
    str = buildString(arr);

    // write the html string to the page
    writeHTML(str);

    // adds listeners so links and abstract fields can be
    // expanded and collapsed
    collapseListeners();
}
