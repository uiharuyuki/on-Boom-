export function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const image = document.querySelector('.main-visual__parallax');
  const speed = 0.15;

  const bgTexts = Array.from(document.querySelectorAll('.background-text'));

  if (!image && !bgTexts.length) return;

  // 背景テキストのパララックス係数（小さいほど遅く動く）
  const bgTextFactor = 0.1;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (image) {
        image.style.transform = `translateY(${window.scrollY * -speed}px)`;
      }

      const viewportBottom = window.innerHeight;

      for (const el of bgTexts) {
        const section = el.closest('section');
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        // セクション上端がビューポート下端にあるとき delta=0 → 初期配置を保持
        const delta = rect.top - viewportBottom;
        // delta < 0 = セクションが画面内に入った → offset正 = テキストを下に押す = 遅れる
        const offset = -delta * bgTextFactor;

        el.style.transform = `translate(-50%, -50%) translateY(${offset}px)`;
      }

      ticking = false;
    });
  }, { passive: true });
}
