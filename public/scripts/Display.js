import { getIdApi } from './api.js';
import Router from './router/router.js';

let mealsList = [];

const Display = {
	async favorite() {
		const favList = document.getElementById('fav-list');

		const mealsFavoriteList = JSON.parse(localStorage.getItem('mealsFavorite'));

		if (mealsFavoriteList.length === 0)
			favList.innerHTML = `<h1>DEVE ADICIONAR FAVORITO PRIMEIRO</h1>`;

		if (mealsFavoriteList) {
			mealsList = mealsFavoriteList;

			mealsList.map((data) => {
				favList.innerHTML += `
        <div
      class="fav__item"
      id="fav-item">
      <h3 class="fav__item-title">${data.strMeal}</h3>
      <img
        class="fav__item-img"
        src="${data.strMealThumb}"
        alt="image of" />

      <div class="fav__item-info">
        <span class="info__area">${data.strArea}</span>
        <span class="info__category">${data.strCategory}</span>
      </div>

      <button
        data-id=${data.idMeal}
        class="fav__button-toview"
        id="fav-btn">
        Visualizar
      </button>
       <button
       data-id=${data.idMeal}
        class="fav__button-todel"
        id="fav-btn">
        Deletar
      </button>
    </div>
        `;
			});
		}

		const buttonView = document.querySelectorAll('.fav__button-toview');
		const buttonDel = document.querySelectorAll('.fav__button-todel');

		buttonDel.forEach((button) => {
			button.addEventListener('click', () => {
				const mealIdToDel = button.getAttribute('data-id');

				const updatedMealsList = mealsList.filter(
					(meals) => meals.idMeal !== mealIdToDel
				);

				localStorage.setItem('mealsFavorite', JSON.stringify(updatedMealsList));

				Router.init('favorite');
			});
		});

		buttonView.forEach((button) => {
			button.addEventListener('click', () => {
				const mealIdToShow = button.getAttribute('data-id');

				let favoriteMealToShow = mealsList.filter(
					(item) => item.idMeal === mealIdToShow
				);

				this.handleOpenModal(favoriteMealToShow[0]);
			});
		});
	},

	async recipe(meals) {
		const listEl = document.getElementById('recipe-list');
		meals.map((meal) => {
			listEl.innerHTML += `
       <div
          class="recipe__item"
          id="recipe-item">
            <h3 class="recipe__title">${meal.strMeal}</h3>
            <div
            class="recipe__img"
            id="recipe-img">
              <img
                src="${meal.strMealThumb}"
                alt="image of" />
            </div>
            <button
            data-id=${meal.idMeal}
            class="recipe__button">
              Saiba mais
            </button>
        </div>
      `;
		});

		const buttonsKnowMore = document.querySelectorAll('.recipe__button');

		if (buttonsKnowMore) {
			buttonsKnowMore.forEach((button) => {
				button.addEventListener('click', () => {
					const dataId = button.getAttribute('data-id');

					getIdApi(dataId, 'recipe');
				});
			});
		}
	},

	handleOpenModal(meal) {
		const modalContainer = document.getElementById('modal-container');
		const modal = document.getElementById('modal');
		const modalBackground = document.getElementById('modal-background');

		modalContainer.innerHTML = `
      <h3 class="modal__title">${meal.strMeal}</h3>
        <img
          class="modal__img"
          src="${meal.strMealThumb}"
          alt="image of ${meal.strMeal}" 
        />
        <span class="modal__tag">${meal.strTags ?? ' '}</span>
        <div class="modal__category">
          <span>${meal.strArea}</span>
          <span>${meal.strCategory}</span>
        </div>

      <h4>ingredientes</h4>
        <div class="modal__ingredient">
          <ol>
            <li>soy sauce</li>
            <li>water</li>
            <li>brown sugar</li>
            <li>ground ginger</li>
            <li>minced garlic</li>
            <li>cornstarch</li>
            <li>chicken breasts</li>
            <li>stir-fry vegetables</li>
            <li>brown rice</li>
          </ol>
          <ul>
            <li>3/4 cup</li>
            <li>1/2 cup</li>
            <li>1/4 cup</li>
            <li>1/2 teaspoon</li>
            <li>1/2 teaspoon</li>

            <li>4 Tablespoons</li>
            <li>2</li>
            <li>1 (12 oz.)</li>
            <li>3 cups</li>
          </ul>
        </div>
      <h3>Veja como prepar essa receita</h3>
 
      <button
      class="modal__button"
      id="modal-button">
      Favoritos
      </button>
    `;

		modal.classList.add('open');

		if (modalBackground) {
			modalBackground.addEventListener('click', () => {
				modal.classList.remove('open');
			});
		}

		const buttonAddFav = document.getElementById('modal-button');
		if (buttonAddFav) {
			buttonAddFav.addEventListener('click', () => {
				const mealsFavoriteList = JSON.parse(
					localStorage.getItem('mealsFavorite')
				);

				let addMealsToFavoriteList = mealsFavoriteList;

				let isMealInList = addMealsToFavoriteList.some(
					(item) => item.idMeal === meal.idMeal
				);
				if (isMealInList) {
					//abrir modal de error
				} else {
					addMealsToFavoriteList.push(meal);
					localStorage.setItem(
						'mealsFavorite',
						JSON.stringify(addMealsToFavoriteList)
					);
					//abrir modal de acerto
				}
			});
		}
	},
};

export default Display;
