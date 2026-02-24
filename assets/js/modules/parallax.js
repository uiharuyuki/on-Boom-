export function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const image = document.querySelector('.fast-scroll-image');
  const speed = 0.22;
  if (!image) return;

  window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
          image.style.transform = `translateY(${window.scrollY * -speed}px)`;
      });
  });
}