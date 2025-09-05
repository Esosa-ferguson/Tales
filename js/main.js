//main.js

document.addEventListener("DOMContentLoaded", function () {
  const mealTabs = document.querySelectorAll(".meal-tabs button");
  const mealsList = document.querySelector(".meals-list");
  const searchInput = document.getElementById("search-input");
  const calorieSelect = document.getElementById("calorie-select");
  const dietSelect = document.getElementById("diet-select");

  window.currentMeals = [];
  window.itemsToShow = 8;
  window.mealsData = [];

  // Fetch meals data
  fetch("meals.json")
    .then((response) => response.json())
    .then((data) => {
      window.mealsData = data;

      mealTabs.forEach((tab) => tab.addEventListener("click", handleClick));

      const showAllTab = Array.from(mealTabs).find(
        (tab) => tab.textContent.trim() === "Show All"
      );
      if (showAllTab) {
        showAllTab.classList.add("active-tab");
      }
      showAllMeals();
      renderFavourites();
    })
    .catch((error) => console.error("Error loading meals.json:", error));

  window.renderMeals = function (meals, limit = window.itemsToShow) {
    mealsList.innerHTML = "";
    const toRender = meals.slice(0, limit);
    toRender.forEach((meal) => {
      mealsList.innerHTML += `
                <div class="meal-card">
             
                    <img src="${meal.img}" alt="${meal.name}">
                    <h3>${meal.name}</h3>
                    <p>${meal.kcal}</p>
                    <span>${meal.tag}</span>
                    <i class="fa-regular fa-star favorite-icon" data-id = "${meal.name}"></i>
                    </div>
                    
               
                
            `;
    });

    const showMoreBtn = document.getElementById("show-more-btn");
    const hideBtn = document.getElementById("hide-btn");
    if (meals.length > limit) {
      showMoreBtn.style.display = "block";
      hideBtn.style.display = "none";
    } else if (meals.length > 12) {
      showMoreBtn.style.display = "none";
      hideBtn.style.display = "block";
    } else {
      showMoreBtn.style.display = "none";
      hideBtn.style.display = "none";
    }
    attachFavoriteEvents();
    updateMainStars();
  };

  function showAllMeals() {
    window.currentMeals = Object.values(window.mealsData).flat();
    window.itemsToShow = 8;
    window.renderMeals(window.currentMeals, window.itemsToShow);
  }

  function handleClick(e) {
    const searchMessage = document.getElementById("search-message");
    if (searchMessage) {
      searchMessage.textContent = "";
      searchMessage.style.display = "none";
    }
    mealTabs.forEach((tab) => tab.classList.remove("active-tab"));
    e.target.classList.add("active-tab");

    const key = e.target.textContent;
    window.itemsToShow = 8;

    if (searchInput) searchInput.value = "";
    if (calorieSelect) calorieSelect.selectedIndex = 0;
    if (dietSelect) dietSelect.selectedIndex = 0;

    if (key === "Show All") {
      showAllMeals();
    } else if (window.mealsData[key]) {
      window.currentMeals = window.mealsData[key];
      window.renderMeals(window.currentMeals, window.itemsToShow);
    }
  }

  document.getElementById("show-more-btn").onclick = function () {
    window.itemsToShow += 20;
    window.renderMeals(window.currentMeals, window.itemsToShow);
  };
  document.getElementById("hide-btn").onclick = function () {
    window.itemsToShow = 8;
    window.renderMeals(window.currentMeals, window.itemsToShow);
  };
});
