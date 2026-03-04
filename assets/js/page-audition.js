import { initDrawer } from './modules/drawer.js';
initDrawer();

// Basic form validation feedback
const form = document.querySelector('.audition-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('ご応募ありがとうございます。内容を確認の上、ご連絡いたします。');
        form.reset();
    });
}
