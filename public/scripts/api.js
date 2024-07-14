import Router from './router/router.js';
import { openModal } from './app.js';

export async function getDataApi(url) {
  if (url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }
      const data = await response.json();
      const { meals } = data;
      localStorage.setItem('mealsArray', JSON.stringify(meals));

      Router.init('recipe');
    } catch (error) {
      console.error('Not found API data', error);
    }
  }
}

export async function getMealId(url) {
  if (url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }
      const data = await response.json();
      const meal = data.meals[0];

      openModal(meal);
    } catch (error) {
      console.error(`Not foud API data-id`, error);
    }
  }
}
