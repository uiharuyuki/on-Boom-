export function initNews(news) {
  const track = document.querySelector('.news-carousel__track');
  if (!track) return;

  track.innerHTML = news.map(item => {
    const inner = `
      <div class="news-carousel__content" style="background-image: url(${item.image})">
        <p>${item.label}</p>
      </div>
      <div class="news-carousel__text-wrap">
        <div class="news-carousel__meta">
          <time datetime="${item.date}">${item.dateDisplay}</time>
          <span class="news-carousel__category">${item.category}</span>
        </div>
        <p class="news-carousel__title">${item.title}</p>
      </div>
    `;
    return `
      <div class="news-carousel__slide">
        ${item.link ? `<a href="${item.link}">${inner}</a>` : inner}
      </div>
    `;
  }).join('');
}
