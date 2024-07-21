export function innerFavorite(meal) {
	return ` <div
      class="fav__item"
      id="fav-item">
      <h3 class="fav__item-title">${meal.strMeal}</h3>
      <img
        class="fav__item-img"
        src="${meal.strMealThumb}"
        alt="image of" />

      <div class="fav__item-info">
        <span class="info__area">${meal.strArea}</span>
        <span class="info__category">${meal.strCategory}</span>
      </div>

      <button
        data-id=${meal.idMeal}
        class="fav__button-toview"
        id="fav-btn">
        Visualizar
      </button>
       <button
       data-id=${meal.idMeal}
        class="fav__button-todel"
        id="fav-btn">
        Deletar
      </button>
    </div>`;
}

export function innerRecipe(meal) {
	return `
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
}

export function innerModal(meal) {
	return `
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
}
