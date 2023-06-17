"use strict";
const account1 = {
  owner: "Shahid Khan Bangash",
  pin: 1111,
  movement: [120, -234, 563, 2232, 7654, -1200, 1500, -750],
  interestRate: 1.5,
};
const account2 = {
  owner: "Waseem Bangash",
  pin: 2222,
  movement: [132, 2490, -540, 2000, -750, 1100],
  interestRate: 1.1,
};
const account3 = {
  owner: "Kashif Ahmad",
  pin: 3333,
  movement: [90, 150, 390, -70, 60, 1100, 25000, -710],
  interestRate: 0.7,
};
const account4 = {
  owner: "Muhammad Yasin",
  pin: 4444,
  movement: [110, 230, -630, 290, 760, 37000, -1200],
  interestRate: 0.9,
};
const accounts = [account1, account2, account3, account4];

const movementContainor = document.querySelector(".movements-box");
const labelbalance = document.querySelector(".current-balance-value");
const labelIncome = document.querySelector(".income");
const labelOutcome = document.querySelector(".outcome");
const labelInterest = document.querySelector(".interest");
const labelUserName = document.querySelector(".user-name");
const loginBtn = document.querySelector(".btn-login");
const userPin = document.querySelector(".user-pin");
const transferBtn = document.querySelector(".transfer-money-btn");
const loanBtn = document.querySelector(".request-loat-btn");
const closeBtn = document.querySelector(".close-account-btn");
const transferMoneyInput = document.querySelector(".transfer-money-input");
const transferMoneyInputValue = document.querySelector(
  ".transfer-money-input-value"
);
const labelWelcome = document.querySelector(".welcome-text");
const loanInput = document.querySelector(".loan-money-input-value");
const closeUserInput = document.querySelector(".close-account-user-input");
const closePinInput = document.querySelector(".close-account-pin-input");
const displaySection = document.querySelector("section");
const sortBtn = document.querySelector(".sort-btn");

//movementFunction
function movementFunction(movements) {
  movements.forEach(function (mov, i) {
    const html = `<div class="movement">
        <div class="deposit-movement">
           <p class=" ${mov < 0 ? "withdraw" : "deposit"}-label">${i + 1} ${
      mov < 0 ? "withdraw" : "deposit"
    }</p>
           <p class=" ${mov < 0 ? "withdraw" : "deposit"}-value">${mov}💲</p>
        </div
      </div>`;
    movementContainor.insertAdjacentHTML("afterbegin", html);
  });
}

//User Name
accounts.forEach(function (acc, i) {
  acc.userName = acc.owner
    .toLowerCase()
    .split(" ")
    .map((names) => names[0])
    .join("");
});

//current balance
const ui = function (acc) {
  currentAccount.balance = currentAccount.movement.reduce(function (acc, mov) {
    return (acc += mov);
  }, 0);
  labelbalance.textContent = currentAccount.balance;

  //income
  const income = currentAccount.movement.filter(function (mov, i) {
    return mov > 0;
  });
  const incomeValue = income.reduce(function (acc, mov) {
    return (acc += mov);
  }, 0);
  labelIncome.textContent = Number(incomeValue);

  //Outcome
  const outcome = currentAccount.movement.filter(function (mov, i) {
    return mov < 0;
  });
  const outcomeValue = outcome.reduce(function (acc, mov) {
    return (acc += mov);
  }, 0);
  labelOutcome.textContent = Math.abs(outcomeValue);

  //interest
  const interest = currentAccount.movement
    .map((mov) => mov * 0.1)
    .reduce((acc, mov) => (acc += mov), 0);
  labelInterest.textContent = interest;
};
//login
let currentAccount;
loginBtn.addEventListener("click", function () {
  currentAccount = accounts.find((acc) => acc.userName === labelUserName.value);

  if (currentAccount.userName === labelUserName.value) {
    if (currentAccount.pin === Number(userPin.value)) {
      movementFunction(currentAccount.movement);
      ui(currentAccount);
      //welcome
      labelWelcome.textContent = `WELCOME ${currentAccount.owner}`;
      document.querySelector("section").style.opacity = 100;
      document.querySelector("section").style.pointerEvents = "all";
    }
  }
  labelUserName.value = userPin.value = "";
});

//transfer money
transferBtn.addEventListener("click", function () {
  if (
    accounts.find((acc) => acc.userName === transferMoneyInput.value) &&
    currentAccount.userName !== transferMoneyInput.value
  ) {
    currentAccount.movement.push(-Number(transferMoneyInputValue.value));
    accounts
      .find((acc) => acc.userName === transferMoneyInput.value)
      .movement.push(Number(transferMoneyInputValue.value));
      movementContainor.innerHTML="";
    movementFunction(currentAccount.movement);
    ui(currentAccount);
    transferMoneyInput.value = transferMoneyInputValue.value = "";
  } else {
    const html = `<p>not selected</p>`;
    movementContainor.insertAjacentHTML("afterend", "html");
  }
});

//loan
loanBtn.addEventListener("click", function () {
  if (currentAccount.movement.some((mov) => mov > 1000)) {
    currentAccount.movement.push(loanInput.value);
    movementContainor.innerHTML="";
    movementFunction(currentAccount.movement);
    ui(currentAccount);
  }
  loanInput.value = "";
});

//close account
closeBtn.addEventListener("click", function () {
  if (
    closeUserInput.value === currentAccount.userName &&
    Number(closePinInput.value) === currentAccount.pin
  );
  let index = accounts.findIndex(
    (acc) => acc.userName === currentAccount.userName
  );
  accounts.splice(index, index + 1);
  closePinInput.value = closeUserInput.value = "";
  displaySection.style.opacity = "0";
  displaySection.style.pointerEvents = "none";
  labelWelcome.textContent = "login to get started";
});
