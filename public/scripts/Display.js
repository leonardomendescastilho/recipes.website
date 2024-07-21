import { getMealIdApi } from './api.js';
import { innerFavorite, innerRecipe, innerModal } from './innerHtml.js';
import { handleOpenModal } from './modal.js';
import Router from './router/router.js';

let mealsList = [];

const FAVORITE_NONE_MESSAGE = 'DEVE ADICIONAR FAVORITO PRIMEIRO';

const Display = {
	async favorite() {
		const favoriteListContainer = document.getElementById('fav-list');

		const mealsFavoriteList = JSON.parse(localStorage.getItem('mealsFavorite'));

		if (!mealsFavoriteList || mealsFavoriteList.length === 0)
			favoriteListContainer.innerHTML = `${FAVORITE_NONE_MESSAGE}`;

		if (mealsFavoriteList) {
			mealsList = mealsFavoriteList;

			mealsList.map((meal) => {
				favoriteListContainer.innerHTML += `
       ${innerFavorite(meal)}
        `;
			});
		}

		const viewButtons = document.querySelectorAll('.fav__button-toview');
		const deleteButtons = document.querySelectorAll('.fav__button-todel');

		deleteButtons.forEach((button) => {
			button.addEventListener('click', () => {
				const mealIdToDelete = button.getAttribute('data-id');

				const updatedMealsList = mealsList.filter(
					(meal) => meal.idMeal !== mealIdToDelete
				);

				localStorage.setItem('mealsFavorite', JSON.stringify(updatedMealsList));

				Router.init('favorite');
			});
		});

		viewButtons.forEach((button) => {
			button.addEventListener('click', () => {
				const mealIdToShow = button.getAttribute('data-id');

				let mealToShowModal = mealsList.filter(
					(meal) => meal.idMeal === mealIdToShow
				);

				handleOpenModal(mealToShowModal[0]);
			});
		});
	},

	async recipe(meals) {
		const recipeListContainer = document.getElementById('recipe-list');
		meals.map((meal) => {
			recipeListContainer.innerHTML += `
       ${innerRecipe(meal)}
      `;
		});

		const buttonsKnowMore = document.querySelectorAll('.recipe__button');

		if (buttonsKnowMore) {
			buttonsKnowMore.forEach((button) => {
				button.addEventListener('click', () => {
					const mealIdToKnow = button.getAttribute('data-id');

					getMealIdApi(mealIdToKnow, 'recipe');
				});
			});
		}
	},
};

export default Display;
