"use strict";

/*
// Selecting elements
console.log(document.querySelector(".message").textContent);

// Set element content
document.querySelector(".message").textContent = "⚡Correct Number!";

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 10;

// Get input value
document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value);
*/

// Math.random() => between 0 and 1 with decimals
// Math.random() * 20 => between 0 and 19 with decimals, excl. 20
// Math.random() * 20 + 1 => between 1 and 20 with decimals
// Math.trunc() => removes decimals
const secretNumber = Math.trunc(Math.random() * 20) + 1;

// application state data
let score = 20;
document.querySelector(".number").textContent = secretNumber;

// Handling click events
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  // Empty guess = 0 (falsy value)
  // Invert falsy to truthy value with ! (Logical NOT operator)
  // First scenario assumes no input
  if (!guess) {
    document.querySelector(".message").textContent = "❌ No number!";

    // When player wins
  } else if (guess === secretNumber) {
    document.querySelector(".message").textContent = "⚡Correct Number!";

    // Change the style of html elements => inline style
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    // When guess is too high
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "⬆️ Too high!";
      score--; // score = score - 1
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "💥 You lost the game!";
      document.querySelector(".score").textContent = 0;
    }

    // When guess is too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "⬇️ Too low!";
      score--; // score = score - 1
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "💥 You lost the game!";
      document.querySelector(".score").textContent = 0;
    }
  }
});
