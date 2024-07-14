import { getElements } from '../app.js';

const Router = {
  async init(pageName) {
    this.loadingPage(pageName);
  },

  async loadingPage(pageName) {
    if (
      pageName !== 'home' &&
      pageName !== 'recipe' &&
      pageName !== 'favorite'
    ) {
      return;
    }

    try {
      if (pageName) {
        const response = await fetch(`../../pages/${pageName}.html`);
        const html = await response.text();
        this.renderPage(html, pageName);
      }
    } catch (error) {
      console.error('HTTP request was not founded ', error);
    }
  },

  async renderPage(html, pageName) {
    const mainEl = document.getElementById('main-content');
    mainEl.innerHTML = html;
    getElements(pageName);
  },
};

export default Router;
