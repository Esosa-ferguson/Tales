document.addEventListener('DOMContentLoaded', function () {
    const mealsList = document.querySelector('.meals-list');

    const observer = new MutationObserver(function () {
        const cards = mealsList.querySelectorAll('.meal-card');
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s, transform 0.2s';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + i * 100); 
        });
    });

    observer.observe(mealsList, { childList: true });
});



// Swiper for About Us Section (if you want a swipe effect for About Us)
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.about-slide');
  const prevBtn = document.getElementById('aboutPrev');
  const nextBtn = document.getElementById('aboutNext');
  let current = 0;
  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
  }
  prevBtn.onclick = function() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  };
  nextBtn.onclick = function() {
    current = (current + 1) % slides.length;
    showSlide(current);
  };
  // Touch swipe support
  let startX = null;
  const swiper = document.querySelector('.about-swiper');
  if (swiper) {
    swiper.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    });
    swiper.addEventListener('touchend', function(e) {
      if (startX !== null) {
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) prevBtn.click();
        else if (startX - endX > 50) nextBtn.click();
        startX = null;
      }
    });
  }
  showSlide(current);
});
