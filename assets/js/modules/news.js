function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function initNews(news) {
  const track = document.querySelector('.news-carousel__track');
  if (!track) return;

  const fragment = document.createDocumentFragment();

  news.forEach(item => {
    const slide = document.createElement('div');
    slide.className = 'news-carousel__slide';

    // カルーセル画像
    const content = document.createElement('div');
    content.className = 'news-carousel__content';
    content.style.backgroundImage = `url(${CSS.escape(item.image)})`;

    const label = document.createElement('p');
    label.textContent = item.label;
    content.appendChild(label);

    // テキスト部分
    const textWrap = document.createElement('div');
    textWrap.className = 'news-carousel__text-wrap';

    const meta = document.createElement('div');
    meta.className = 'news-carousel__meta';

    const time = document.createElement('time');
    time.setAttribute('datetime', item.date);
    time.textContent = item.dateDisplay;

    const category = document.createElement('span');
    category.className = `news-carousel__category news-carousel__category--${item.category}`;
    category.textContent = item.category;

    meta.appendChild(time);
    meta.appendChild(category);

    const title = document.createElement('p');
    title.className = 'news-carousel__title';
    title.textContent = item.title;

    textWrap.appendChild(meta);
    textWrap.appendChild(title);

    // リンクでラップするか直接配置
    if (item.link) {
      const a = document.createElement('a');
      a.href = item.link;
      a.appendChild(content);
      a.appendChild(textWrap);
      slide.appendChild(a);
    } else {
      slide.appendChild(content);
      slide.appendChild(textWrap);
    }

    fragment.appendChild(slide);
  });

  track.appendChild(fragment);
}
