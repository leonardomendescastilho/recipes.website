import Router from './router/router.js';

let mealsList = [];

const Display = {
  async favorite() {
    const favList = document.getElementById('fav-list');

    const mealsFavoriteList = JSON.parse(localStorage.getItem('mealsFav'));

    if(mealsFavoriteList.length === 0)
      favList.innerHTML = `<h1>DEVE ADICIONAR FAVORITO PRIMEIRO</h1>`

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
        console.log(`o item id ${mealIdToDel} será deletado é o `);

        const updatedMealsList = mealsList.filter(
          (meals) => meals.idMeal !== mealIdToDel
        );

        console.log(`o item com id ${mealIdToDel} foi excluido`);

        localStorage.setItem('mealsFav', JSON.stringify(updatedMealsList));

        Router.init('favorite');
      });
    });

    buttonView.forEach((button) => {
      button.addEventListener('click', () => {
        const mealIdToShow = button.getAttribute('data-id');
        // logica para renderizar, abrir modal
        // no caso, quero só chamar o modal com o data completo, sem precisar fazer outra pesquisa
      });
    });
  },

  async recipe() {},
};

export default Display;
