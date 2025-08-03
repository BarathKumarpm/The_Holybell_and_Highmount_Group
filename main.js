// main.js
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slider-container .slide');
  const leftArrow = document.querySelector('.slider-container .arrow.left');
  const rightArrow = document.querySelector('.slider-container .arrow.right');
  const dotsContainer = document.querySelector('.slider-container .dots');
  let currentIndex = 0;
  let slideInterval;

  function activateSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      if (dotsContainer.children[i]) {
        dotsContainer.children[i].classList.toggle('active', i === index);
      }
    });
    currentIndex = index;
  }

  // Create dots
  slides.forEach((slide, idx) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      activateSlide(idx);
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  });

  function nextSlide() {
    activateSlide((currentIndex + 1) % slides.length);
  }

  function prevSlide() {
    activateSlide((currentIndex - 1 + slides.length) % slides.length);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  rightArrow.addEventListener('click', function (e) {
    e.preventDefault();
    nextSlide();
    resetInterval();
  });

  leftArrow.addEventListener('click', function (e) {
    e.preventDefault();
    prevSlide();
    resetInterval();
  });

  // Auto slide every 5 seconds
  slideInterval = setInterval(nextSlide, 5000);

  // Animate section load (optional)
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('loading');
  });
});
