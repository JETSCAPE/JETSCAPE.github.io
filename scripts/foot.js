// The JETSCAPE Collaboration
//
// This script inserts the footer foot.html at the bottom of
// every page.

fetch('foot.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#insert_footer");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})
