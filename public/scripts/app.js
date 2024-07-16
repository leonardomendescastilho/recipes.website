import { getDataApi, getIdApi } from './api.js';
import Display from './Display.js';

export async function getElements(pageName) {
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
          getIdApi(url, 'modal');
        });
      });
    }
  }

  if (pageName == 'favorite') {
    Display.favorite();
  }
}

export function displayModal(meal) {
  const modal = document.getElementById('modal');
  const modalContainer = document.getElementById('modal-container');
  const modalBackground = document.getElementById('modal-background');
  const itemId = meal.idMeal;

  // const youtubeUrl = meal.strYoutube;
  // const ytEmbeded = youtubeUrl.replace('watch?v=', 'embed/');

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
 
   <button
   class="modal__button"
   id="modal-button"
   >Favoritos</button>

`;
  if (modalBackground) {
    modalBackground.addEventListener('click', () => {
      console.log('o conteúdo do container foi apagado');
      modal.classList.remove('open');
    });
  }

  const button = document.getElementById('modal-button');
  if (button) {
    button.addEventListener('click', () => {
      let mealsList = [];
      let mealsFav = localStorage.getItem('mealsFav');
      if (mealsFav) {
        mealsList = JSON.parse(mealsFav);
      }

      let isMealInList = mealsList.includes(meal);
      if (isMealInList) {
        console.log('o item já está adicionado na lista');
        //abrir modal de error
      } else {
        mealsList.push(meal);
        localStorage.setItem('mealsFav', JSON.stringify(mealsList));
        console.log('o item foi adiciona na lista com sucesso');
        //abrir modal adicionado com sucesso
      }
    });
  }

  modal.classList.add('open');
}

// async function displayFavorite(meal) {
//   const favList = document.getElementById('fav-list');
//   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;
//   const data = await getIdApi(url, 'favorite');

//   // fav inner

//   const buttonClose = document.querySelectorAll('.fav__button-todel');
//   const buttonView = document.querySelectorAll('.fav__button-toview');

//   buttonClose.forEach((button) => {
//     button.addEventListener('click', () => {
//       const dataId = button.getAttribute('data-id');
//       let mealsList = [];
//       let mealsFav = localStorage.getItem('mealsFav');
//       if (mealsFav) {
//         mealsList = JSON.parse(mealsFav);
//       }

//       let isMealInList = mealsList.includes(dataId);
//       if (isMealInList) {
//         mealsList = mealsList.filter((item) => item !== dataId);
//         localStorage.setItem('mealsFav', JSON.stringify(mealsList));
//         console.log('o item foi removido da lista');
//       } else {
//         console.log('o item não está na lista');
//       }
//     });
//   });

//   buttonView.forEach((button) => {
//     button.addEventListener('click', () => {
//       const dataId = button.getAttribute('data-id');
//       const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dataId}`;
//       getIdApi(url, 'modal');
//     });
//   });
// }
