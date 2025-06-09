"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2025-06-02T17:01:17.194Z",
    "2025-06-05T23:36:17.929Z",
    "2025-06-08T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "en-GB",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, "0");
    // const month = `${date.getMonth() + 1}`.padStart(2, "0");
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

// Reusable function to format value for locale and currency
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  // Combine movement with date
  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));

  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? "deposit" : "withdrawal";

    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date, acc.locale);

    // const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(movement, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 sec, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    // Decrease 1 sec
    time--;
  };

  // Set time to 5 mins
  let time = 120;

  // Call the timer every sec
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: "long",
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, "0");
    // const month = `${now.getMonth() + 1}`.padStart(2, "0");
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, "0");
    // const min = `${now.getMinutes()}`.padStart(2, "0");
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// Converting and Checking Numbers
console.log(23 === 23.0); // true

// Base 10 = 0 to 9
// Binary base 2 = 0 and 1
console.log(0.1 + 0.2); // 0.300...04

console.log(Number("23"));
console.log(+"23"); // + does type coersion

// Parsing
console.log(Number.parseInt("30px"), 10); // 30
console.log(Number.parseInt("px30"), 10); // NaN
// 10 = Base 10

// Useful when reading CSS
console.log(Number.parseFloat("2.5rem")); // 2.5
console.log(Number.parseInt("2.5rem")); // 2

console.log(parseFloat("2.5rem")); // 2.5

// Check if value is NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN("20")); // false
console.log(Number.isNaN(+"20px")); // true
console.log(Number.isNaN(23 / 0)); // false (Infinity)

// Checking if value is number > GO TO METHOD
console.log("--- isFinite ---");
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite("20")); // false
console.log(Number.isFinite(+"20px")); // false
console.log(Number.isFinite(23 / 0)); // false

console.log(Number.isInteger(20)); // true
console.log(Number.isInteger(20.0)); // true
console.log(Number.isInteger(23 / 0)); // false

/////////////////////////////////////////////////
// Math and Rounding
console.log(Math.sqrt(25)); // square root
console.log(25 ** (1 / 2)); // also square root (2 = square)
console.log(8 ** (1 / 3)); // cubic root

console.log(Math.max(5, 18, 23, 11, 2)); // maximum value
console.log(Math.max(5, 18, "23", 11, 2)); // maximum value
console.log(Math.max(5, 18, "23px", 11, 2)); // NaN

console.log(Math.min(5, 18, "23px", 11, 2)); // minimum value

// calculate radius
console.log(Math.PI * Number.parseFloat("10px") ** 2);

// random
console.log(Math.random()); // 0 - 1
console.log(Math.trunc(Math.random() * 6) + 1); // 1 - 6

// create a random number between 0 and 1.9 (bcs of * 2)
// Math.floor rounds number to 1
// const randomInt = (min, max) => Math.floor(Math.random() * 2);

// dynamic range of numbers
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
console.log(randomInt(10, 20)); // 11 numbers (incl. 10 and 20)
console.log(randomInt(0, 3)); // 4 numbers (incl. 0 and 3)

// rounding integers
console.log(Math.trunc(23.3)); // 23
console.log(Math.round(23.9)); // 24
console.log(Math.ceil(23.9)); // 24
console.log(Math.ceil(23.3)); // 24
console.log(Math.floor(23.9)); // 23

console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24

// rounding decimals
console.log((2.7).toFixed(0)); // "3"
console.log((2.7).toFixed(3)); // "2.700"
console.log((2.345).toFixed(2)); // "2.35"
console.log(+(2.345).toFixed(2)); // 2.35

/////////////////////////////////////////////////
// The Remainder Operator
console.log(5 % 2); // 1
console.log(5 / 2); // 2.5 (5 = 2 * 2 + 1)
console.log(8 % 3); // 2
console.log(8 / 3); // 2.6 (8 = 2 * 3 + 2)

console.log(6 % 2); // 0
console.log(6 / 2); // 3

