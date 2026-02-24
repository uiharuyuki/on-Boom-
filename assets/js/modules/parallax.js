export function initParallax() {
  const image = document.querySelector('.fast-scroll-image');
  const speed = 0.22;
  if (!image) return;
}

  window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
          image.style.transform = `translateY(${window.scrollY * -speed}px)`;
      });
  });