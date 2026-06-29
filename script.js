window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

/* SLIDER */
const slides = document.querySelectorAll(".slide");

let i = 0;

if (slides.length > 0) {
  slides[0].style.opacity = "1";

  setInterval(() => {
    slides.forEach(s => s.style.opacity = "0");

    slides[i].style.opacity = "1";

    i = (i + 1) % slides.length;
  }, 4000);
}
/* =========================
   LOADER (SAFE)
========================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.transition = "0.5s ease";
    setTimeout(() => loader.style.display = "none", 500);
  }
});

/* =========================
   HERO SLIDER (PRO FIX)
========================= */

const slides = document.querySelectorAll(".slide");
let current = 0;

if (slides.length > 0) {
  slides.forEach((s, i) => {
    s.style.opacity = i === 0 ? "1" : "0";
    s.style.transition = "1s ease";
  });

  setInterval(() => {
    slides[current].style.opacity = "0";

    current = (current + 1) % slides.length;

    slides[current].style.opacity = "1";
  }, 5000);
}

/* =========================
   SCROLL ANIMATION (FADE IN)
========================= */

const elements = document.querySelectorAll("section, .service-card, .feature");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

elements.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(25px)";
  el.style.transition = "0.6s ease";
  observer.observe(el);
});

/* =========================
   SMOOTH SCROLL NAV
========================= */

document.querySelectorAll("nav a[href^='#']").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
