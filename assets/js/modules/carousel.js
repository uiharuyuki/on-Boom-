export function initCarousel() {
  const track = document.querySelector('.news-carousel__track');
  const slides = document.querySelectorAll('.news-carousel__slide');
  const nextBtn = document.querySelector('.news-carousel__next');
  const prevBtn = document.querySelector('.news-carousel__prev');

  if (!track || slides.length === 0 || !nextBtn || !prevBtn) return;

  let currentIndex = 0;

  function getSlidesPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1200) return 2;
    return 3;
  }

  function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function updateButtons() {
    prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
    nextBtn.style.display = currentIndex >= slides.length - getSlidesPerView() ? 'none' : 'flex';
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - getSlidesPerView()) {
      currentIndex++;
      updateCarousel();
      updateButtons();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
      updateButtons();
    }
  });

  window.addEventListener('resize', () => {
    currentIndex = 0;
    updateCarousel();
    updateButtons();
  });

  updateButtons();


  const targetSlideContent = document.querySelector('.news-carousel__content');
  const targetCarouselContainer = document.querySelector('.news-carousel__container');

  if (targetSlideContent && targetCarouselContainer) {
    const resizeObserver = new ResizeObserver(entries => {
      const contentHeight = entries[0].borderBoxSize[0].blockSize;
      targetCarouselContainer.style.setProperty('--slide-image-height', `${contentHeight}px`);
    });

    resizeObserver.observe(targetSlideContent);
  }
}
