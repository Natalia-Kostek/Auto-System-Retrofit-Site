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
