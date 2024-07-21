import { innerModal } from './innerHtml.js';

export function handleOpenModal(meal) {
	const modal = document.getElementById('modal');
	const modalContainer = document.getElementById('modal-container');
	const modalBackground = document.getElementById('modal-background');

	modalContainer.innerHTML = `
    ${innerModal(meal)}
  `;

	modal.classList.add('open');

	if (modalBackground) {
		modalBackground.addEventListener('click', () => {
			modal.classList.remove('open');
		});
	}

	handleModalButtons(meal);
}

export function handleModalButtons(meal) {
	const buttonToAddFavoriteMeal = document.getElementById('modal-button');

	buttonToAddFavoriteMeal.addEventListener('click', () => {
		let mealsFavoriteList = JSON.parse(localStorage.getItem('mealsFavorite'));

		if (!mealsFavoriteList) {
			mealsFavoriteList = [];

			mealsFavoriteList.push(meal);
			localStorage.setItem('mealsFavorite', JSON.stringify(mealsFavoriteList));
		}

		let isMealInList = mealsFavoriteList.some(
			(mealItem) => mealItem.idMeal === meal.idMeal
		);

		if (isMealInList) {
			console.log('a receita já existe nos favoritos');
			// abrir modal de já existe
		} else {
			mealsFavoriteList.push(meal);
			localStorage.setItem('mealsFavorite', JSON.stringify(mealsFavoriteList));
		}
	});
}
