document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const calorieSelect = document.getElementById("calorie-select");
  const dietSelect = document.getElementById("diet-select");
  const searchBtn = document.getElementById("search-btn");
  const searchMessage = document.getElementById("search-message");

  function filterMeals() {
    searchMessage.textContent = "";
    searchMessage.style.display = "none";
    const activeTab = document.querySelector(".meal-tabs button.active-tab");
    let key = activeTab ? activeTab.textContent.trim() : "Show All";

    let allMeals;
    if (key === "Show All") {
      allMeals = Object.values(window.mealsData).flat();
    } else {
      allMeals = window.mealsData[key] || [];
    }
    let searchTerm = searchInput.value.trim().toLowerCase();
    let calorieFilter = calorieSelect.value;
    let dietFilter = dietSelect.value;

    let filtered = allMeals.filter((meal) => {
      let matchesName =
        meal.name && meal.name.toLowerCase().includes(searchTerm);
      let kcalNum = parseInt(meal.kcal);
      let matchesCalorie = true;
      if (calorieFilter === "low") matchesCalorie = kcalNum < 200;
      else if (calorieFilter === "medium")
        matchesCalorie = kcalNum >= 200 && kcalNum <= 350;
      else if (calorieFilter === "high") matchesCalorie = kcalNum > 350;
      let matchesDiet =
        dietFilter === "" ||
        (meal.tag && meal.tag.toLowerCase() === dietFilter.toLowerCase());

      return matchesName && matchesCalorie && matchesDiet;
    });

    window.currentMeals = filtered;
    window.itemsToShow = 8;
    window.renderMeals(window.currentMeals, window.itemsToShow);
    if (filtered.length === 0) {
      let category = key;
      if (category === "Show All") {
        category = "any Category";
      }
      searchMessage.textContent = `"Meal" not found in ${category}`;
      searchMessage.style.display = "block";
      searchMessage.style.marginTop = "5rem";
      searchMessage.style.marginBottom = "15rem";
    } else {
      searchMessage.textContent = "";
      searchMessage.style.display = "none";
    }
  }

  searchInput.oninput = filterMeals;
  calorieSelect.onchange = filterMeals;
  dietSelect.onchange = filterMeals;
});
