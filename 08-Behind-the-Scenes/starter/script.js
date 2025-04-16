"use strict";

// VE = variable environment
// EC = execution context

/*
// Global scope
function calcAge(birthYear) {
  // Function scope = VE of EC
  const age = 2037 - birthYear;
  console.log(firstName);

  // Function scope
  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    // Block scope
    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true; // Function scoped

      // JS finds first variable in current scope, defined in different scopes
      // Creating new variable with same name as outer scope's variable
      const firstName = "Bison";

      // Reassigning outer scope's variable
      output = `New output`;

      const string = `Oh, and you're a millenial, ${firstName}`;
      console.log(string, millenial);

      // Block scoped
      function add(a, b) {
        return a + b;
      }
      console.log(add(2, 3));
    }
    // console.log(string); Reference error: string is not defined
    // add(2, 3); Reference error: add is not defined
    console.log(output);
  }
  printAge();
  return age;
}

// Global variables
const firstName = "Valefar";
calcAge(1991);
// Placing calcAge() before const firstName gives reference error: can't access lexical declaration "firstName" before initialization"

// Hoising & TDZ with variables
console.log(me); // undefined

// Reference error: cannot access before initialization > let + const variables in the TDZ
// console.log(job);
// console.log(year);

var me = "Valefar";
let job = "follower";
const year = 1991;

// Hoising & TDZ with functions
console.log(addDeclaration(2, 3)); // 5 > hoisting

// Reference error: cannot access before initialization > const variable in the TDZ
// console.log(addExpresson(7 + 8));
// console.log(addArrow(4 + 7));

function addDeclaration(a, b) {
  return a + b;
}

const addExpresson = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;
// var addArrow = (a, b) => a + b; // addArrow is not a function, var is undefined > undefined(4 + 7)

// Example of bad hoisting practice
console.log(numberProducts); // numberProducts = undefined (falsy)
if (!numberProducts) deleteShoppingCart();

var numberProducts = 10;

function deleteShoppingCart() {
  console.log("All products deleted");
}

// JavaScript window object
var x = 1; // x > in the window object

// let + const do not create properties on the window object
let y = 2;
const z = 3;

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false

// The this keyword
console.log(this); // window object in global scope

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // undefined
};
// Regular function call
calcAge(1991);

// Arrow function
const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // window > the parent scope is global
  // arrow functions don't get their own this keyword
};
calcAgeArrow(1980);

// Function method
const valefar = {
  year: "1991",
  calcAge: function () {
    console.log(this); // valefar object
    return 2037 - this.year; // this = valefar, this.year = 1991
  },
};
// this = valefar > only because valefar is the object calling the function method
valefar.calcAge(); // object.function()

// use the this keyword to reference the object that is calling the method
// the this keyword will not simply point to the object in which we wrote the method

const matilda = {
  year: 2017,
};

// Method borrowing
matilda.calcAge = valefar.calcAge;
/* matilda {
  year: 2017,
  calcAge: function(),
}
matilda.calcAge(); // 2037 - 2017 = 20
// this = matilda, calling the method calcAge on matilda

const newFunction = valefar.calcAge; // copying the method
/* newFunction () {
  console.log(this); 
  return 2037 - this.year;
}
// Regular function call
newFunction(); // this = underfined (no object calling function)

// Object literal > not a block scope, but global scope
const valefar = {
  firtName: "Valefar",
  year: "1991",
  // Method
  calcAge: function () {
    console.log(this); // valefar object
    console.log(2037 - this.year); // this = valefar

    // Solution #1 > solution to this = undefined
    const self = this;

    // Function inside method
    const isMillenial = function () {
      console.log(this); // undefined
      // console.log(this.year >= 1981 && this.year <= 1996);

      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996);
    };

    // Solution #2 > Arrow function
    // Using the this keyword from the parent scope
    const isMillenial2 = () => {
      console.log(this); // not undefined
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    // Still a regular function call
    isMillenial();
    isMillenial2();
  },
  // Avoid using arrow functions as methods
  greet: () => {
    console.log(this); // global window object
    console.log(`Hey ${this.firtName}`); // undefined
  },
};

valefar.greet();
valefar.calcAge();

// arguments keyword > only available in regular functions
const addExpresson = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpresson(2, 5); // array with parameters
addExpresson(2, 5, 8, 12); // you can use more parameters than specified in the function

// does not get arguments keyword
const addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8);
// (there is a more modern version of the arguments keyword)
*/

// Object references > shallow & deep object copies

// Object = stored in the heap
// Object references = stored in the callstack
const valefar1 = {
  firstName: "Valefar",
  lastName: "Williams",
  age: 27,
};

function marryPerson(person, newLastName) {
  person.lastName = newLastName;
  return person;
}

// Pass in the reference of the object
const marriedValefar = marryPerson(valefar1, "Davis");

// Is the same reference > both point to the same object in heap
// const marriedValefar = valefar1;
// marriedValefar.lastName = "Davis";

console.log("Before:", valefar1); // lastName: Davis
console.log("After:", marriedValefar); // lastName: Davis

const valefar = {
  // First level
  firstName: "Valefar",
  lastName: "Williams",
  age: 27,

  // Nested object > new object in the heap
  family: ["bison", "cat", "hedgehog"],
  // family > creates object reference to the object (array)
};

// Shallow copy
const valefarCopy = { ...valefar }; // ... = spread operator
// Copies all properties of an object into a new object
// Also copies the reference to the array
// Only copies the first level of the object > not nested levels = Shallow copy

valefarCopy.lastName = "Davis";
console.log(valefar, valefarCopy);

// valefarCopy.family.push("Frog");
// valefarCopy.family.push("Pig");
// console.log("Before:", valefar);
// console.log("After:", valefarCopy);

// Deep copy/clone
const valefarClone = structuredClone(valefar);
valefarClone.family.push("Frog");
valefarClone.family.push("Pig");

console.log("Original:", valefar);
console.log("Clone:", valefarClone);
