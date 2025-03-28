"use strict";

// Math.random() => between 0 and 1 with decimals
// Math.random() * 20 => between 0 and 19 with decimals, excl. 20
// Math.random() * 20 + 1 => between 1 and 20 with decimals
// Math.trunc() => removes decimals
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// application state data
let score = 20;

// high score
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

// Handling click events
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  // Empty guess = 0 (falsy value)
  // Invert falsy to truthy value with ! (Logical NOT operator)
  // First scenario assumes no input
  if (!guess) {
    displayMessage("❌ No number!");

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage("⚡Correct Number!");
    document.querySelector(".number").textContent = secretNumber;

    // Change the style of html elements => inline style
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    // Set highscore if score is higher than current highScore
    if (score > highScore) {
      highScore = score; // score becomes highScore
      document.querySelector(".highscore").textContent = highScore;
    }
  }
  // Refactoring code - when guess is different to number
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "⬆️ Too high!" : "⬇️ Too low!");
      score--; // score = score - 1
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("💥 You lost the game!");
      document.querySelector(".score").textContent = 0;
    }
  }

  /* When guess is too high 
  else if (guess > secretNumber) {
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
  } */
});

// CODING CHALLENGE #1
/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)
*/

document.querySelector(".again").addEventListener("click", function () {
  // Reset the let variables
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
