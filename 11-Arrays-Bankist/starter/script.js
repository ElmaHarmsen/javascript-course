"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "premium",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "standard",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: "premium",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: "basic",
};

const accounts = [account1, account2, account3, account4];

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

// account movements
// better to pass data into a function, like this
// instead of working with global variables
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ""; // similar to textConent

  // create a copy of the array to sort with slice()
  const movementsSort = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  movementsSort.forEach(function (mov, index) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    // see MDN
    // insertAdjacentHTML > inserts html from js into DOM
    containerMovements.insertAdjacentHTML("afterbegin", html);
    // afterbegin reverses the order > new child elements will appear before other child elements that were already there
  });
};

// global balance
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance}€`;
};

// incomes & outgoings & interest
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// usernames
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(
        name => name[0] // first letter
      )
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (account) {
  // display movements
  displayMovements(account.movements);

  // display balance
  calcDisplayBalance(account);

  // display summary
  calcDisplaySummary(account);
};

// event handlers
let currentAccount;

btnLogin.addEventListener("click", function (event) {
  // prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // with optional chaining ?
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 1;

    // clear input fields
    // assignment operator reads from right to left
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // update UI
    updateUI(currentAccount);
  }
});

// transfer
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault(); // prevent a reload of the form
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // empty input fields
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }
});

// request loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value === "";
});

// close account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // delete account (until refresh page)
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  }

  // empty input fields
  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false; // state variable
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
  // ! does the opposite of the current state
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ["a", "b", "c", "d", "e"];

// SLICE
console.log(arr.slice(2)); // "c" untill the end
console.log(arr.slice(2, 4)); // "c", "d"
console.log(arr.slice(-2)); // "d", "e" from end of array
console.log(arr.slice(-1)); // "e"
console.log(arr.slice(1, -2)); // "b", "c"

console.log(arr.slice()); // shallow copy
console.log([...arr]); // shallow copy

// SPLICE - mutates array
// console.log(arr.splice(2)); // "c", "d", "e"
console.log(arr); // extracted elements gone

arr.splice(-1); // removes last element
console.log(arr);

arr.splice(1, 2); // starting at position 1, taking two elements
console.log(arr); // "a", "d"

// REVERSE - mutates array
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join("-")); // returns string

// PUSH
// UNSHIFT
// POP
// SHIFT
// INDEXOF
// INCLUDES

/////////////////////////////////////////////////

// AT METHOD (new)
const arr = [23, 11, 64];
console.log(arr[0]); // traditional method
console.log(arr.at(0)); // at method "array at position 0"

// getting the last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]); // returns copy of the array
console.log(arr.at(-1));

// at method also works with strings
console.log("Valefar".at(0)); // "V"

/////////////////////////////////////////////////
// Looping arrays: For Each
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
    // Math.abs removes the "-" before the number
  }
}

console.log("--- forEach ---");
// forEach is a higher-order function
// in each loop the forEach method executes the callback function
// in each iteration receives current element of the array as arg
// cannot break out of a forEach loop

// the order in which the arguments are passed into the function
// first parameter = current element
// second parameter = current index
// third parameter = array that the function loops over
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

/////////////////////////////////////////////////

// forEach with maps and sets
// map
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// set
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/

/////////////////////////////////////////////////
// CODING CHALLENGE #1
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀


const checkDogs = function (dogsJulia, dogsKate) {
  // create a shallow copy with .slice()
  const dogsJuliaCorrected = dogsJulia.slice();

  // mutate the array with .splice()
  dogsJuliaCorrected.splice(0, 1); // first
  dogsJuliaCorrected.splice(-2); // last two

  // merge the two arrays
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  // check if puppy or adult
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

/////////////////////////////////////////////////
// array.map() method
const eurToUsd = 1.1;

// uses a function to create a new array = functional programming
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(movements);
console.log(movementsUSD);

// arrow function > good for small callback functions
// const movementsUSD = movements.map(mov => mov * eurToUsd);

// loops over one array, and manually creates a new array
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescription);

/////////////////////////////////////////////////
// array.filter() method
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0; // boolean value
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

/////////////////////////////////////////////////
// array.reduce() method
console.log(movements);

// accumulator = current sum of all previous values
const balance = movements.reduce(function (acc, current, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + current;
}, 0);
// 0 = initial value of accumulator in the first loop iteration

const balance2 = movements.reduce((acc, current) => acc + current, 0);
console.log(balance2);

let balance3 = 0;
for (const mov of movements) balance3 += mov;
console.log(balance3);

// get maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

const calcAverageHumanAge = function (ages) {
  // #1
  const humanAges = ages.map(function (dogAge) {
    if (dogAge <= 2) return 2 * dogAge;
    else if (dogAge > 2) return 16 + dogAge * 4;
  });
  console.log(humanAges);

  //#2
  const adultDog = humanAges.filter(function (dogAge) {
    return dogAge >= 18;
  });
  console.log(adultDog);

  // #3
  const averageAge = adultDog.reduce(function (acc, age) {
    return acc + age / adultDog.length;
  }, 0);
  console.log(averageAge);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

///////////////////////////////////////
// Chaining methods = PIPELINE
// So long as the result is an array, methods can be chained
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUsd)
  .map((mov, i, arr) => {
    // console.log(arr); // current array = result of prev. method
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
const avg = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(avg);

///////////////////////////////////////
// array.find() method
// returns first element in array that matches a given condition
// returns the element, does not return an array
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === "Jessica Davis");
console.log(account);

///////////////////////////////////////
// findLast() and findLastIndex() methods (new)

// findLast() => looks from the end of the array
console.log(movements);
const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);

const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 1000
);
console.log(latestLargeMovementIndex);
console.log(`Your latest large movement was ${
  movements.length - latestLargeMovementIndex
} movements ago
`);


///////////////////////////////////////
// some and every

// includes => tests equality
console.log(movements);
console.log(movements.includes(-130)); // true

// some => test for a condition
console.log(movements.some(mov => mov === -130)); // true
const anyDeposits = movements.some(mov => mov > 0); // true
console.log(anyDeposits);

// every => checks if ALL elements match the given condition
console.log(movements.every(mov => mov > 0)); // false/true

// separate callback, reusable callback function, DRY
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////////////////////////
// flat() and flatmap() methods
const arr = [[1, 2, 3], [4, 5, 6], 7, 8]; // nested array
console.log(arr.flat()); // flattens the array

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(1)); // flattens, but only one level deep
console.log(arrDeep.flat(2)); // flattens two levels deep

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements); // nested array
const allMovements = accountMovements.flat();
console.log(allMovements);
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// chaining
const overallBalanceChain = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceChain);

// flatmap
// can only go one level deep
const overallBalanceChain2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceChain2);
*/

///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:

const breeds = [
  {
    breed: "German Shepherd",
    averageWeight: 32,
    activities: ["fetch", "swimming"],
  },
  {
    breed: "Dalmatian",
    averageWeight: 24,
    activities: ["running", "fetch", "agility"],
  },
  {
    breed: "Labrador",
    averageWeight: 28,
    activities: ["swimming", "fetch"],
  },
  {
    breed: "Beagle",
    averageWeight: 12,
    activities: ["digging", "fetch"],
  },
  {
    breed: "Husky",
    averageWeight: 26,
    activities: ["running", "agility", "swimming"],
  },
  {
    breed: "Bulldog",
    averageWeight: 36,
    activities: ["sleeping"],
  },
  {
    breed: "Poodle",
    averageWeight: 18,
    activities: ["agility", "fetch"],
  },
];

// 1
const huskyWeight = breeds.find(breed => breed.breed === "Husky").averageWeight;
console.log(huskyWeight);

// 2
const dogBothActivities = breeds.find(
  breed =>
    breed.activities.includes("running") && breed.activities.includes("fetch")
).breed;
console.log(dogBothActivities);

// 3
// const allActivities = breeds.map(breed => breed.activities).flat();
const allActivities = breeds.flatMap(breed => breed.activities);
console.log(allActivities);

// 4
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// 5
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter(breed => breed.activities.includes("swimming"))
      .flatMap(breed => breed.activities)
      .filter(activity => activity !== "swimming")
  ),
];
console.log(swimmingAdjacent);

// 6
console.log(breeds.every(breed => breed.averageWeight >= 10));

// 7
console.log(breeds.some(breed => breed.activities.length >= 3));

// BONUS
const fetchBreeds = breeds
  .filter(breed => breed.activities.includes("fetch"))
  .map(breed => breed.averageWeight);
const heaviestFetchBreed = Math.max(...fetchBreeds);
console.log(fetchBreeds);
console.log(heaviestFetchBreed);

///////////////////////////////////////
// Sorting arrays

// array.sort() => mutates original array
// converts everything to string

// strings
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort()); // sort by alphabet

// numbers
console.log(movements);
// console.log(movements.sort());

// return < 0; A, B (keep order)
// return > 0; B, A (switch order)

// Ascending order
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movements);

movements.sort((a, b) => a - b);
console.log(movements);

// Descending order
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
console.log(movements);

movements.sort((a, b) => b - a);
console.log(movements);

///////////////////////////////////////
// array grouping => group values in an array based on a given condition
console.log(movements);
const groupedMovements = Object.groupBy(movements, movement =>
  movement > 0 ? "deposits" : "withdrawals"
);
console.log(groupedMovements);

const groupedByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;

  if (movementCount >= 8) return "very active";
  if (movementCount >= 4) return "active";
  if (movementCount >= 1) return "moderate";
  return "inactive";
});
console.log(groupedByActivity);

// common usecase of grouping
// const groupedAccounts = Object.groupBy(accounts, account => account.type);
const groupedAccounts = Object.groupBy(accounts, ({ type }) => type);
console.log(groupedAccounts);

///////////////////////////////////////
// creating arrays programmatically

// empty arrays + fill() method
const x = new Array(7); // 7 empty elements
console.log(x);

x.fill(1); // fills array with 1s
x.fill(1, 3); // starts at index 3
console.log(x);

// Array.from()
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // _ = not using this parameter

const randomDiceRolls = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 6 + 1)
);
console.log(randomDiceRolls);

labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    el => Number(el.textContent.replace("€", "$"))
  );
  console.log(movementsUI);

  // const movementsUI2 = [...document.querySelectorAll(".movements__value")];
});

///////////////////////////////////////
// non-destructive alternatives => mutating arrays

// toReversed
console.log(movements);
const reversedMov = movements.reverse();
const reversedMov2 = movements.toReversed();
console.log(reversedMov);
console.log(reversedMov2);

// toSorted
// toSpliced

// with => change elements in an array
// movements[1] = 2000;
const newMovements = movements.with(1, 2000);
console.log(newMovements);

console.log(movements);
*/

///////////////////////////////////////
/* Which array methods to use?
What do I want with the array?
- mutate original 
- new array based on original
- array index
- array element
- if array includes
- new string
- transform to value
- loop array

///////////////////////////////////////
// Array methods practice
const bankDepositsSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositsSum);

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposits1000);

let a = 10;
console.log(a++); // 10
console.log(a); // 11
// ++ returns the old value

// Prefixed ++ operator
console.log(++a); // 11

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? "deposits" : "withdrawals"] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

const convertTitleCase = function (title) {
  const capitalise = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map(word => (exceptions.includes(word) ? word : capitalise(word)))
    .join(" ");
  return capitalise(titleCase);
};
console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is antoher title with an EXAMPLE"));
*/

///////////////////////////////////////
// Coding Challenge #5

/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John", "Leo"] },
  { weight: 18, curFood: 244, owners: ["Joe"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1
dogs.forEach(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2
const dogSarah = dogs.find(dog => dog.owners.includes("Sarah"));
console.log(
  `Sarah's dog eats too ${
    dogSarah.curFood > dogSarah.recFood ? "much" : "little"
  }`
);

// 3
const ownersTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersTooMuch);
const ownersTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersTooLittle);

// 4
console.log(`${ownersTooMuch.join(" and ")}'s dogs are eating too much`);
console.log(`${ownersTooLittle.join(" and ")}'s dogs are eating too little`);

// 5
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6
const checkFoodOkay = dog =>
  dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9;

console.log(dogs.every(checkFoodOkay));

// 7
const dogsFoodOkay = dogs.filter(checkFoodOkay);
console.log(dogsFoodOkay);

// 8
const dogsGroupedByPortion = Object.groupBy(dogs, dog => {
  if (dog.curFood > dog.recFood) {
    return "too much";
  } else if (dog.curFood < dog.recFood) {
    return "too little";
  } else {
    return "exact";
  }
});
console.log(dogsGroupedByPortion);

// 9
const dogsGroupedByOwners = Object.groupBy(dogs, dog => {
  `${dog.owners.length}-owners`;
});
console.log(dogsGroupedByOwners);

// 10
const dogsSorted = dogs.toSorted((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
*/
