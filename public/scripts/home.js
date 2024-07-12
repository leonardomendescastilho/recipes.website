export default function home() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHome);
  } else {
    initializeHome();
  }
}

function initializeHome() {
  const form = document.getElementById('form');
  const selectEl = document.getElementById('country');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const option = selectEl.value;
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${option}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }

      const data = await response.json();
      const { meals } = data;

      localStorage.setItem('mealDataArray', JSON.stringify(meals));
    } catch (error) {
      console.error(`Error to get API`);
    }
  });
}
