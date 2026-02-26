export function initTalents(appData) {
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
