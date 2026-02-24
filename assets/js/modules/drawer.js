export function initDrawer() {
  const dialog = document.getElementById('menu-dialog');
  const openBtn = document.getElementById('menu-open');
  const closeBtn = document.getElementById('menu-close');

  if (!dialog || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => {
    dialog.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
  });

  closeBtn.addEventListener('click', () => {
    dialog.close();
    openBtn.setAttribute('aria-expanded', 'false');
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
      openBtn.setAttribute('aria-expanded', 'false');
    }
  });
}
