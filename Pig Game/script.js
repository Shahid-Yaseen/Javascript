"use strict";
const player0Score = document.querySelector(".player0-score");
const diceEl = document.querySelector(".dice");
const player1Score = document.querySelector(".player1-score");
const currentScore0 = document.querySelector(".current-score0");
const newBtn = document.querySelector(".btn-new");
const rollBtn = document.querySelector(".btn-roll");
const holdBtn = document.querySelector(".btn-hold");
const swic = function () {
  score = 0;
  document.querySelector(`.current-score${activePlayer}`).textContent = score;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(".player0").classList.toggle("active-player");
  document.querySelector(".player1").classList.toggle("active-player");
};

let playing, activePlayer, score, scores;
const initi = function () {
  playing = true;
  document.querySelector(`.player0`).classList.remove("winner");
  document.querySelector(`.player1`).classList.remove("winner");
  document.querySelector(`.current0`).textContent = "Current";
  document.querySelector(`.current0`).textContent = "Current";
  document.querySelector(`.current-score0`).textContent = 0;
  document.querySelector(`.current-score1`).textContent = 0;
  diceEl.classList.add("hidden");
  player0Score.textContent = 0;
  player1Score.textContent = 0;

  activePlayer = 0;
  scores = [0, 0];
  score = 0;
};
initi();

rollBtn.addEventListener("click", function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      diceEl.classList.remove("hidden");
      score += dice;
      document.querySelector(`.current-score${activePlayer}`).textContent =
        score;
    } else {
      swic();
    }
  }
});
holdBtn.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += score;
    document.querySelector(`.player${activePlayer}-score`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      console.log(activePlayer)
      document.querySelector(`.player${activePlayer}`).classList.add("winner");
      document.querySelector(`.current${activePlayer}`).textContent =
        "🎊 winner";
      playing = false;
    } 
    else {
      swic();
    }
  }
});
newBtn.addEventListener("click", initi);
