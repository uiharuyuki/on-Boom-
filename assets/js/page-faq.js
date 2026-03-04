import { initDrawer } from './modules/drawer.js';
import { initCategoryFilter } from './modules/category-filter.js';

const accordionContainer = document.getElementById('js-faq-list');

/**
 * FAQ アイテムの details 要素を生成
 */
function createFaqItem(item) {
    const details = document.createElement('details');
    details.className = 'accordion__item';
    details.dataset.category = item.category;

    const summary = document.createElement('summary');
    summary.textContent = item.question;

    const answer = document.createElement('div');
    answer.className = 'accordion__answer';
    const p = document.createElement('p');
    p.textContent = item.answer;
    answer.appendChild(p);

    details.appendChild(summary);
    details.appendChild(answer);

    return details;
}

/**
 * FAQ リストを描画
 */
function renderFaqList(items) {
    accordionContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    items.forEach(item => {
        fragment.appendChild(createFaqItem(item));
    });

    accordionContainer.appendChild(fragment);
}

/**
 * 初期化
 */
async function init() {
    initDrawer();

    let faqItems = [];

    try {
        const res = await fetch('../content/faq/index.json');
        faqItems = await res.json();
    } catch (e) {
        console.error('Failed to load FAQ data:', e);
        faqItems = [];
    }

    renderFaqList(faqItems);

    // カテゴリフィルター初期化
    initCategoryFilter('#js-category-filter', '.accordion__item');
}

init();
