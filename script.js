/* =========================
   HERO SLIDER
========================= */

const slides = document.querySelectorAll(".slide");
let current = 0;

function showSlide(index) {
    if (!slides.length) return;

    slides.forEach((s, i) => {
        s.classList.remove("active");
        if (i === index) s.classList.add("active");
    });
}

function nextSlide() {
    if (!slides.length) return;

    current++;
    if (current >= slides.length) current = 0;

    showSlide(current);
}

if (slides.length > 0) {
    showSlide(0);
    setInterval(nextSlide, 5000);
}

/* NAV SMOOTH SCROLL */

document.querySelectorAll("nav a").forEach(a => {
    a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* HEADER */

const header = document.querySelector("header") || document.querySelector(".header");

if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });
}

/* LOADER */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.remove();
});

/* REVIEWS */

const track = document.querySelector(".reviews-track");
const cards = document.querySelectorAll(".review-card");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let reviewIndex = 0;

function updateReviews() {
    if (!track || !cards.length) return;

    const width = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${reviewIndex * width}px)`;
}

if (track && cards.length && next && prev) {

    next.addEventListener("click", () => {
        reviewIndex = (reviewIndex + 1) % cards.length;
        updateReviews();
    });

    prev.addEventListener("click", () => {
        reviewIndex = (reviewIndex - 1 + cards.length) % cards.length;
        updateReviews();
    });

    setInterval(() => {
        reviewIndex = (reviewIndex + 1) % cards.length;
        updateReviews();
    }, 5000);
});

/* GALLERY */

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const images = Array.from({ length: 35 }, (_, i) => `images/${i + 1}.jpg`);

let currentIndex = 0;

if (gallery) {
    images.forEach((src, index) => {
        const item = document.createElement("div");
        item.className = "gallery-item";

        const img = document.createElement("img");
        img.src = src;
        img.alt = `Realizacja ${index + 1}`;

        item.appendChild(img);

        item.onclick = () => openLightbox(index);

        gallery.appendChild(item);
    });
}

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
}

document.querySelector(".close")?.addEventListener("click", closeLightbox);
document.querySelector(".lightbox-next")?.addEventListener("click", nextImage);
document.querySelector(".lightbox-prev")?.addEventListener("click", prevImage);

document.querySelector(".lightbox")?.addEventListener("click", (e) => {
    if (e.target.classList.contains("lightbox")) closeLightbox();
});

document.addEventListener("keydown", (e) => {
    if (!lightbox?.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
});
