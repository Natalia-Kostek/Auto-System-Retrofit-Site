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

/* =========================
   NAV SMOOTH SCROLL
========================= */

document.querySelectorAll("nav a").forEach(a => {
    a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* =========================
   HEADER EFFECT
========================= */

const header = document.querySelector("header") || document.querySelector(".header");

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
        setTimeout(() => loader.remove(), 500);
    }
});

/* =========================
   REVIEWS SLIDER
========================= */

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
}

/* =========================
   GALLERY
========================= */

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const counter = document.getElementById("lightbox-counter");
const images = [];

for (let i = 1; i <= 35; i++) {
    images.push(`images/${i}.jpg`);
}

let currentIndex = 0;

/* CREATE GALLERY */

if (gallery) {
    images.forEach((src, index) => {
        const item = document.createElement("div");
        item.className = "gallery-item";

        const img = document.createElement("img");
        img.src = src;
        img.alt = `Realizacja ${index + 1}`;
        img.loading = "lazy";

        item.appendChild(img);

        item.addEventListener("click", () => {
            openLightbox(index);
        });

        gallery.appendChild(item);
    });
}

/* LIGHTBOX */

function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;

    currentIndex = index;
    lightboxImg.src = images[currentIndex];

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    if (lightboxImg) lightboxImg.src = images[currentIndex];
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    if (lightboxImg) lightboxImg.src = images[currentIndex];
}

/* EVENTS */

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (nextBtn) nextBtn.addEventListener("click", nextImage);
if (prevBtn) prevBtn.addEventListener("click", prevImage);

if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

/* KEYBOARD */

document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
});
console.log("force rebuild"); 
