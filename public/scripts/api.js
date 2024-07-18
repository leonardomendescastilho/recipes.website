import Display from './Display.js';
import Router from './router/router.js';

export async function getDataApi(url) {
	if (url) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error HTTP! status: ${response.status}`);
			}
			const data = await response.json();
			const { meals } = data;
			localStorage.setItem('mealsArea', JSON.stringify(meals));

			Router.init('recipe');
		} catch (error) {
			console.error('Not found API data', error);
		}
	}
}

export async function getIdApi(dataId, pageName) {
	const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dataId}`;

	if (url) {
		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Error HTTP! status: ${response.status}`);
			}

			const data = await response.json();

			const meal = data.meals[0];

			if (pageName == 'recipe' || pageName == 'favorite') {
				Display.handleOpenModal(meal);
			}
		} catch (error) {
			console.error(`Not found API data-id`, error);
		}
	}
}
