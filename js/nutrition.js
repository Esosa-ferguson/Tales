let nutritionData = [];
let selections = {};

// Load JSON file
async function loadNutritionData() {
  const response = await fetch("nutrition.json");
  nutritionData = await response.json();
}

async function openModal() {
  if (nutritionData.length === 0) {
    await loadNutritionData();
  }

  document.getElementById("nutritionModal").classList.remove("hidden");
  document.getElementById("nutritionModal").style.display = "flex";
  // document.querySelector(".result").style.display = "none";
  const list = document.getElementById("ingredientsList");
  list.innerHTML = "";

  nutritionData.forEach((item, index) => {
    selections[index] = 0;

    // Create container for ingredient
    const div = document.createElement("div");
    div.className = "ingredient";

    // Name
    const nameSpan = document.createElement("span");
    nameSpan.textContent = `${item.name} (${item.amount})`;

    // Controls
    const controls = document.createElement("div");
    const minusBtn = document.createElement("button");
    minusBtn.textContent = "−";
    minusBtn.onclick = () => updateSelection(index, -1);

    const countSpan = document.createElement("span");
    countSpan.id = `count-${index}`;
    countSpan.textContent = "0";

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.onclick = () => updateSelection(index, 1);

    controls.appendChild(minusBtn);
    controls.appendChild(countSpan);
    controls.appendChild(plusBtn);

    // Put everything together
    div.appendChild(nameSpan);
    div.appendChild(controls);

    list.appendChild(div);
  });

  // Reset result box inside modal
  document.getElementById("resultBox").innerHTML = "";
}

function closeModal() {
  document.getElementById("nutritionModal").style.display = "none";
}

function updateSelection(index, change) {
  document.getElementById("resultBox").innerHTML = "";
  document.querySelector(".result").style.display = "block";

  (selections[index] || 0) + change;
  if (selections[index] < 0) selections[index] = 0;

  selections[index] = Math.max(0, selections[index] + change);
  document.getElementById(`count-${index}`).innerText = selections[index];
}

function calculateNutrition() {
  let total = { calories: 0, protein: 0, carbs: 0, fat: 0 };
  document.querySelector(".result").style.display = "block";
  nutritionData.forEach((item, index) => {
    let count = selections[index];
    total.calories += item.nutrition.calories * count;
    total.protein += item.nutrition.protein * count;
    total.carbs += item.nutrition.carbs * count;
    total.fat += item.nutrition.fat * count;
  });

  document.getElementById("resultBox").innerHTML = `
    <h3>Total Nutrition</h3>
    <p>Calories: ${total.calories} kcal</p>
    <p>Protein: ${total.protein} g</p>
    <p>Carbs: ${total.carbs}g</p>
       <p>Fat: ${total.fat}g</p>
        `;
  //resets all counts to 0
  nutritionData.forEach((item, index) => {
    selections[index] = 0;
    document.getElementById(`count-${index}`).innerText = "0";
  });
}
