alert("Skrypt działa");
/* =========================
   UNIVERSAL HERO SLIDER FIX
   (STABLE VERSION)
========================= */

const slides = document.querySelectorAll(".slide");

let current = 0;

function showSlide(index){
  slides.forEach((s, i) => {
    s.classList.remove("active");
    if(i === index){
      s.classList.add("active");
    }
  });
}

function nextSlide(){
  current++;
  if(current >= slides.length){
    current = 0;
  }
  showSlide(current);
}

// start
if(slides.length > 0){
  showSlide(0);
  setInterval(nextSlide, 5000);
}

/* =========================
   SAFETY FIX (backup)
========================= */

setTimeout(() => {
  if(!document.querySelector(".slide.active") && slides.length){
    showSlide(0);
  }
}, 1000);

/* =========================
   NAV SMOOTH SCROLL
========================= */

document.querySelectorAll("nav a").forEach(a => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth"});
    }
  });
});
/* =========================
   HEADER SCROLL EFFECT PRO
========================= */

const header = document.querySelector("header") || document.querySelector(".header");

window.addEventListener("scroll", () => {
  if(window.scrollY > 50){
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if(loader){
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => loader.remove(), 500);
  }
});
const track = document.querySelector(".reviews-track");
const cards = document.querySelectorAll(".review-card");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;

function update(){
  const width = cards[0].offsetWidth + 20;
  track.style.transform = `translateX(-${index * width}px)`;
}

if(track && cards.length && next && prev){

  next.addEventListener("click", ()=>{
    if(index < cards.length - 1){
      index++;
      update();
    }
  });

  prev.addEventListener("click", ()=>{
    if(index > 0){
      index--;
      update();
    }
  });

  setInterval(()=>{
    if(index < cards.length - 1){
      index++;
    } else {
      index = 0;
    }
    update();
  },5000);

}
/* ===================================================
   GALERIA REALIZACJI
=================================================== */

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

const images = [];

for (let i = 1; i <= 35; i++) {
   images.push(`images/${i}.jpg`);
}

let currentIndex = 0;

/* Tworzenie galerii */


});if(gallery){

    images.forEach((src,index)=>{

        const item=document.createElement("div");
        item.className="gallery-item";

        const img=document.createElement("img");
        img.src=src;
        img.alt=`Realizacja ${index+1}`;
        img.loading="lazy";

        item.appendChild(img);

        item.addEventListener("click",()=>{
            openLightbox(index);
        });

        gallery.appendChild(item);

    });

}

/* Otwieranie */

function openLightbox(index){

    currentIndex = index;

    lightboxImg.src = images[currentIndex];

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}

/* Zamknięcie */

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

/* Następne */

function nextImage(){

    currentIndex++;

    if(currentIndex >= images.length){

        currentIndex = 0;

    }

    lightboxImg.src = images[currentIndex];

}

/* Poprzednie */

function prevImage(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = images.length - 1;

    }

    lightboxImg.src = images[currentIndex];

}

if (nextBtn) nextBtn.addEventListener("click", nextImage);nextBtn.addEventListener("click", nextImage);

if (prevBtn) prevBtn.addEventListener("click", prevImage);

/* Kliknięcie poza zdjęciem */

if (lightbox) {

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {
            closeLightbox();
        }

    });

}

    if(e.target===lightbox){

        closeLightbox();

    }

});

/* Klawiatura */

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key==="Escape") closeLightbox();

    if(e.key==="ArrowRight") nextImage();

    if(e.key==="ArrowLeft") prevImage();

});
