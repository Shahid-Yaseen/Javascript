"use strict";
let score = 20;
let highScore = 0;
let number = Math.trunc(Math.random() * 20) + 1;

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    document.querySelector(".message").textContent = "😖 Please select a value";
  } else if (guess === number) {
    document.querySelector(".message").textContent = "🎉Correct Number";
    document.querySelector(".number-box").textContent = number;
    document.querySelector(".full").style.backgroundColor = "green";
    document.querySelector(".number-box").style.width = "160px";
    if (score > highScore) {
      highScore = score;
      document.querySelector(".hScore").textContent = highScore;
    }
  } else if (guess > number) {
    if (score > 0) {
      document.querySelector(".message").textContent = "📈 Too High";
      score--;
      document.querySelector(".sScore").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You lost the Game 🔃";
    }
  } else if (guess < number) {
    if (score > 0) {
      document.querySelector(".message").textContent = "📉 Tow Low";
      score--;
      document.querySelector(".sScore").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You lost the Game 🔃";
    }
  }
});
document.querySelector(".again").addEventListener("click", function () {
  number = Math.trunc(Math.random() * 20) + 1;

  score = 20;
  document.querySelector(".message").textContent = "Start Guessing....";
  document.querySelector(".full").style.backgroundColor = "#000";
  document.querySelector(".guess").value = "";
  document.querySelector(".sScore").textContent = score;
  document.querySelector(".number-box").textContent = "?";
  document.querySelector(".number-box").styel.width = "80px";
});
