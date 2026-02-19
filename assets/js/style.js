// バーガーメニュー
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});





// カルーセル
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let currentIndex = 0;

// 同時に表示するスライドの数
const slidesPerView = 3; 

function updateCarousel() {
  const slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  // 全スライド数(6) - 表示数(3) = 3回まで右に進めるようにする
  if (currentIndex < slides.length - slidesPerView) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

window.addEventListener('resize', updateCarousel);

// --- ボタンの位置を .slide-content の中央に合わせる処理 ---
const targetSlideContent = document.querySelector('.slide-content');
const targetCarouselContainer = document.querySelector('.carousel-container');

if (targetSlideContent && targetCarouselContainer) {
  // ResizeObserverを使用して、要素のサイズ変更をリアルタイムに検知
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      // 実際の描画領域の高さ（padding等を含む）を取得
      const contentHeight = entry.borderBoxSize[0].blockSize;
      // 取得した高さをCSS変数としてセット
      targetCarouselContainer.style.setProperty('--slide-image-height', `${contentHeight}px`);
    }
  });

  // .slide-contentのサイズ監視を開始
  resizeObserver.observe(targetSlideContent);
}