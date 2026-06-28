/* =========================
   AUTO-SYSTEM RETROFIT PRO 6.0
   SCRIPT.JS (CLEAN BUILD)
========================= */

/* =========================
   HERO SLIDER (3 SLIDES)
========================= */

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index){
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if(i === index){
      slide.classList.add("active");
    }
  });
}

function nextSlide(){
  currentSlide++;
  if(currentSlide >= slides.length){
    currentSlide = 0;
  }
  showSlide(currentSlide);
}

// start
showSlide(0);

// auto rotate (stable)
setInterval(nextSlide, 5000);

/* =========================
   SMOOTH SCROLL (NAV LINKS)
========================= */

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* =========================
   HEADER EFFECT ON SCROLL
========================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if(window.scrollY > 50){
    header.style.background = "rgba(0,0,0,0.7)";
    header.style.backdropFilter = "blur(14px)";
  } else {
    header.style.background = "rgba(0,0,0,0.35)";
  }
});

/* =========================
   SCROLL ANIMATION (SECTIONS)
========================= */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll(".section").forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(30px)";
  section.style.transition = "0.8s ease";
  observer.observe(section);
});

/* =========================
   PREVENT IMAGE SLIDE FREEZE FIX
========================= */

// zabezpieczenie gdyby coś się „zatrzymało”
setInterval(() => {
  if(!document.querySelector(".slide.active")){
    showSlide(0);
  }
}, 2000);

/* =========================
   ACTIVE LINK HIGHLIGHT
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if(window.scrollY >= sectionTop - 150){
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active-link");
    if(link.getAttribute("href") === "#" + current){
      link.classList.add("active-link");
    }
  });
});
