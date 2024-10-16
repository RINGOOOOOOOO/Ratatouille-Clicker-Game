let money = 0;
let dishes = [
  {
    name: "Lightning-y Mushroom Puffs",
    price: 1,
    time: 10,
    level: 1,
    unlocked: true,
    progress: 0,
    unlockCost: 0,
    description:
      "Crispy, electrifying mushroom bites that'll make your taste buds dance!",
    image: "recipe1.webp",
  },
  {
    name: "Rémy's Soup",
    price: 10,
    time: 15,
    level: 1,
    unlocked: false,
    progress: 0,
    unlockCost: 10,
    description:
      "A heartwarming soup that captures the essence of Rémy's culinary passion.",
    image: "recipe2.webp",
  },
  {
    name: "Ratatouille",
    price: 50,
    time: 30,
    level: 1,
    unlocked: false,
    progress: 0,
    unlockCost: 50,
    description:
      "The classic French vegetable dish that stole the heart of food critic Anton Ego.",
    image: "recipe3.webp",
  },
  {
    name: "Synesthesia Cheese Plate",
    price: 200,
    time: 45,
    level: 1,
    unlocked: false,
    progress: 0,
    unlockCost: 200,
    description:
      "A selection of cheeses that creates a symphony of flavors in your mouth.",
    image: "recipe4.webp",
  },
  {
    name: "Chocolate Souffle Omelette",
    price: 500,
    time: 60,
    level: 1,
    unlocked: false,
    progress: 0,
    unlockCost: 500,
    description:
      "A decadent fusion of light, fluffy omelette and rich chocolate souffle.",
    image: "recipe5.webp",
  },
];

let chefs = [
  {
    name: "Rémy",
    unlocked: true,
    level: 1,
    speedBonus: 0.01,
    unlockCost: 0,
    upgradeCost: 100,
    description: "A talented rat with an exceptional sense of smell and taste.",
    image: "remy.jpeg",
  },
  {
    name: "Linguini",
    unlocked: false,
    level: 0,
    speedBonus: 0.05,
    unlockCost: 20,
    upgradeCost: 300,
    description: "A clumsy but kind-hearted garbage boy turned chef.",
    image: "linguini.jpeg",
  },
  {
    name: "Émile",
    unlocked: false,
    level: 0,
    speedBonus: 0.1,
    unlockCost: 1000,
    upgradeCost: 600,
    description: "Rémy's brother with a less refined palate but a big heart.",
    image: "emile.jpeg",
  },
  {
    name: "Colette",
    unlocked: false,
    level: 0,
    speedBonus: 0.1,
    unlockCost: 1000,
    upgradeCost: 1000,
    description: "A tough and talented chef, the only woman in the kitchen.",
    image: "colette.jpeg",
  },
];

const cookMessages = [
  "Add a pinch of salt",
  "Stir it up",
  "Flip it over",
  "Turn up the heat",
  "Taste it",
  "Garnish with herbs",
];

// Game loop
function gameLoop() {
  dishes.forEach((dish, index) => {
    if (dish.unlocked) {
      dish.progress += getProductionSpeed();
      if (dish.progress >= dish.time) {
        money += dish.price * dish.level;
        dish.progress = 0;
        updateMoney();
      }
      updateProgressBar(index);
    }
  });
  checkUnlocks();
}

// Get production speed considering chef bonuses
function getProductionSpeed() {
  let speed = 1;
  chefs.forEach((chef) => {
    if (chef.unlocked) {
      speed += chef.speedBonus * chef.level;
    }
  });
  return speed;
}

// Update money display
function updateMoney() {
  document.querySelector("#money").textContent = `Money: ${money}`;
}

// Update progress bar for a dish
function updateProgressBar(index) {
  const progressBar = document.querySelector(`#dish${index + 1} .progress-bar`);
  const progress = (dishes[index].progress / dishes[index].time) * 100;
  progressBar.style.width = `${progress}%`;
}

// Update dish display
function updateDishDisplay(index) {
  const dishElement = document.querySelector(`#dish${index + 1}`);
  const dish = dishes[index];
  const actualPrice = dish.price * dish.level;

  if (dish.unlocked) {
    dishElement.classList.remove("locked");
    dishElement.innerHTML = `
          <span>${dish.name} -- $${actualPrice} (Level ${dish.level})</span>
          <div class="progress-bar"></div>
          <button onclick="upgradeDish(${index})">Upgrade (cost: $${getUpgradeCost(
      index
    )})</button>
        `;
  } else if (money >= dish.unlockCost) {
    dishElement.classList.remove("locked");
    dishElement.innerHTML = `
          <span>${dish.name}</span>
          <button onclick="unlockDish(${index})">Unlock (cost: $${dish.unlockCost})</button>
        `;
  } else {
    dishElement.classList.add("locked");
    dishElement.innerHTML = `
          <span>${dish.name} (locked)</span>
        `;
  }
}

// Unlock dish
function unlockDish(index) {
  const dish = dishes[index];
  if (money >= dish.unlockCost) {
    money -= dish.unlockCost;
    dish.unlocked = true;
    updateMoney();
    updateDishDisplay(index);
    showUnlockMessage(dish);
  } else {
    alert("Not enough money to unlock this recipe!");
  }
}

// Show unlock message
function showUnlockMessage(dish) {
  const dialog = document.querySelector(".dialog");
  dialog.innerHTML = `
      <h3>New Dish Unlocked: ${dish.name}</h3>
      <img src="${dish.image}" alt="${dish.name}" style="width: 200px; height: auto;">
      <p>${dish.description}</p>
    `;
  dialog.style.display = "block";
  setTimeout(() => {
    dialog.style.display = "none";
  }, 5000);
}

