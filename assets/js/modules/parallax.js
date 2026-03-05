export function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const image = document.querySelector('.main-visual__parallax');
  const speed = 0.15;
  if (!image) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      image.style.transform = `translateY(${window.scrollY * -speed}px)`;
      ticking = false;
    });
  });
}
