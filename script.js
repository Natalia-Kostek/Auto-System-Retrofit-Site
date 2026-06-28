document.addEventListener("DOMContentLoaded", () => {

  /* TYPEWRITER */
  const text = "Profesjonalny Retrofit Samochodowy";
  let i = 0;

  function type(){
    const el = document.getElementById("typing");
    if(!el) return;

    el.innerHTML = text.slice(0,i++);
    if(i <= text.length) setTimeout(type, 60);
  }

  type();

  /* SLIDER */
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  setInterval(() => {
    slides.forEach(s => s.classList.remove("active"));
    if(slides.length){
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }
  }, 4000);

  /* SCROLL EFFECT */
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(s => observer.observe(s));

});
let slides = document.querySelectorAll(".slide");
let current = 0;

function showSlide(index){
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide(){
  current = (current + 1) % slides.length;
  showSlide(current);
}

setInterval(nextSlide, 4000); // zmiana co 4 sekundy
