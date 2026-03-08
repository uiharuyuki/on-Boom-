function fitTextToWidth(element, targetWidth) {
  const probeSize = 100;

  element.style.fontSize = `${probeSize}px`;
  const measuredWidth = element.getBoundingClientRect().width;

  if (!measuredWidth) return;

  const fittedSize = (targetWidth / measuredWidth) * probeSize;
  element.style.fontSize = `${fittedSize}px`;
}

function getResponsiveTargetWidth(element) {
  const viewportWidth = window.innerWidth;
  const desktopBreakpoint = Number.parseFloat(element.dataset.desktopBreakpoint ?? '1080');
  const mobileBreakpoint = Number.parseFloat(element.dataset.mobileBreakpoint ?? '480');
  const desktopRatio = Number.parseFloat(element.dataset.desktopRatio ?? '0.7');
  const mobileRatio = Number.parseFloat(element.dataset.mobileRatio ?? '0.9');

  if (viewportWidth >= desktopBreakpoint) {
    return viewportWidth * desktopRatio;
  }

  if (viewportWidth <= mobileBreakpoint) {
    return mobileBreakpoint * mobileRatio;
  }

  const progress = (viewportWidth - mobileBreakpoint) / (desktopBreakpoint - mobileBreakpoint);
  const ratio = mobileRatio + (desktopRatio - mobileRatio) * progress;
  return viewportWidth * ratio;
}

function fitGroup(elements) {
  if (!elements.length) return;

  const fixedWidth = Number.parseFloat(elements[0].dataset.equalWidthPx ?? '');
  const maxWidthPx = Number.parseFloat(elements[0].dataset.maxWidthPx ?? '');
  const maxWidthRatio = Number.parseFloat(elements[0].dataset.maxWidthRatio ?? '');

  const baseWidth = Number.isFinite(fixedWidth)
    ? fixedWidth
    : getResponsiveTargetWidth(elements[0]);
  const maxWidth = Number.isFinite(maxWidthPx)
    ? maxWidthPx
    : Number.isFinite(maxWidthRatio)
      ? window.innerWidth * maxWidthRatio
      : Number.POSITIVE_INFINITY;
  const targetWidth = Math.min(baseWidth, maxWidth);

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
