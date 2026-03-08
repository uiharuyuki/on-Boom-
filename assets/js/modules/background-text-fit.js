function fitTextToWidth(element, targetWidth) {
  const probeSize = 100;

  element.style.fontSize = `${probeSize}px`;
  const measuredWidth = element.getBoundingClientRect().width;

  if (!measuredWidth) return;

  const fittedSize = (targetWidth / measuredWidth) * probeSize;
  element.style.fontSize = `${fittedSize}px`;
}

function fitGroup(elements) {
  if (!elements.length) return;

  const fixedWidth = Number.parseFloat(elements[0].dataset.equalWidthPx ?? '');
  const ratio = Number.parseFloat(elements[0].dataset.widthRatio ?? '0.82');
  const targetWidth = Number.isFinite(fixedWidth) ? fixedWidth : window.innerWidth * ratio;

  elements.forEach((element) => fitTextToWidth(element, targetWidth));
}

export function initBackgroundTextFit() {
  const targets = Array.from(document.querySelectorAll('.background-text'));
  if (!targets.length) return;

  const groups = new Map();
  targets.forEach((element, index) => {
    const groupName = element.dataset.equalGroup ?? `single:${index}`;
    if (!groups.has(groupName)) groups.set(groupName, []);
    groups.get(groupName).push(element);
  });

  let scheduled = false;
  const update = () => {
    groups.forEach((elements) => fitGroup(elements));
  };

  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      update();
    });
  };

  window.addEventListener('resize', scheduleUpdate, { passive: true });
  window.addEventListener('orientationchange', scheduleUpdate, { passive: true });

  if (document.fonts?.ready) {
    document.fonts.ready.then(scheduleUpdate).catch(scheduleUpdate);
  } else {
    scheduleUpdate();
  }
}
