"use strict";

/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // default values (ES5)
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
// numPassengers = undefined, price = undefined (not specified)

createBooking("LH458", 2, 800);
createBooking("LH789", 5);

createBooking("LH123", undefined, 100);
// second argument will always be mapped to the second parameter > cannot skip arguments in function parameters

// How passing arguments in functions works
const flight = "LH234";
const valefar = {
  name: "Valefar Character",
  passport: 23456789123,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999"; // different variable than flight
  passenger.name = "Mr. " + passenger.name;

  if (passenger.passport === 23456789123) {
    console.log("Checked in");
  } else {
    console.log("Wrong passport");
  }
};

checkIn(flight, valefar);
console.log(flight);
console.log(valefar); // name was changed, bcs it's an object, copy of reference to the object in the memory heap > both point to the same object in the memory

// Is the same as doing ...
const flightNum = flight; // primitive, copied
const passenger = valefar; // object, reference copy (still value)

// some risks with copying objects
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000);
};

// two functions manipulating the same object (valefar)
newPassport(valefar);
checkIn(flight, valefar);


// (IMPORTANT) first-class and higher-order functions
// "lower-level functions" to transformer() function
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase(); // / /g = all spaces
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// higher-order function
const transformer = function (str, fnc) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fnc(str)}`);

  console.log(`Transformed by: ${fnc.name}`);
};
// transformer() operates at a higher level of abstraction
// abstraction: transformer() does not care how the str is transformed (does not care about that lvl of detail)
// abstract code away into other functions, instead of putting the code directly into the transformer()
// delecates the string transformation to other, lower level functions upperFirstWord() and oneWord()

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);
// upperFirstWord and oneWord = callback functions

const high5 = function () {
  console.log("🙌");
};

// high-order function
document.body.addEventListener("click", high5);
// high5 = callback function

["Valefar", "Bison", "Hedgehog"].forEach(high5);


// functions returning functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHej = greet("Hej");
greeterHej("Valefar");
// greeterHej value is a function

greet("Hello")("Valefar");
// calling greet() = function, bcs it returns a function
// ("Valefar") = argument of greet()() function

// rewriting into arrow functions
const greetArrowFnc = greeting => {
  return (returnedFunction = name => {
    console.log(`${greeting} ${name}`);
  });
};

const greetArrowFnc2 = greeting => name => console.log(`${greeting} ${name}`);

greet("Hi")("Vitek");

// the this keyword
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  // book: function() {}
  bookFlight(flightNum, passengerName) {
    console.log(
      `${passengerName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      passengerName,
    });
  },
};

lufthansa.bookFlight(239, "Valefar");
lufthansa.bookFlight(635, "John Smith");
console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

// first-class function from the object
const book = lufthansa.bookFlight;

// does NOT work > this keyword points to undefined (regular fnc)
// book(2323, "Stephen Fry");

// Call method
// .call() calls the book function, with the this keyword set to the eurowings object, and the other arguments as usual
// function.call(this keyword, "arg", "arg")
book.call(eurowings, 2323, "Stephen Fry");
console.log(eurowings);

book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 583, "Mary Cooper");
console.log(swiss);

// Apply method
const flightDataArray = [583, "George Cooper"];
book.apply(swiss, flightDataArray);
console.log(swiss);

// using .call() with an array
book.call(swiss, ...flightDataArray);

// Bind method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(2323, "Stephen Fry");

// preset arguments in the bind method = partial application
const bookEW2323 = book.bind(eurowings, 2323);
bookEW2323("Valefar Character");
bookEW2323("Martha Cooper");

// objects with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this); // points to lufthansa bcs of bind()

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.21, 100));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;
// this keyword is null in bind() when you don't want to explicitly make the this keyword point to somewhere

console.log(addVAT(100));
console.log(addVAT(67));

// rewriting into function returning function
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
*/

// CODING CHALLENGE #1
/*
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    console.log(answer);

    // Register answer
    typeof answer === "number" &&
      answer < this.options.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults("string");
  },

  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are: ${this.answers.join(", ")}`);
    }
  },
};
// poll.registerNewAnswer();

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, "string");
// object needs to be called answers, since the displayResults method is looking for this.answers

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]

// Immediately invoked function expressions (IIFE)
const runOnce = function () {
  console.log("This will never run again");
};
runOnce();

// IIFE
// function expression between the first ()
// immediately executed with the last ();
(function () {
  console.log("This will really only run once");
  const isPrivate = 23;
})();

// console.log(isPrivate); // = not accessible bcs inside scope
// data inside a scope is private, is encapsulated

(() => console.log("This will also really only run once"))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}

// console.log(isPrivate);
console.log(notPrivate);


// Closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
// secureBooking() finished executing here

// continues to have acces to variables inside secureBooking()
booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers

// checking the closure
console.dir(booker);

// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); // f() closed over the VE of g(), contains a
// 46

h();
f(); // reassigned f function by h(), contains b
// 1554

console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will starting boarding ${wait} seconds`);
};

// closure has priority over scope chain
const perGroup = 1000;
boardPassengers(180, 3);
// closure also includes arguments
*/

// CODING CHALLENGE #2
/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

// IIFE
(function () {
  const header = document.querySelector("h1");
  header.style.color = "black";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "purple";
  });
})();

// Closure explanation
// By the time the callback function is executed, the IIFE is long gone, and with it the header variable.
// Because of closure, the callback function is still able to access the variable from the IIFE.
// Even though the environment in which the callback function was created is already gone, it is still able to access the variables that were created in the variable environment by the time the function was written.
// Callback function remembers all the variables that were present at the time of it's birth.
// Header is in the backpack of the callback function.
