export default function loadRecipes() {
  const mealDataArray = localStorage.getItem('mealDataArray');
  const el = document.getElementById('recipe-list');

  if (mealDataArray) {
    const meals = JSON.parse(mealDataArray);

    meals.map((item) => {
      el.innerHTML += `
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
        class="recipe__button"
        >
        Saiba mais
      </button>
    </div>`;
    });
  } else {
    console.error(`Not found any data in localStorage`);
  }
  const button = document.querySelectorAll('.recipe__button');

  if (button) {
    button.forEach((buttonItem) => {
      buttonItem.addEventListener('click', () => {
        const idMeal = buttonItem.getAttribute('data-id');
        const urlApiId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;

        async function getMealId() {
          try {
            const response = await fetch(urlApiId);
            if (!response.ok) {
              throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            const data = await response.json();
            const meal = data.meals[0];

            createModal(meal);
          } catch (error) {
            console.error(`Error to get meals ID`);
          }
        }
        getMealId();
      });
    });
  }
}

function createModal(meal) {
  console.log(meal);
  const modal = document.getElementById('modal');
  const modalContainer = document.getElementById('modal-container');
  const modalBackground = document.getElementById('modal-background');
  const youtubeUrl = meal.strYoutube;
  const ytConvertedToEmbed = youtubeUrl.replace('watch?v=', 'embed/');

  modal.classList.add('open');

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
        src=${ytConvertedToEmbed}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>

      <button
      class="modal__button"
      id="modal-button"
      >Favoritos</button>
  
  `;

  const button = document.getElementById('modal-button');
  console.log(button);

  button.addEventListener('click', () => {
    console.log('o botão do favoritos foi chamado');
    localStorage.setItem(`mealData${meal.idMeal}`, JSON.stringify(meal.idMeal));
    console.log('o id favorito foi adicionado no localStorage');
    //agora começo a criar a página favoritos
  });

  if (modalBackground) {
    modalBackground.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }
}
