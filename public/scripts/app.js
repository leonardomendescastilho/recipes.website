import { getDataApi, getMealId } from './api.js';

export function getElements(pageName) {
  if (pageName == 'home') {
    const form = document.getElementById('form');
    console.log('Home loaded...');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const option = document.getElementById('area').value;
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${option}`;

      getDataApi(url);
    });
  }

  if (pageName == 'recipe') {
    const mealData = localStorage.getItem('mealsArray');
    const listEl = document.getElementById('recipe-list');

    if (mealData) {
      const meals = JSON.parse(mealData);

      meals.map((item) => {
        listEl.innerHTML += `
         <div
          class="recipe__item"
          id="recipe-item">
            <h3 class="recipe__title">${item.strMeal}</h3>
            <div
            class="recipe__img"
            id="recipe-img">
              <img
                src="${item.strMealThumb}"
                alt="image of" />
            </div>
            <button
            data-id=${item.idMeal}
            class="recipe__button">
              Saiba mais
            </button>
        </div>
        `;
      });
    }
    const buttons = document.querySelectorAll('.recipe__button');

    if (buttons) {
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const dataId = button.getAttribute('data-id');
          const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dataId}`;
          getMealId(url);
        });
      });
    }
  }

  if (pageName == 'favorite') {
    console.log('favorite loaded...');
  }
}

export function openModal(meal) {
  console.log('modal is open.. with meal ', meal);

  const modal = document.getElementById('modal');
  const modalContainer = document.getElementById('modal-container');
  const modalBackground = document.getElementById('modal-background');
  if (modalBackground) {
    modalBackground.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  const youtubeUrl = meal.strYoutube;
  const ytEmbeded = youtubeUrl.replace('watch?v=', 'embed/');

  modalContainer.innerHTML = `
  <h3 class="modal__title">${meal.strMeal}</h3>

   <img
     class="modal__img"
     src="${meal.strMealThumb}"
     alt="image of ${meal.strMeal}" />
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
   <iframe
     width="560"
     height="315"
     src=${ytEmbeded}
     frameborder="0"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen></iframe>

   <button
   class="modal__button"
   id="modal-button"
   >Favoritos</button>

`;

  const button = document.getElementById('modal-button');
  button.addEventListener('click', () => {
    if (localStorage.getItem(`Meal${meal.mealId}`) === `Meal${meal.mealId}`) {
      console.log('O item já existe na lista');
      //open modal error
    } else {
      console.log('O item não existe, vai ser adicionado');
      localStorage.setItem(`Meal${meal.mealId}`, `Meal${meal.mealId}`);
      //openFavoriteModal
    }
  });

  modal.classList.add('open');
}
