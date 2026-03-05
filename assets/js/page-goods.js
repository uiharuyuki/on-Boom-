import { initDrawer } from './modules/drawer.js';
import { initCategoryFilter } from './modules/category-filter.js';

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatPrice(price) {
  return `&yen;${price.toLocaleString()}<span>（税込）</span>`;
}

function renderBadge(badge) {
  if (!badge) return '';
  const cls = badge === 'new' ? 'badge--new' : 'badge--soldout';
  const label = badge === 'new' ? 'NEW' : 'SOLD OUT';
  return `<span class="badge ${cls} goods-card__badge">${label}</span>`;
}

function renderGoods(items) {
  const grid = document.getElementById('goods-grid');
  if (!grid) return;

  grid.innerHTML = items.map(item => `
    <div class="goods-card" data-category="${escapeHTML(item.category)}">
      ${renderBadge(item.badge)}
      <div class="goods-card__image">
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy">
      </div>
      <div class="goods-card__body">
        <p class="goods-card__name">${escapeHTML(item.name)}</p>
        <p class="goods-card__price">${formatPrice(item.price)}</p>
      </div>
    </div>
  `).join('');
}

async function init() {
  initDrawer();

  try {
    const res = await fetch('../content/goods/index.json');
    const data = await res.json();
    renderGoods(data);
    initCategoryFilter('#goods-filter', '.goods-card');
  } catch (e) {
    console.error('Failed to load goods data:', e);
  }
}

init();
