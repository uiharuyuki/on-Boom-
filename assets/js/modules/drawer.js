function initDrawer() {
  const dialog = document.getElementById('nav-drawer__dialog');
  const openBtn = document.getElementById('nav-drawer__open');
  const closeBtn = document.getElementById('nav-drawer__close');

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
