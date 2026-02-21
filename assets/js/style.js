// --- パララックス ---
// スクロールのたびに変わらない値はイベントの外で定義する（パフォーマンス対策）
const image = document.querySelector('.fast-scroll-image');
const speed = 0.22; // 動かすスピードの調整（数値が大きいほど早く動きます）

window.addEventListener('scroll', () => {
  if (image) {
    // 現在のスクロール位置を取得し、画像の位置をY軸方向にずらす
    image.style.transform = `translateY(${window.scrollY * -speed}px)`;
  }
});


// --- バーガーメニュー ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}


// テキスト無限ループ
const textPath = document.querySelector("#waveText textPath");
const phrase = "on boom ! . "; // ループさせたい1フレーズ

// 1. フレーズ1つ分の長さを正確に測る
textPath.textContent = phrase;
const unitLength = textPath.getComputedTextLength();

// 2. パスを埋め尽くすのに十分な回数、フレーズを繰り返す
// パスの全長より長くなるようにリピート
textPath.textContent = phrase.repeat(10);

// 3. アニメーション設定
const duration = 10; // 1ユニット分進むのにかかる時間（秒）
let offset = -unitLength; // 最初の一歩をフレーズ1つ分左にずらして開始

function animate() {
  // スピードの計算：1秒間に進む距離
  const speed = unitLength / (duration * 60);

  offset += speed;

  // 【ここが核心！】1フレーズ分（unitLength）進んだら、
  // 瞬時に元の位置（-unitLength）に戻すことで、見た目上の継ぎ目を消す
  if (offset >= 0) {
    offset = -unitLength;
  }

  textPath.setAttribute("startOffset", offset);
  requestAnimationFrame(animate);
}

animate();


// --- カルーセル ---
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

// カルーセルに必要な要素が全て存在する場合のみ処理を実行（nullチェック）
if (track && slides.length > 0 && nextBtn && prevBtn) {

  let currentIndex = 0;

  // 同時に表示するスライドの数（画面幅によって変わる）
  function getSlidesPerView() {
    if (window.innerWidth <= 767) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
  }

  function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // ボタンの表示・非表示を更新する関数
  function updateButtons() {
    // 左ボタンの表示制御
    prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';

    // 右ボタンの表示制御
    nextBtn.style.display = currentIndex >= slides.length - getSlidesPerView() ? 'none' : 'flex';
  }

  nextBtn.addEventListener('click', () => {
    // 全スライド数(6) - 表示数 = それだけ右に進めるようにする
    if (currentIndex < slides.length - getSlidesPerView()) {
      currentIndex++;
      updateCarousel();
      updateButtons();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
      updateButtons();
    }
  });

  window.addEventListener('resize', () => {
    updateCarousel();
    updateButtons();
  });

  // ページ読み込み時に初期状態のボタン表示を設定
  updateButtons();


  // --- ボタンの位置を .slide-content の中央に合わせる処理 ---
  const targetSlideContent = document.querySelector('.slide-content');
  const targetCarouselContainer = document.querySelector('.carousel-container');

  if (targetSlideContent && targetCarouselContainer) {
    // ResizeObserverを使用して、要素のサイズ変更をリアルタイムに検知
    const resizeObserver = new ResizeObserver(entries => {
      // 監視対象は1要素のみなので entries[0] で直接取得
      // 実際の描画領域の高さ（padding等を含む）を取得し、CSS変数としてセット
      const contentHeight = entries[0].borderBoxSize[0].blockSize;
      targetCarouselContainer.style.setProperty('--slide-image-height', `${contentHeight}px`);
    });

    // .slide-contentのサイズ監視を開始
    resizeObserver.observe(targetSlideContent);
  }

}
