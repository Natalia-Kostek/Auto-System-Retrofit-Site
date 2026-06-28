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
