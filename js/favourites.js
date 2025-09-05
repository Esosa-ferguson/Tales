window.favorites = [];

// Render favourites section inside modal
function renderFavourites() {
  const favList = document.querySelector(".favourites-list");
  favList.innerHTML = "";

  if (window.favorites.length === 0) {
    favList.innerHTML = `<p class="empty-msg"> No favourites yet. Go add some</p>`;
    if (window.updateFavBadge) window.updateFavBadge();
    return;
  }

  window.favorites.forEach((meal) => {
    favList.innerHTML += `
      <div class="meal-card">
        <img src="${meal.img}" alt="${meal.name}">
        <h3>${meal.name}</h3>
        <p>${meal.kcal}</p>
        <span>${meal.tag}</span>
        <i class="fa-solid fa-star favorite-icon" data-id="${meal.name}"></i>
      </div>
    `;
  });

  document
    .querySelectorAll(".favourites-list .favorite-icon")
    .forEach((star) => {
      star.addEventListener("click", function (e) {
        e.stopPropagation(); 
        const mealId = this.getAttribute("data-id");
        const card = this.closest(".meal-card");
        showCardMessage(card, "Removed from favourites");
       
        window.favorites = window.favorites.filter(
          (fav) => fav.name !== mealId
        );

        renderFavourites();
        updateMainStars(); // sync main meals list
        if (window.updateFavBadge) window.updateFavBadge();
      });
    });
}

function showCardMessage(starElement, text) {

  const msg = document.createElement("div");
  msg.className = "card-message";
  msg.textContent = text;

  const rect = starElement.getBoundingClientRect();
  msg.style.position = "absolute";
  msg.style.top = `${rect.top + window.scrollY - 25}px`;
  msg.style.left = `${rect.left + window.scrollX + 25}px`;

  document.body.appendChild(msg);


  setTimeout(() => {
    msg.style.opacity = "0";
    setTimeout(() => msg.remove(), 300);
  }, 1500);
}


function attachFavoriteEvents() {
  document.querySelectorAll(".meals-list .favorite-icon").forEach((star) => {
    star.addEventListener("click", function (e) {
      e.stopPropagation(); // prevents opening modal
      const mealId = this.getAttribute("data-id");

      const meal = window.currentMeals.find((m) => m.name === mealId);
      if (!meal) return;
      let messageText = "";

      if (window.favorites.some((fav) => fav.name === meal.name)) {
        // Remove from favourites
        window.favorites = window.favorites.filter(
          (fav) => fav.name !== meal.name
        );
        messageText = "Removed from favourites";
      } else {
        // Add to favourites
        window.favorites.push(meal);
        messageText = "Added to favourites";
      }

      updateMainStars();
      renderFavourites();
      showCardMessage(this, messageText);
      if (window.updateFavBadge) window.updateFavBadge();
    });
  });
}

// Sync stars in main meals list
function updateMainStars() {
  document.querySelectorAll(".meals-list .favorite-icon").forEach((star) => {
    const mealId = star.getAttribute("data-id");
    if (window.favorites.some((fav) => fav.name === mealId)) {
      star.classList.remove("fa-regular");
      star.classList.add("fa-solid");
    } else {
      star.classList.remove("fa-solid");
      star.classList.add("fa-regular");
    }
  });
}

// Modal open/close logic

document.addEventListener('DOMContentLoaded', function() {
  const favBtn = document.querySelector('.nav-links button');
  const favModal = document.getElementById('favouritesModal');
  const closeFavBtn = document.getElementById('closeFavouritesBtn');
  const body = document.body;

  // Create badge element if not exists
  let badge = favBtn.querySelector('.fav-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'fav-badge';
    badge.style.display = 'none';
    favBtn.style.position = 'relative';
    favBtn.appendChild(badge);
  }
  // Helper to update badge
  function updateBadge() {
    if (window.favorites.length > 0) {
      badge.textContent = window.favorites.length;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }
  window.updateFavBadge = updateBadge;
  updateBadge();

  favBtn.addEventListener('click', function() {
    renderFavourites();
    favModal.classList.remove('hidden');
    favModal.style.opacity = '1';
    body.classList.add('body-modal-open'); 
    updateBadge();
  });

  closeFavBtn.addEventListener('click', function() {
    favModal.style.opacity = '0';
    setTimeout(() => {
      favModal.classList.add('hidden');
      body.classList.remove('body-modal-open'); 
      updateBadge();
    }, 400);
  });

  favModal.addEventListener('click', function(e) {
    if (e.target === favModal) {
      favModal.style.opacity = '0';
      setTimeout(() => {
        favModal.classList.add('hidden');
        body.classList.remov('body-modal-open');
        updateBadge();
      }, 400);
    }
  });
});

window.attachFavoriteEvents = attachFavoriteEvents;
window.renderFavourites = renderFavourites;
window.updateMainStars = updateMainStars;