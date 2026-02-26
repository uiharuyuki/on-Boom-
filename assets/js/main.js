import { initParallax } from './modules/parallax.js';
import { initDrawer } from './modules/drawer.js';
import { initTextLoop } from './modules/text-loop.js';
import { initCarousel } from './modules/carousel.js';
import { initNews } from './modules/news.js';
import { initTalents } from './modules/talents.js';

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

  initNews(newsData);
  initCarousel(); // ニュースのDOM生成後に初期化
  initTalents(talentsData);
}
