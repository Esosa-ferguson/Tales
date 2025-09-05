window.addEventListener('load', function() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.transition = 'opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1)';
    loader.style.opacity = '0';
    loader.style.transform = 'scale(4)';
    setTimeout(() => loader.style.display = 'none', 700);
  }
});