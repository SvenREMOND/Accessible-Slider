async function getImages() {
    let imagesData = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
    imagesData = await imagesData.json();

    let container = document.querySelector(".contents");

    for (const key in imagesData) {
        if (Object.hasOwnProperty.call(imagesData, key)) {
            const image = imagesData[key];

            let content = document.createElement("div");
            content.classList.add("slide");
            content.id = key;
            let img = document.createElement("img");
            img.src = image.url;
            content.append(img);
            container.append(content);
        }
    }
}

await getImages();

let slider = document.querySelector(".contents");
slider.style.overflowX = "hidden";
let slides = document.querySelectorAll(".slide");

let rightButton = document.querySelector("#right");
rightButton.style.display = "block";
rightButton.addEventListener("click", changeSlide);
let leftButton = document.querySelector("#left");
leftButton.style.display = "block";
leftButton.addEventListener("click", changeSlide);

slider.style.width = slider.clientWidth - rightButton.getBoundingClientRect().width - leftButton.getBoundingClientRect().width + "px";
slider.style.marginLeft = (rightButton.getBoundingClientRect().width + leftButton.getBoundingClientRect().width) / 2 + "px";

let paginations = document.querySelectorAll(".paginate a");
paginations.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        let href = e.target.attributes.href.value.replace("#", "");
        goToSlide(document.getElementById(href));
    });
});

let actualSlide = 0;
function changeSlide(e) {
    let direction = e.target.id == "left" ? -1 : 1;

    if (slider.scrollLeft != slides[actualSlide].offsetLeft) {
        slides.forEach((slide, i) => {
            if (slider.scrollLeft == slide.offsetLeft) actualSlide = i;
        });
    }

    let slideToGo = actualSlide + direction;

    if (slideToGo < 0) {
        actualSlide = slideToGo = 9;
    } else if (slideToGo > slides.length - 1) {
        slideToGo = 0;
    } else {
        actualSlide = slideToGo;
    }

    goToSlide(slides[slideToGo]);
}

function goToSlide(slide) {
    slider.scrollTo({ top: 0, left: slide.offsetLeft, behavior: "smooth" });

    slides.forEach((sl, i) => {
        if (slide.offsetLeft == sl.offsetLeft) actualSlide = i;
    });
}
