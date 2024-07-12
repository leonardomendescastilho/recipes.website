import { routes } from './routeUrl.js';

export function getUrl(event) {
  event = event || window.event;
  event.preventDefault();

  const target = event.target;
  const href = target.getAttribute('href');
  window.history.pushState({}, '', href);

  handleUrlLocation();
}

export const handleUrlLocation = async (location) => {
  location = window.location.pathname || location;

  if (location.length === 0) {
    location = '/';
  }

  const route = routes[location];

  if (!route || !route.template) {
    console.error('Template not found for the given route');
    return;
  }

  try {
    const response = await fetch(route.template);

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const html = await response.text();
    const main = document.getElementById('main-content');

    if (main) {
      main.innerHTML = html;
      document.title = route.title;
    }

    if (route.script) {
      try {
        const module = await import(route.script);

        if (module.default) module.default();
      } catch (error) {
        console.error('Error loading script', error);
      }
    }
  } catch (error) {
    console.error('Error loading template', error);
  }
};
