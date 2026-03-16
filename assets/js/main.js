// データに依存しないモジュールを即時初期化
initParallax();
initDrawer();

// グローバル変数からデータを取得 → UI構築
// (index.html 内の <script> タグで window.__TALENTS_DATA__, window.__NEWS_DATA__ として埋め込み済み)
const talentsData = window.__TALENTS_DATA__;
const newsData = window.__NEWS_DATA__;

if (talentsData && newsData) {
  initNews(newsData);
  initCarousel(); // ニュースのDOM生成後に初期化
  initTalents(talentsData);
} else {
  console.error('データの読み込みに失敗しました: インラインデータが見つかりません');
}
