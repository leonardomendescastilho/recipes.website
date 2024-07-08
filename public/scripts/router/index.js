import { handleUrlLocation, getUrl } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    const target = event.target.closest('a.nav__link');

    if (!target) {
      return;
    }

    event.preventDefault();
    getUrl(event);
  });

  window.onpopstate = handleUrlLocation;
  window.route = getUrl;
  handleUrlLocation();

  console.log('Roteamento Inicializado');
});
