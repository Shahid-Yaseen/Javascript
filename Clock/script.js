"use strict";
const fullBody = document.getElementsByTagName("body");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

function timer() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  hours.textContent = h;
  minutes.textContent = m;
  seconds.innerHTML = s;
  setTimeout(() => {
    timer();
  }, 1000);
}

timer();
