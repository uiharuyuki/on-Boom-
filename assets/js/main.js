import { initParallax } from './modules/parallax.js';
import { initDrawer } from './modules/drawer.js';
import { initCarousel } from './modules/carousel.js';
import { initNews } from './modules/news.js';
import { initTalents } from './modules/talents.js';
import { initBackgroundTextFit } from './modules/background-text-fit.js';

// データに依存しないモジュールを即時初期化
initParallax();
initDrawer();
initBackgroundTextFit();

// データ取得 → UI構築
init();

async function init() {
  try {
    const [talentsRes, newsRes] = await Promise.all([
      fetch('content/talents/index.json'),
      fetch('content/news/index.json'),
    ]);

    if (!talentsRes.ok || !newsRes.ok) {
      throw new Error(`HTTP error: talents=${talentsRes.status}, news=${newsRes.status}`);
    }

    const [talentsData, newsData] = await Promise.all([
      talentsRes.json(),
      newsRes.json(),
    ]);

    initNews(newsData);
    initCarousel(); // ニュースのDOM生成後に初期化
    initTalents(talentsData);
  } catch (err) {
    console.error('データの読み込みに失敗しました:', err);
  }
}
