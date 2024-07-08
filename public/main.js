document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('nav-menu');
  const navClose = document.getElementById('nav-close');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav__link');

  function handleOpenMenu() {
    navMenu.classList.add('show-menu');
  }

  function handleCloseMenu() {
    navMenu.classList.remove('show-menu');
  }

  if (navToggle) {
    navToggle.addEventListener('click', handleOpenMenu);
  }
  if (navClose) {
    navClose.addEventListener('click', handleCloseMenu);
  }

  navLinks.forEach((item) => {
    item.addEventListener('click', handleCloseMenu);
  });

  console.log('DOM Manipulation Initialized');
});
