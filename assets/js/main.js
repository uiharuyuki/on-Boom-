import { initParallax } from './modules/parallax.js';
import { initDrawer } from './modules/drawer.js';
import { initTextLoop } from './modules/text-loop.js';
import { initCarousel } from './modules/carousel.js';

// データに依存しないモジュールを即時初期化
initParallax();
initDrawer();
initTextLoop();

// データ取得 → UI構築
init();

async function init() {
  const [talentsData, newsData] = await Promise.all([
    fetch('content/talents/index.json').then(r => r.json()),
    fetch('content/news/index.json').then(r => r.json()),
  ]);

  renderNews(newsData);
  initCarousel(); // ニュースのDOM生成後に初期化
  initTalents(talentsData);
}


// =====================
// ニュースカルーセル描画
// =====================
function renderNews(news) {
  const track = document.querySelector('.news-carousel__track');
  if (!track) return;

  track.innerHTML = news.map(item => {
    const inner = `
      <div class="news-carousel__content" style="background-image: url(${item.image})">
        <p>${item.label}</p>
      </div>
      <div class="news-carousel__text-wrap">
        <div class="news-carousel__meta">
          <time datetime="${item.date}">${item.dateDisplay}</time>
          <span class="news-carousel__category">${item.category}</span>
        </div>
        <p class="news-carousel__title">${item.title}</p>
      </div>
    `;
    return `
      <div class="news-carousel__slide">
        ${item.link ? `<a href="${item.link}">${inner}</a>` : inner}
      </div>
    `;
  }).join('');
}


// =====================
// タレントセクション
// =====================
function initTalents(appData) {
  let activeMainIndex = 0;
  let activeSubIndex = 0;

  const mainNav = document.getElementById('main-nav');
  const subNav = document.getElementById('sub-nav');
  const mainTitle = document.getElementById('main-title');
  const mainText = document.getElementById('main-text');
  const displayImage = document.getElementById('display-image');
  const talentBirthday = document.getElementById('talent-birthday');
  const talentAge = document.getElementById('talent-age');
  const talentHeight = document.getElementById('talent-height');
  const talentLinks = document.getElementById('talent-links');

  function render() {
    const currentMain = appData[activeMainIndex];
    const currentSub = currentMain.subItems[activeSubIndex];

    mainTitle.textContent = currentMain.label;
    mainText.textContent = currentMain.text;
    displayImage.src = currentSub.img;

    talentBirthday.textContent = currentMain.birthday;
    talentAge.textContent = currentMain.age + '歳';
    talentHeight.textContent = currentMain.height;

    // ウェブサイトリンク
    talentLinks.innerHTML = '';
    currentMain.websites.forEach(site => {
      const a = document.createElement('a');
      a.href = site.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'talent-links__item';
      const img = document.createElement('img');
      img.src = site.icon;
      img.alt = site.label;
      img.className = 'talent-links__icon';
      a.appendChild(img);
      talentLinks.appendChild(a);
    });

    // メインボタン（キャラクター選択）
    mainNav.innerHTML = '';
    appData.forEach((data, index) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', data.label);
      const img = document.createElement('img');
      img.src = data.thumbnail;
      img.alt = data.label;
      btn.appendChild(img);
      if (index === activeMainIndex) btn.classList.add('active');

      btn.addEventListener('click', () => {
        activeMainIndex = index;
        activeSubIndex = 0;
        render();
      });
      mainNav.appendChild(btn);
    });

    // サブボタン（衣装選択）
    subNav.innerHTML = '';
    currentMain.subItems.forEach((sub, index) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', sub.label);
      const img = document.createElement('img');
      img.src = sub.icon;
      img.alt = sub.label;
      btn.appendChild(img);
      if (index === activeSubIndex) btn.classList.add('active');

      btn.addEventListener('click', () => {
        activeSubIndex = index;
        render();
      });
      subNav.appendChild(btn);
    });
  }

  render();
}