console.log(7 % 2); // 1
console.log(7 / 2); // 3.5

// check even of uneven
const isEven = n => n % 2 === 0;
console.log(isEven(8)); // true
console.log(isEven(23)); // false
console.log(isEven(514)); // true

// for every Nth time
labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    // every 2nd row
    if (i % 2 === 0) row.style.backgroundColor = "orangered";

    // every 3rd row
    if (i % 3 === 0) row.style.backgroundColor = "blue";
  });
});

/////////////////////////////////////////////////
// Numeric separators

// 287,460,000,000 = thousand separator
const diameter = 287_460_000_000;
console.log(diameter); // js ignores _

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.1415; // cannot do 3._1415
console.log(PI);

// do not use _ in strings
console.log(Number("230_000")); // NaN
console.log(parseInt("230_000")); // 230

/////////////////////////////////////////////////
// Working with Bigint
console.log(2 ** 53 - 1);
// 2 = base 2
// 53 = 53 out of 64 bits are used to describe a number using 0 1
// biggest number js can safely represent 9007199254740991

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

console.log(4838430248342043823408394839483204n);
// n transfer big number to bigInt
console.log(BigInt(48384302));

// Operations with bigInt
console.log(10000n + 10000n); // 20000n

// do not mix bigInt with regular numbers
const huge = 20289830237283728378237n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15); // true
console.log(20n === 20); // false
// values have different primitive type (bigInt and regular number), js does not do typecoersion with ===
console.log(typeof 20n); // bigint
console.log(20n == "20"); // true

console.log(huge + " is REALLY big!!!");

// Divisions
console.log(10n / 3n); // 3n
console.log(11n / 3n); // 3n
console.log(14n / 3n); // 4n

/////////////////////////////////////////////////
// Creating dates and times

// Four ways to create a date
const now = new Date();
console.log(now);

console.log(new Date("Jun 09 2025 10:23:46"));
console.log(new Date("December 24, 2015"));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
// months in js are 0-based

console.log(new Date(2037, 10, 31)); // Dec 1
// autocorrects

console.log(new Date(0)); // Thu Jan 01 1970 01:00:00 GMT+0100
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days later
// convert from days to miliseconds > timestamp = 259200000

// working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear); // 2037
console.log(future.getMonth); // 10, 0 based
console.log(future.getDate); // 19
console.log(future.getDay); // 4
console.log(future.getHours); // 15
console.log(future.getMinutes); // 23
console.log(future.getSeconds); // 0
console.log(future.toISOString()); // 2037-11-19T14:23:00.000Z
console.log(future.getTime()); // 2142253380000

// timestamp since Jan 1 1970
console.log(new Date(2142253380000)); // gives the same time

console.log(Date.now());

future.setFullYear(2040);
console.log(future); // Mon Nov 19 2040 15:23:00

/////////////////////////////////////////////////
// Operations with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future));

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);

/////////////////////////////////////////////////
// Internationalizing dates
// get locale from user browser
// const locale = navigator.language;

// Internationalizing numbers
const num = 3884764.23;

const options = {
  style: "unit", // unit // percent // currency
  unit: "mile-per-hour",
  currency: "EUR", // not implied from locale
  useGrouping: true,
};

console.log("US:", new Intl.NumberFormat("en-US", options).format(num));
console.log("Germany:", new Intl.NumberFormat("de-DE", options).format(num));
console.log("Syria:", new Intl.NumberFormat("ar-SY", options).format(num));
console.log("Sweden:", new Intl.NumberFormat("sv-SE", options).format(num));
console.log(
  "Browser:",
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/

/////////////////////////////////////////////////
// Timers: Settimeout and Setinterval
// Settimeout timer > runs once after a defined time
// Setinterval timer > runs indefinetly until stopped

// Scheduling a function call
const ingredients = ["olives", "spinach"];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}🍕`),
  3000,
  ...ingredients
);

// Timeout does not stop executing code after = asyncronous js
console.log("Waiting...");

// Cancel a timer
if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);

// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);
