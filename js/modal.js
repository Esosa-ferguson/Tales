const modal = document.getElementById("meal-modal");
const closeBtn = document.querySelector(".close-btn");
const modalMealImg = document.getElementById("modal-meal-img");
const modalMealTitle = document.getElementById("modal-meal-title");
const modalMealTags = document.getElementById("modal-meal-tags");
const modalMealNutrition = document.getElementById("modal-meal-nutrition");
const modalMealIngredients = document.getElementById("modal-meal-ingredients");
const modalMealSteps = document.getElementById("modal-meal-steps");

document.addEventListener("click", function (e) {
  const card = e.target.closest(".meal-card");
  if (card) {
    const name = card.querySelector("h3").textContent;
    const allMeals = window.mealsData
      ? Object.values(window.mealsData).flat()
      : [];
    const meal = allMeals.find((m) => m.name === name);
    if (meal) {
      modalMealImg.src = meal.img;
      modalMealTitle.textContent = meal.name;
      modalMealTags.innerHTML = `<span>${meal.tag}</span>`;

      if (meal.nutrition) {
        modalMealNutrition.textContent = Object.entries(meal.nutrition)
          .map(([k, v]) => `${k}: ${v}`)
          .join(" , ");
      } else {
        modalMealNutrition.textContent = meal.kcal || "";
      }

      if (meal.ingredients) {
        modalMealIngredients.textContent = Object.entries(meal.ingredients)
          .map(([k, v]) => ` ${v}`)
          .join(" , ");
      } else {
        modalMealIngredients.textContent = meal.kcal || "";
      }

      if (meal.steps) {
        modalMealSteps.textContent = Object.entries(meal.steps)
          .map(([k, v]) => ` ${v}`)
          .join(" , ");
      } else {
        modalMealSteps.textContent = meal.kcal || "";
      }

      modal.classList.remove("hidden");
      document.body.classList.add("modal-open");
    }
  }
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
});
// modal.addEventListener("click", (e) => {
//   if (e.target === modal) {
//     modal.classList.add("hidden");
//     document.body.classList.remove("modal-open");
//   }
// });
