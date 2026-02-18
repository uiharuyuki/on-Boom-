const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});






const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let currentIndex = 0;

// 同時に表示するスライドの数
const slidesPerView = 3; 

function updateCarousel() {
  const slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  // 全スライド数(6) - 表示数(3) = 3回まで右に進めるようにする
  if (currentIndex < slides.length - slidesPerView) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

window.addEventListener('resize', updateCarousel);