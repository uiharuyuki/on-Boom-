import { initParallax } from './modules/parallax.js';
import { initDrawer } from './modules/drawer.js';
import { initTextLoop } from './modules/text-loop.js';
import { initCarousel } from './modules/carousel.js';

initParallax();
initDrawer();
initTextLoop();
initCarousel();



    // 1. データの定義（ UIの構造を決定する唯一の情報源 ）
    // ※画像URLはプレースホルダーサービスを使用
    const appData = [
      {
        id: 'main1', label: 'カテゴリ 1', text: 'カテゴリ1の詳細な説明テキストです。',
        birthday: '1月1日',
        age: 18,
        height: '160cm',
        websites: [
          { url: '#', icon: 'assets/images/icon-web.svg', label: 'ウェブサイト' }
        ],
        subItems: [
          { label: '画像 1-A', img: 'assets/images/aa.png' },
          { label: '画像 1-B', img: 'https://placehold.co/600x400/1d4ed8/FFF?text=Image+1-B' },
          { label: '画像 1-C', img: 'https://placehold.co/600x400/1e40af/FFF?text=Image+1-C' }
        ]
      },
      {
        id: 'main2', label: 'カテゴリ 2', text: 'カテゴリ2に関するテキストデータです。ここも切り替わります。',
        birthday: '3月15日',
        age: 20,
        height: '155cm',
        websites: [
          { url: '#', icon: 'assets/images/icon-web.svg', label: 'ウェブサイト' }
        ],
        subItems: [
          { label: '画像 2-A', img: 'https://placehold.co/600x400/16a34a/FFF?text=Image+2-A' },
          { label: '画像 2-B', img: 'https://placehold.co/600x400/15803d/FFF?text=Image+2-B' },
          { label: '画像 2-C', img: 'https://placehold.co/600x400/166534/FFF?text=Image+2-C' }
        ]
      },
      {
        id: 'main3', label: 'カテゴリ 3', text: 'カテゴリ3が選択されています。サブボタンも再生成されます。',
        birthday: '7月7日',
        age: 22,
        height: '165cm',
        websites: [
          { url: '#', icon: 'assets/images/icon-web.svg', label: 'ウェブサイト' }
        ],
        subItems: [
          { label: '画像 3-A', img: 'https://placehold.co/600x400/dc2626/FFF?text=Image+3-A' },
          { label: '画像 3-B', img: 'https://placehold.co/600x400/b91c1c/FFF?text=Image+3-B' },
          { label: '画像 3-C', img: 'https://placehold.co/600x400/991b1b/FFF?text=Image+3-C' }
        ]
      },
      {
        id: 'main4', label: 'カテゴリ 4', text: '最後のカテゴリ4です。データ構造の規則性に従って処理されます。',
        birthday: '11月30日',
        age: 19,
        height: '158cm',
        websites: [
          { url: '#', icon: 'assets/images/icon-web.svg', label: 'ウェブサイト' }
        ],
        subItems: [
          { label: '画像 4-A', img: 'https://placehold.co/600x400/9333ea/FFF?text=Image+4-A' },
          { label: '画像 4-B', img: 'https://placehold.co/600x400/7e22ce/FFF?text=Image+4-B' },
          { label: '画像 4-C', img: 'https://placehold.co/600x400/6b21a8/FFF?text=Image+4-C' }
        ]
      }
    ];

    // 2. 状態の管理（ State ）
    let activeMainIndex = 0;
    let activeSubIndex = 0;

    // 3. DOM要素の取得
    const mainNav = document.getElementById('main-nav');
    const subNav = document.getElementById('sub-nav');
    const mainTitle = document.getElementById('main-title');
    const mainText = document.getElementById('main-text');
    const displayImage = document.getElementById('display-image');
    const talentBirthday = document.getElementById('talent-birthday');
    const talentAge = document.getElementById('talent-age');
    const talentHeight = document.getElementById('talent-height');
    const talentLinks = document.getElementById('talent-links');

    // 4. 画面描画関数（ 状態に基づいてUIを構築する ）
    function render() {
      // 現在のデータを取得
      const currentMain = appData[activeMainIndex];
      const currentSub = currentMain.subItems[activeSubIndex];

      // テキストと画像の更新
      mainTitle.textContent = currentMain.label;
      mainText.textContent = currentMain.text;
      displayImage.src = currentSub.img;

      // プロフィール情報の更新
      talentBirthday.textContent = currentMain.birthday;
      talentAge.textContent = currentMain.age + '歳';
      talentHeight.textContent = currentMain.height;

      // ウェブサイトリンクの更新
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

      // --- メインボタンの生成とレンダリング ---
      mainNav.innerHTML = ''; // 一度クリアする
      appData.forEach((data, index) => {
        const btn = document.createElement('button');
        btn.textContent = data.label;
        if (index === activeMainIndex) btn.classList.add('active'); // 選択状態のスタイリング
        
        btn.addEventListener('click', () => {
          activeMainIndex = index; // メインの状態を更新
          activeSubIndex = 0;      // サブの状態をリセット（重要）
          render();                // 再描画
        });
        mainNav.appendChild(btn);
      });

      // --- サブボタンの生成とレンダリング ---
      subNav.innerHTML = ''; // 一度クリアする
      currentMain.subItems.forEach((sub, index) => {
        const btn = document.createElement('button');
        btn.textContent = sub.label;
        if (index === activeSubIndex) btn.classList.add('active');

        btn.addEventListener('click', () => {
          activeSubIndex = index; // サブの状態を更新
          render();               // 再描画
        });
        subNav.appendChild(btn);
      });
    }

    // 5. 初回読み込み時の実行
    render();
