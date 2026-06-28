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

  /* HERO SLIDER */
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  setInterval(() => {
    slides.forEach(s => s.classList.remove("active"));
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 4500);

});
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".section").forEach(s => observer.observe(s));
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
