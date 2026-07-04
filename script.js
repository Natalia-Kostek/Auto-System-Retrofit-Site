let images = [];
let currentCategory = "";
let currentIndex = 0;
/* =========================
   GALLERY PRO (CLEAN FINAL)
========================= */

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const counter = document.getElementById("lightbox-counter");
const thumbs = document.getElementById("lightbox-thumbs");

/* =========================
   CATEGORIES
========================= */

const categories = {
    haki: 35,
    instalacje: 10,
    radio_kamery: 14,
    czujniki: 16,
    podcinanie_zderzaka: 4,
    regeneracja_kloszy: 8
};

/* =========================
   LOAD CATEGORY
========================= */
function loadCategory(cat){

    currentCategory = cat;
    images = [];

    let i = 1;

    function tryLoad() {
        const img = `images/${cat}/${i}.jpg`;

        const test = new Image();

        test.onload = () => {
            images.push(img);
            i++;
            tryLoad();
        };

        test.onerror = () => {
            renderGallery();
        };

        test.src = img;
    }

    tryLoad();
}
/* =========================
   RENDER GALLERY
========================= */

function renderGallery() {

    if (!gallery) return;

    gallery.innerHTML = "";

    images.forEach((src, index) => {

        const item = document.createElement("div");
        item.className = "gallery-item";

        const img = document.createElement("img");
        img.src = src;
        img.loading = "lazy";

        item.appendChild(img);

        item.addEventListener("click", () => {
            openLightbox(index);
        });

        gallery.appendChild(item);
    });
}

/* =========================
   LIGHTBOX
========================= */

function openLightbox(index) {

    currentIndex = index;

    lightboxImg.style.opacity = "0";
    lightboxImg.src = images[currentIndex];

    lightboxImg.onload = () => {
        lightboxImg.style.opacity = "1";
    };

    if (counter) {
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    buildThumbs();
    updateThumbs();

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

/* =========================
   IMAGE CHANGE (FADE)
========================= */

function changeImage(index) {

    lightboxImg.style.opacity = "0";

    setTimeout(() => {

        currentIndex = index;
        lightboxImg.src = images[currentIndex];

        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${images.length}`;
        }

        lightboxImg.onload = () => {
            lightboxImg.style.opacity = "1";
        };

        updateThumbs();

    }, 150);
}

function nextImage() {
    changeImage((currentIndex + 1) % images.length);
}

function prevImage() {
    changeImage((currentIndex - 1 + images.length) % images.length);
}

/* =========================
   THUMBNAILS
========================= */

function buildThumbs() {

    if (!thumbs) return;

    thumbs.innerHTML = "";

    images.forEach((src, index) => {

        const img = document.createElement("img");
        img.src = src;

        if (index === currentIndex) {
            img.classList.add("active");
        }

        img.addEventListener("click", () => {
            changeImage(index);
        });

        thumbs.appendChild(img);
    });
}

function updateThumbs() {

    if (!thumbs) return;

    const all = thumbs.querySelectorAll("img");

    all.forEach((img, i) => {
        img.classList.toggle("active", i === currentIndex);
    });
}

/* =========================
   EVENTS
========================= */

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (nextBtn) nextBtn.addEventListener("click", nextImage);
if (prevBtn) prevBtn.addEventListener("click", prevImage);

if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", (e) => {

    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
});

/* =========================
   TABS
========================= */

document.querySelectorAll(".tab").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        loadCategory(btn.dataset.cat);
    });
});

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector(".reviews-track");
  const prev = document.querySelector(".rev-btn.prev");
  const next = document.querySelector(".rev-btn.next");

  if (!track) return;

  let index = 0;

  function getStep() {
    const card = document.querySelector(".review-card");
    const gap = 20;
    return card ? card.offsetWidth + gap : 320;
  }

  function update() {
    track.style.transform = `translateX(-${index * getStep()}px)`;
  }

  function nextSlide() {
    const cards = document.querySelectorAll(".review-card");
    const max = cards.length - 3;

    index = (index >= max) ? 0 : index + 1;
    update();
  }

  function prevSlide() {
    const cards = document.querySelectorAll(".review-card");
    const max = cards.length - 3;

    index = (index <= 0) ? max : index - 1;
    update();
  }

  next?.addEventListener("click", nextSlide);
  prev?.addEventListener("click", prevSlide);

  setInterval(nextSlide, 5000);

  window.addEventListener("resize", update);

  update();
});
