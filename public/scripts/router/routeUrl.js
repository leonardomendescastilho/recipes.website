export const routes = {
  '/': {
    template: 'templates/home.html',
    title: 'Home',
    description: 'This is a home page',
  },
  '/receitas': {
    template: 'templates/receitas.html',
    title: 'Recipes',
    description: 'This is a recipes page',
  },
  '/favoritos': {
    template: 'templates/favoritos.html',
    title: 'Favorites',
    description: 'This is a favorite page',
  },
  404: {
    template: 'templates/404.html',
    title: 'Not Found',
    description: 'This is an error page',
  },
};