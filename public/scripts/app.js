import { getDataApi } from './api.js';
import Display from './Display.js';

export async function getElements(pageName) {
	if (pageName == 'home') {
		const form = document.getElementById('form');

		form.addEventListener('submit', (event) => {
			event.preventDefault();
			const option = document.getElementById('area').value;
			const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${option}`;

			getDataApi(url);
		});
	}

	if (pageName == 'recipe') {
		const allMealsArea = JSON.parse(localStorage.getItem('mealsArea'));
		console.log('recipe start');

		if (allMealsArea) {
			Display.recipe(allMealsArea);
		}
	}

	if (pageName == 'favorite') {
		Display.favorite();
	}
}