// Get upgrade cost for a dish
function getUpgradeCost(index) {
  return Math.floor(dishes[index].price * 2 * dishes[index].level);
}

// Upgrade dish
function upgradeDish(index) {
  const upgradeCost = getUpgradeCost(index);
  if (money >= upgradeCost) {
    money -= upgradeCost;
    dishes[index].level++;
    dishes[index].price = Math.floor(dishes[index].price * 1.5);
    updateMoney();
    updateDishDisplay(index);
    showUpgradeMessage(dishes[index]);
  } else {
    alert("Not enough money to improve this dish!");
  }
}

// add showUpgradeMessage func
function showUpgradeMessage(dish) {
  const dialog = document.querySelector(".dialog");
  dialog.innerHTML = `
        <h3>Upgrade: ${dish.name}</h3>
        <img src="${dish.image}" alt="${
    dish.name
  }" style="width: 200px; height: auto;">
        <p>${dish.description}</p>
        <p>Level: ${dish.level}</p>
        <p>New price: $${dish.price * dish.level}</p>
      `;
  dialog.style.display = "block";
  setTimeout(() => {
    dialog.style.display = "none";
  }, 5000);
}

// Cook button click handler
function cookClick() {
  dishes.forEach((dish, index) => {
    if (dish.unlocked) {
      dish.progress += 1;
      if (dish.progress >= dish.time) {
        money += dish.price * dish.level;
        dish.progress = 0;
        updateMoney();
      }
      updateProgressBar(index);
    }
  });
  showRandomCookMessage();
}

// Show random cook message
function showRandomCookMessage() {
  const cookArea = document.querySelector("#cook");
  const message = cookMessages[Math.floor(Math.random() * cookMessages.length)];
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.classList.add("cook-message");
  cookArea.appendChild(messageElement);
  setTimeout(() => {
    messageElement.remove();
  }, 5000);
}

// Update chef display
function updateChefDisplay(index) {
  const chefElement = document.querySelector(`#chef${index + 1}`);
  const chef = chefs[index];

  if (chef.unlocked) {
    chefElement.classList.remove("locked");
    chefElement.innerHTML = `
          <span>${chef.name} (Level ${chef.level})</span>
          <button onclick="upgradeChef(${index})">Upgrade (cost: $${chef.upgradeCost})</button>
        `;
  } else if (money >= chef.unlockCost) {
    chefElement.classList.remove("locked");
    chefElement.innerHTML = `
          <span>${chef.name}</span>
          <button onclick="unlockChef(${index})">Unlock (cost: $${chef.unlockCost})</button>
        `;
  } else {
    chefElement.classList.add("locked");
    chefElement.innerHTML = `
          <span>${chef.name} (locked)</span>
        `;
  }
}

// Unlock chef
function unlockChef(index) {
  const chef = chefs[index];
  if (money >= chef.unlockCost) {
    money -= chef.unlockCost;
    chef.unlocked = true;
    chef.level = 1;
    updateMoney();
    updateChefDisplay(index);
    showUnlockChefMessage(chef);
  } else {
    alert("Not enough money to hire this chef!");
  }
}

// Show unlock chef message
function showUnlockChefMessage(chef) {
  const dialog = document.querySelector(".dialog");
  dialog.innerHTML = `
      <h3>New chef recruited: ${chef.name}</h3>
      <img src="${chef.image}" alt="${
    chef.name
  }" style="width: 200px; height: auto;">
      <p>${chef.description}</p>
      <p>Speed bonus: ${chef.speedBonus * 100}%</p>
    `;
  dialog.style.display = "block";
  setTimeout(() => {
    dialog.style.display = "none";
  }, 5000);
}

// Upgrade chef
function upgradeChef(index) {
  const chef = chefs[index];
  if (money >= chef.upgradeCost) {
    money -= chef.upgradeCost;
    chef.level++;
    chef.upgradeCost = Math.floor(chef.upgradeCost * 1.5);
    updateMoney();
    updateChefDisplay(index);
    showUpgradeChefMessage(chef);
  } else {
    alert("Not enough money to train this chef!");
  }
}

// Show upgrade chef message
function showUpgradeChefMessage(chef) {
  const dialog = document.querySelector(".dialog");
  dialog.innerHTML = `
        <h3>Chef Upgraded! ${chef.name}</h3>
        <p>New level: ${chef.level}</p>
        <p>Speed bonus: ${chef.speedBonus * chef.level * 100}%</p>
      `;
  dialog.style.display = "block";
  setTimeout(() => {
    dialog.style.display = "none";
  }, 5000);
}

// Check for unlocks
function checkUnlocks() {
  dishes.forEach((dish, index) => {
    if (!dish.unlocked && money >= dish.unlockCost) {
      updateDishDisplay(index);
    }
  });
  chefs.forEach((chef, index) => {
    if (!chef.unlocked && money >= chef.unlockCost) {
      updateChefDisplay(index);
    }
  });
}

// Initialize game
function initGame() {
  updateMoney();
  dishes.forEach((dish, index) => {
    updateDishDisplay(index);
  });
  chefs.forEach((chef, index) => {
    updateChefDisplay(index);
  });
  checkUnlocks(); // Add this line to check unlocks at game start
  document.querySelector("#cook").addEventListener("click", cookClick);
  setInterval(gameLoop, 1000);
}
// Start the game when the page loads
window.onload = initGame;
