  // Hamburger menu JS
  document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    hamburgerBtn.addEventListener('click', function() {
      const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
    });
  });