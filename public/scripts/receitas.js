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

function createModal(meal) {
  console.log(meal);
  //criar o open modal aqui
}
