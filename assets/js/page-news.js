import { initDrawer } from './modules/drawer.js';
import { initCategoryFilter } from './modules/category-filter.js';

const ITEMS_PER_PAGE = 9;

let allItems = [];
let filteredItems = [];
let visibleCount = 0;
let currentCategory = 'all';

const grid = document.getElementById('js-news-grid');
const loadMoreBtn = document.getElementById('js-load-more');

/**
 * ニュースカードのHTML要素を生成
 */
function createCard(item) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.dataset.category = item.category;

    // 画像部分
    const imageDiv = document.createElement('div');
    imageDiv.className = 'news-card__image';
    imageDiv.style.backgroundImage = `url(../${CSS.escape(item.image)})`;

    const label = document.createElement('span');
    label.className = 'news-card__label';
    label.textContent = item.label;
    imageDiv.appendChild(label);

    // 本文部分
    const body = document.createElement('div');
    body.className = 'news-card__body';

    const meta = document.createElement('div');
    meta.className = 'news-card__meta';

    const time = document.createElement('time');
    time.setAttribute('datetime', item.date);
    time.textContent = item.dateDisplay;

    const category = document.createElement('span');
    category.className = 'news-card__category';
    category.textContent = item.category;

    meta.appendChild(time);
    meta.appendChild(category);

    const title = document.createElement('p');
    title.className = 'news-card__title';
    title.textContent = item.title;

    const excerpt = document.createElement('p');
    excerpt.className = 'news-card__excerpt';
    excerpt.textContent = item.excerpt || '';

    body.appendChild(meta);
    body.appendChild(title);
    body.appendChild(excerpt);

    // リンクラップ
    if (item.link) {
        const a = document.createElement('a');
        a.href = item.link;
        a.appendChild(imageDiv);
        a.appendChild(body);
        card.appendChild(a);
    } else {
        card.appendChild(imageDiv);
        card.appendChild(body);
    }

    return card;
}

/**
 * グリッドを描画
 */
function renderGrid() {
    grid.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const itemsToShow = filteredItems.slice(0, visibleCount);

    itemsToShow.forEach(item => {
        fragment.appendChild(createCard(item));
    });

    grid.appendChild(fragment);
    updateLoadMoreButton();
}

/**
 * もっと見るボタンの表示切替
 */
function updateLoadMoreButton() {
    if (visibleCount >= filteredItems.length) {
        loadMoreBtn.hidden = true;
    } else {
        loadMoreBtn.hidden = false;
    }
}

/**
 * カテゴリ変更時のコールバック
 */
function onCategoryChange(category) {
    currentCategory = category;

    if (category === 'all') {
        filteredItems = [...allItems];
    } else {
        filteredItems = allItems.filter(item => {
            // category フィールドまたは tags 配列でマッチ
            if (item.category === category) return true;
            if (item.tags && item.tags.includes(category)) return true;
            return false;
        });
    }

    visibleCount = Math.min(ITEMS_PER_PAGE, filteredItems.length);
    renderGrid();
}

/**
 * もっと見るクリック
 */
loadMoreBtn.addEventListener('click', () => {
    visibleCount = Math.min(visibleCount + ITEMS_PER_PAGE, filteredItems.length);
    renderGrid();
});

/**
 * 初期化
 */
async function init() {
    initDrawer();

    try {
        const res = await fetch('../content/news/index.json');
        allItems = await res.json();
    } catch (e) {
        console.error('Failed to load news data:', e);
        allItems = [];
    }

    filteredItems = [...allItems];
    visibleCount = Math.min(ITEMS_PER_PAGE, filteredItems.length);
    renderGrid();

    // カテゴリフィルター初期化（カスタムコールバック付き）
    const filterContainer = document.getElementById('js-category-filter');
    if (filterContainer) {
        const buttons = filterContainer.querySelectorAll('.category-filter__btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.dataset.category;
                buttons.forEach(b => {
                    b.setAttribute('aria-pressed', b.dataset.category === cat ? 'true' : 'false');
                });
                onCategoryChange(cat);
            });
        });
    }
}

init();
