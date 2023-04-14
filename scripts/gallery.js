// The JETSCAPE Collaboration
//
// This script provides thumbnails for the gallery images
// that are displayed on the gallery.html page.

var currentImage = document.getElementById("current-image");
var imageThumbs = document.getElementById("image-thumbs");

for (var i = 0; i <= 6; i++) {
    var thumb = document.createElement("img");
    thumb.src = "gallery/img_0" + i + ".png";
    thumb.alt = "Image 0" + i;
    thumb.classList.add("thumb");
    imageThumbs.appendChild(thumb);

    thumb.addEventListener(
        "click", function() {
            currentImage.src = this.src;
            currentImage.alt = this.alt;
        }
    );
}
