function getIcons(color) {
  return {
    youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 124"><path fill="${color}" d="M172.32,19.36A22.12,22.12,0,0,0,156.76,3.7C143,0,88,0,88,0S33,0,19.24,3.7A22.12,22.12,0,0,0,3.68,19.36C0,33.18,0,62,0,62s0,28.82,3.68,42.64A22.12,22.12,0,0,0,19.24,120.3C33,124,88,124,88,124s55,0,68.76-3.7a22.12,22.12,0,0,0,15.56-15.66C176,90.82,176,62,176,62S176,33.18,172.32,19.36Z"/><polygon fill="#fff" points="70 88.17 116 62 70 35.83 70 88.17"/></svg>`,
    x: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227"><path fill="${color}" d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/></svg>`,
  };
}

export function initTalents(appData) {
  let activeMainIndex = 0;
  let activeSubIndex = 0;

  const mainNav = document.getElementById('main-nav');
  const subNav = document.getElementById('sub-nav');
  const subNavMobile = document.getElementById('sub-nav-mobile');
  const mainTitle = document.getElementById('main-title');
  const mainText = document.getElementById('main-text');
  const displayImage = document.getElementById('display-image');
  const talentBirthday = document.getElementById('talent-birthday');
  const talentAge = document.getElementById('talent-age');
  const talentHeight = document.getElementById('talent-height');
  const talentLinks = document.getElementById('talent-links');
  const shapeImage = document.getElementById('shape-image');

  function render() {
    const currentMain = appData[activeMainIndex];
    const currentSub = currentMain.subItems[activeSubIndex];

    mainTitle.textContent = currentMain.label;
    mainText.textContent = currentMain.text;
    displayImage.src = currentSub.img;
    displayImage.alt = `${currentMain.label} - ${currentSub.label}`;

    // シェイプ内画像をサブナビと連動（個別背景画像）
    if (shapeImage) {
      if (currentSub.shapeImg) {
        shapeImage.src = currentSub.shapeImg;
        shapeImage.alt = currentSub.label;
        shapeImage.style.display = '';
      } else {
        shapeImage.src = '';
        shapeImage.style.display = 'none';
      }
    }

    talentBirthday.textContent = currentMain.birthday;
    talentAge.textContent = currentMain.age + '歳';
    talentHeight.textContent = currentMain.height;

    // ウェブサイトリンク
    const icons = getIcons(currentMain.color || '#87CEEB');
    talentLinks.innerHTML = '';
    currentMain.websites.forEach(site => {
      const a = document.createElement('a');
      a.href = site.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'talent-links__item';
      a.setAttribute('aria-label', site.label);

      if (icons[site.icon]) {
        const span = document.createElement('span');
        span.className = 'talent-links__icon';
        span.innerHTML = icons[site.icon];
        a.appendChild(span);
      } else {
        const img = document.createElement('img');
        img.src = site.icon;
        img.alt = site.label;
        img.className = 'talent-links__icon';
        a.appendChild(img);
      }

      talentLinks.appendChild(a);
    });

    // メインボタン（キャラクター選択）
    mainNav.innerHTML = '';
    appData.forEach((data, index) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', data.label);
      if (data.comingSoon) {
        const span = document.createElement('span');
        span.className = 'coming-soon-label';
        span.textContent = 'coming soon...';
        btn.appendChild(span);
        btn.disabled = true;
      } else {
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
      }
      mainNav.appendChild(btn);
    });

    // サブボタン（衣装選択）— PC用・モバイル用の両方に生成
    const subNavTargets = [subNav, subNavMobile].filter(Boolean);
    for (const nav of subNavTargets) {
      nav.innerHTML = '';
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
        nav.appendChild(btn);
      });
    }
  }

  render();
}
