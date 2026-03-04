import { initDrawer } from './modules/drawer.js';

const ICONS = {
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 124"><path fill="#87CEEB" d="M172.32,19.36A22.12,22.12,0,0,0,156.76,3.7C143,0,88,0,88,0S33,0,19.24,3.7A22.12,22.12,0,0,0,3.68,19.36C0,33.18,0,62,0,62s0,28.82,3.68,42.64A22.12,22.12,0,0,0,19.24,120.3C33,124,88,124,88,124s55,0,68.76-3.7a22.12,22.12,0,0,0,15.56-15.66C176,90.82,176,62,176,62S176,33.18,172.32,19.36Z"/><polygon fill="#fff" points="70 88.17 116 62 70 35.83 70 88.17"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227"><path fill="#87CEEB" d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/></svg>`,
};

const PLACEHOLDER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" class="talent-card__placeholder-icon"><circle cx="60" cy="40" r="22" fill="#bbb" opacity="0.5"/><ellipse cx="60" cy="95" rx="35" ry="22" fill="#bbb" opacity="0.4"/></svg>`;

function createTalentCard(talent) {
  const card = document.createElement('article');
  const isComingSoon = talent.comingSoon === true;

  card.className = `talent-card${isComingSoon ? ' talent-card--coming-soon' : ''}`;

  // Image area
  const imageDiv = document.createElement('div');
  imageDiv.className = 'talent-card__image';

  if (isComingSoon || !talent.thumbnail) {
    const placeholder = document.createElement('div');
    placeholder.className = 'talent-card__placeholder';
    placeholder.innerHTML = PLACEHOLDER_SVG;
    imageDiv.appendChild(placeholder);
  } else {
    const img = document.createElement('img');
    img.src = `../${talent.thumbnail}`;
    img.alt = talent.label;
    img.loading = 'lazy';
    imageDiv.appendChild(img);
  }

  card.appendChild(imageDiv);

  // Color accent line
  const accent = document.createElement('div');
  accent.className = 'talent-card__accent';
  accent.style.backgroundColor = talent.color || '#999999';
  card.appendChild(accent);

  // Body
  const body = document.createElement('div');
  body.className = 'talent-card__body';

  // Name
  const name = document.createElement('h2');
  name.className = 'talent-card__name';
  name.textContent = talent.label;
  body.appendChild(name);

  // Catchphrase
  if (talent.catchphrase) {
    const catchphrase = document.createElement('p');
    catchphrase.className = 'talent-card__catchphrase';
    catchphrase.textContent = talent.catchphrase;
    body.appendChild(catchphrase);
  }

  // Hashtags
  if (talent.hashtags && talent.hashtags.length > 0) {
    const hashtagsDiv = document.createElement('div');
    hashtagsDiv.className = 'talent-card__hashtags';
    talent.hashtags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'talent-card__hashtag';
      span.textContent = tag;
      hashtagsDiv.appendChild(span);
    });
    body.appendChild(hashtagsDiv);
  }

  // SNS Links (only for non-coming-soon talents)
  if (!isComingSoon && talent.websites && talent.websites.length > 0) {
    const linksDiv = document.createElement('div');
    linksDiv.className = 'talent-card__links';

    talent.websites.forEach(site => {
      const a = document.createElement('a');
      a.href = site.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'talent-links__item';
      a.setAttribute('aria-label', site.label);

      if (ICONS[site.icon]) {
        const span = document.createElement('span');
        span.className = 'talent-links__icon';
        span.innerHTML = ICONS[site.icon];
        a.appendChild(span);
      } else {
        const img = document.createElement('img');
        img.src = site.icon;
        img.alt = site.label;
        img.className = 'talent-links__icon';
        a.appendChild(img);
      }

      linksDiv.appendChild(a);
    });

    body.appendChild(linksDiv);
  }

  card.appendChild(body);
  return card;
}

async function initTalentsPage() {
  initDrawer();

  const grid = document.querySelector('.talent-grid');
  if (!grid) return;

  try {
    const response = await fetch('../content/talents/index.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const talents = await response.json();

    talents.forEach(talent => {
      grid.appendChild(createTalentCard(talent));
    });
  } catch (err) {
    console.error('タレントデータの読み込みに失敗しました:', err);
    grid.innerHTML = '<p>データの読み込みに失敗しました。</p>';
  }
}

initTalentsPage();
