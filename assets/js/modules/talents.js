// タレントセクションの表示切り替えのみを担当する。
// コンテンツ（テキスト・画像・リンク）はすべて index.html に直接記述されており、
// ここでは data-talent / data-outfit 属性を見て「どれを表示するか」を切り替えるだけ。
function initTalents() {
  const root = document.getElementById('page-section__talents');
  if (!root) return;

  // 表示中のキャラクター / 衣装のインデックス
  let activeTalent = 0;
  let activeOutfit = 0;

  const mainButtons = root.querySelectorAll('#main-nav button[data-talent]');

  function apply() {
    // キャラクターごとのテキストパネル（PC）とモバイル衣装ナビの表示切り替え
    root.querySelectorAll('.text-area[data-talent], #sub-nav-mobile .outfit-nav[data-talent]').forEach((el) => {
      el.toggleAttribute('hidden', Number(el.dataset.talent) !== activeTalent);
    });

    // キャラクター切り替えボタンのアクティブ状態（見た目＋支援技術向けの選択状態）
    mainButtons.forEach((btn) => {
      const isActive = Number(btn.dataset.talent) === activeTalent;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    // 衣装ボタンのアクティブ状態（現在のキャラクターの該当衣装のみ）
    root.querySelectorAll('.outfit-btn').forEach((btn) => {
      const group = btn.closest('[data-talent]');
      const talent = group ? Number(group.dataset.talent) : NaN;
      const isActive = talent === activeTalent && Number(btn.dataset.outfit) === activeOutfit;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    // キャラクター画像・背景シェイプ画像の表示切り替え
    root.querySelectorAll('.image-area img, .shape-content__img').forEach((img) => {
      const match = Number(img.dataset.talent) === activeTalent && Number(img.dataset.outfit) === activeOutfit;
      img.toggleAttribute('hidden', !match);
    });
  }

  // キャラクター切り替え
  mainButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTalent = Number(btn.dataset.talent);
      activeOutfit = 0; // キャラクター変更時は先頭の衣装に戻す
      apply();
    });
  });

  // 衣装切り替え（PC・モバイル両方のボタンを対象）
  root.querySelectorAll('.outfit-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeOutfit = Number(btn.dataset.outfit);
      apply();
    });
  });

  apply();
}
