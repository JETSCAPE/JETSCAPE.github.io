var currentImage = document.getElementById("current-image");
var imageThumbs = document.getElementById("image-thumbs");

for (var i = 1; i <= 7; i++) {
    var thumb = document.createElement("img");
    thumb.src = "gallery/sample_img_0" + i + ".png";
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