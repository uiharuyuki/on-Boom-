/**
 * カテゴリフィルターモジュール
 * News, Goods, FAQ ページで共用
 */

export function initCategoryFilter(containerSelector, itemSelector, onFilter) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const buttons = container.querySelectorAll('.category-filter__btn');
  const items = document.querySelectorAll(itemSelector);

  function filterItems(category) {
    buttons.forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.category === category ? 'true' : 'false');
    });

    items.forEach(item => {
      const match = category === 'all' || item.dataset.category === category;
      item.style.display = match ? '' : 'none';
    });

    if (onFilter) onFilter(category);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterItems(btn.dataset.category);
    });
  });

  // 初期状態: ALL
  filterItems('all');
}
