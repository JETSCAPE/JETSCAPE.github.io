// The JETSCAPE Collaboration
//
// This script inserts the navigation bar near the top of
// every page.

fetch('nav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#insert_menu");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})