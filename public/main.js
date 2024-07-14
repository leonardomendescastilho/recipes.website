import Router from './scripts/router/router.js';

document.addEventListener('DOMContentLoaded', () => {
  handleNavLinkClick();
  handleNavChange();
  Router.init('home');
});

function handleNavLinkClick() {
  document.querySelector('.home__link').addEventListener('click', (event) => {
    event.preventDefault();
    Router.init('home');
  });
  document.querySelector('.recipe__link').addEventListener('click', (event) => {
    event.preventDefault();
    Router.init('recipe');
  });
  document.querySelector('.fav__link').addEventListener('click', (event) => {
    event.preventDefault();
    Router.init('favorite');
  });
}

function handleNavChange() {
  const navMenu = document.getElementById('nav-menu');
  const navClose = document.getElementById('nav-close');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav__link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  navLinks.forEach((anchor) => {
    anchor.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  });
}
