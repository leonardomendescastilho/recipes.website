import { getMealAreaApi } from './api.js';
import Display from './Display.js';

export async function renderElementsOnHtml(pageName) {
	if (pageName == 'home') {
		const formEl = document.getElementById('form');

		formEl.addEventListener('submit', (event) => {
			event.preventDefault();

			const optionValue = document.getElementById('area').value;
			const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${optionValue}`;

			getMealAreaApi(url);
		});
	}

	if (pageName == 'recipe') {
		const mealsArea = JSON.parse(localStorage.getItem('mealsArea'));
		Display.recipe(mealsArea);
	}

	if (pageName == 'favorite') {
		Display.favorite();
	}
}
