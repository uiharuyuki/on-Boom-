export function initTextLoop() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const textPath = document.querySelector("#wave-text__svg textPath");

  if (!textPath) return;

  const phrase = "on boom ! . ";

  textPath.textContent = phrase;
  const unitLength = textPath.getComputedTextLength();

  textPath.textContent = phrase.repeat(10);

  const duration = 10;
  const scrollSpeed = unitLength / (duration * 60);
  let offset = -unitLength;

  function animate() {
    offset += scrollSpeed;

    if (offset >= 0) {
      offset = -unitLength;
    }

    textPath.setAttribute("startOffset", offset);
    requestAnimationFrame(animate);
  }

  animate();
}
