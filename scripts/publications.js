let pubDataFile = "data/publications.json";
let pubID = "#pubList";

let writeHTML = (str) => {
    let container = document.getElementById("pubList");
    let newDiv = document.createElement("div");
    newDiv.innerHTML = str;
    container.appendChild(newDiv);
};

// get a list of unique descending key values
let getUnique = (arr, key) => {
    let unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i][key]) === -1) {
            unique.push(arr[i][key]);
        }
    }
    return unique.sort().reverse();
};

let buildString = (arr) => {
    let str = "";
    let uniqueYears = getUnique(arr, "year");
    for (let i = 0; i < uniqueYears.length; i++) {
        str += "<h3 class=\"yearHeader\">" + uniqueYears[i] + "</h3>";
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].year === uniqueYears[i]) {
                str += "<div = class=\"articleBlock\">";

                if (arr[j].author)
                    str += "<p>" + arr[j].author + "</p>";

                if (arr[j].title && arr[j].url)
                    str += "<p><a href=\"" + arr[j].url + "\">" + arr[j].title + "</a></p>";
                else if (arr[j].title)
                    str += "<p>" + arr[j].title + "</p>";

                if (arr[j].tppubtype && arr[j].pubstate)
                    str += "<p>" + arr[j].tppubtype + " " + arr[j].pubstate + "</p>";
                
                if (arr[j].journal || arr[j].booktitle) {
                    if (arr[j].journal)
                        str += "<p>" + arr[j].journal;
                    else if (arr[j].booktitle)
                        str += "<p>" + arr[j].booktitle;

                    if (arr[j].volume)
                        str += ", vol. " + arr[j].volume;
                    if (arr[j].number)
                        str += ", no. " + arr[j].number;
                    if (arr[j].pages)
                        str += ", pp. " + arr[j].pages;
                    if (arr[j].year)
                        str += ", " + arr[j].year;
                    if (arr[j].note)
                        str += ", " + arr[j].note;
                    str += ".</p>";
                }

                if (arr[j].url || arr[j].doi) {
                    str += "<button type=\"button\" class=\"collapsible\">Links</button>";
                    str += "<div class=\"content\">";
                    if (arr[j].doi)
                        str += "<p><a href=\"https://doi.org/" + arr[j].doi + "\">" +
                         arr[j].doi + "</a></p>";
                    if (arr[j].url)
                        str += "<p><a href=\"" + arr[j].url + "\">" + arr[j].url + "</a></p>";
                    str += "</div>";
                }

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

let makeList = ()=> {
    let arr = parseJSON(pubDataFile);
    printArray(arr);
    str = buildString(arr);
    writeHTML(str);
    collapseListeners();
}
