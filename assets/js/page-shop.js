import { initDrawer } from './modules/drawer.js';

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatPrice(price) {
  return `&yen;${price.toLocaleString()}<span>（税込）</span>`;
}

function renderFeatured(items) {
  const container = document.getElementById('shop-featured');
  if (!container) return;

  const featured = items.filter(item => item.featured);
  container.innerHTML = featured.map(item => `
    <div class="shop-featured__card">
      <div class="shop-featured__image">
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy">
      </div>
      <p class="shop-featured__name">${escapeHTML(item.name)}</p>
      <p class="shop-featured__price">${formatPrice(item.price)}</p>
    </div>
  `).join('');
}

function renderTalentGrid(items) {
  const grid = document.getElementById('shop-talent-grid');
  if (!grid) return;

  grid.innerHTML = items.map(item => `
    <div class="shop-talent-card" data-category="${escapeHTML(item.talent)}">
      <div class="shop-talent-card__image">
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy">
      </div>
      <div class="shop-talent-card__body">
        <p class="shop-talent-card__name">${escapeHTML(item.name)}</p>
        <p class="shop-talent-card__price">${formatPrice(item.price)}</p>
      </div>
    </div>
  `).join('');
}

function initTalentFilter() {
  const container = document.getElementById('shop-talent-filter');
  if (!container) return;

  const buttons = container.querySelectorAll('.category-filter__btn');
  const getItems = () => document.querySelectorAll('.shop-talent-card');

  function filter(category) {
    buttons.forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.category === category ? 'true' : 'false');
    });
    getItems().forEach(item => {
      const match = category === 'all' || item.dataset.category === category;
      item.style.display = match ? '' : 'none';
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => filter(btn.dataset.category));
  });

  filter('all');
}

async function init() {
  initDrawer();

  try {
    const res = await fetch('../content/shop/index.json');
    const data = await res.json();
    renderFeatured(data);
    renderTalentGrid(data);
    initTalentFilter();
  } catch (e) {
    console.error('Failed to load shop data:', e);
  }
}

init();
