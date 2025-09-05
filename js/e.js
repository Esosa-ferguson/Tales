/* ===== TEAM AUTO-SLIDER ===== */
const track = document.querySelector(".slide-track");
const slides = document.querySelectorAll(".slide");
let index = 0;

function slideWidthWithMargin() {
  return slides[0].offsetWidth + 30;
}
function updateSlidePosition() {
  track.style.transform = `translateX(-${index * slideWidthWithMargin()}px)`;
}
function autoSlide() {
  const visible =
    window.innerWidth <= 640 ? 1 : window.innerWidth <= 990 ? 2 : 3;
  if (index < slides.length - visible) {
    index++;
  } else {
    index = 0;
  }
  updateSlidePosition();
}
window.addEventListener("load", updateSlidePosition);
window.addEventListener("resize", updateSlidePosition);
setInterval(autoSlide, 3000);

/* ===== STAR RATING + SUBMIT ===== */
const stars = document.querySelectorAll("#stars span");
const reviewText = document.getElementById("reviewText");
const submitBtn = document.getElementById("submitReview");
const reviewMessage = document.createElement("p");
reviewMessage.className = "message";
submitBtn.insertAdjacentElement("afterend", reviewMessage);

let rating = 0;
stars.forEach((star) => {
  star.addEventListener("click", () => {
    rating = Number(star.getAttribute("data-value"));
    stars.forEach((s) => s.classList.remove("active"));
    for (let i = 0; i < rating; i++) stars[i].classList.add("active");
  });
});

submitBtn.addEventListener("click", () => {
  reviewMessage.style.display = "block";
  if (!reviewText.value.trim()) {
    reviewMessage.textContent = "Please input a review";
    reviewMessage.className = "message error";
    reviewMessage.setAttribute('aria-live', 'assertive');
  } else {
    reviewMessage.textContent = "Thank you for giving a review!";
    reviewMessage.className = "message success";
    reviewMessage.setAttribute('aria-live', 'polite');
    reviewText.value = "";
    rating = 0;
    stars.forEach((s) => s.classList.remove("active"));
  }
  setTimeout(() => {
    reviewMessage.style.display = "none";
  }, 3000);
});
