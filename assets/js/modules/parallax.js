function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const images = Array.from(document.querySelectorAll('.main-visual__parallax'));
  const speed = 0.15;

  if (!images.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      for (const img of images) {
        img.style.transform = `translateY(${window.scrollY * -speed}px)`;
      }
      ticking = false;
    });
  }, { passive: true });
}
