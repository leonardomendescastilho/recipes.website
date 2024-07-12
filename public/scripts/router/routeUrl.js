export const routes = {
  '/': {
    template: 'templates/home.html',
    title: 'Home',
    description: 'This is a home page',
    script: '../home.js ',
  },
  '/receitas': {
    template: 'templates/receitas.html',
    title: 'Recipes',
    description: 'This is a recipes page',
    script: '../receitas.js ',
  },
  '/favoritos': {
    template: 'templates/favoritos.html',
    title: 'Favorites',
    description: 'This is a favorite page',
    script: '../favoritos.js ',
  },
  404: {
    template: 'templates/404.html',
    title: 'Not Found',
    description: 'This is an error page',
    script: ' ',
  },
};
