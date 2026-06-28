document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".slide");

  let current = 0;

  // bezpieczeństwo
  if (slides.length === 0) return;

  function showSlide(index){
    slides.forEach(slide => {
      slide.classList.remove("active");
    });

    slides[index].classList.add("active");
  }

  function nextSlide(){
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  showSlide(0);
  setInterval(nextSlide, 4000);
});
window.addEventListener("load", () => {

  const slides = document.querySelectorAll(".slide");

  if (!slides || slides.length === 0) {
    console.log("Brak slajdów");
    return;
  }

  let index = 0;

  function showSlide(i){
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
  }

  showSlide(0);

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 4000);

});
