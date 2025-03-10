/*
let js = "amazing";
console.log(40+8+23-10); 

let firstName = "Mr";
console.log(firstName); 


// declare a new variable using let
let jsIsFun = true;
console.log(jsIsFun);
console.log(typeof jsIsFun);

// change the variable's value without using let
jsIsFun = "YAY";
console.log(typeof jsIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 2025;
console.log(typeof year);

console.log(typeof null);
// returns object, which is weird

let age = 25;
age = 26;

const birthyear = 2000;
// birthyear = 2001; error, invalid assignment to const
// const job; error, missing initializer in constant declaration

var job = 'programmer';
job = 'designer';

lastName = "Gnome";
console.log(lastName);
// js will create property on the global object


// math operators
const currentYear = 2025;
const ageGnome = currentYear - 2020;
const ageMoomin = currentYear - 2024;
console.log(ageGnome, ageMoomin);

console.log(ageGnome * 2, ageGnome / 2, 2 ** 3);
// 2 ** 3 means to 2 to the power of 3 = 2 * 2 * 2

const firstName = "Mr";
const lastName = "Gnome";
console.log(firstName + " " + lastName);
// template strings

// assignment operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25 (15 + 10)
x *= 4; // x = x * 4 = 100 (25 * 4)
x ++; // x = x + 1 = 101
x --; // x = x - 1 = 100
console.log(x);

// comparison operators
console.log(ageGnome > ageMoomin); // >, <, >=, <=
console.log(ageGnome >= 5);
const isFive = ageGnome >= 5; // boolean variable
console.log(currentYear - 2020 > currentYear - 2024);

// operator precendence
const currentYear = 2025;
const ageGnome = currentYear - 2020;
const ageMoomin = currentYear - 2024;
console.log(currentYear - 2020 > currentYear - 2024);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y); // x = 10, y = 10

const averageAge = (ageGnome + ageMoomin) / 2;
console.log(averageAge);

// CHALLENGE #1
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / (heightJohn * heightJohn);
// alternative: massJohn / heightJohn ** 2;

const markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark, BMIJohn);
console.log(markHigherBMI);

const firstName = "Valefar";
const job = "game character";
const birthyear = 1998;
const currentYear = 2037

const valeFar = "I'm " + firstName + ", a " + (currentYear - birthyear) + " year old " + job + "!";
console.log(valeFar);

// template literals
const valeFarNew = `I'm ${firstName}, a ${currentYear - birthyear} year old ${job}!`;
console.log(valeFarNew);

console.log(`Just a regular string...`);

// the old way
console.log("String with \n\
multiple \n\
lines");

//the new way
console.log(`String with
multiple
lines`);

const age = 15;

if (age >= 18) {
    console.log("Valefar can start his driving licence 😁");
} else {
    const yearsLeft = 18 - age;
    console.log(`Valefar is too young. Wait another ${yearsLeft} years 🤨`);
};

const birthYear = 1998;

let century;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
};
console.log(century);

// CHALLENGE #2
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);

if (BMIMark > BMIJohn) {
    console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
} else {
    console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
};

// type conversion (manual)
const inputYear = "1991";
console.log(Number(inputYear));
console.log(inputYear + 18); // 199118
console.log(Number(inputYear) + 18); // 2009

console.log(Number("Valefar")); // NaN, = invalid number
console.log(typeof NaN); // number

console.log(String(23)); // "23"

// type coercion (automatic)
console.log("I am " + 23 + " years old"); // string
console.log("I am " + String(23) + " years old"); // string
console.log("23" - "10" - 3); // 10 
console.log("23" + "10" + 3); // "23103"
console.log("23" * "2"); // 46 

let n = "1" + 1; // "11" 
n = n - 1; // 11 - 1
console.log(n); // 10

// Truthy and Falsy values
// Falsy values: 0, " ", undefined, null, NaN
console.log(Boolean(0)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean("Valefar")); // true
console.log(Boolean({})); // true

const money = 0; // false
if (money) {
    console.log("Don't spend it all 😏");
} else {
    console.log("You should find some cash 🤔");
};

// check if a variable is defined or not
let height; // undefined, has no value, = false
if (height) {
    console.log("YAY! Height is defined");
} else {
    console.log("Height is undefined");
};
// let height = 0; falsy value

// equality operators == & ===
const age = "18";
if (age === 18) console.log("You just turned eighteen (strict)");
if (age == 18) console.log("You just turned eighteen (loose)");

const favourite = Number(prompt("What's your favourite number?")); 
console.log(favourite);
console.log(typeof favourite); // "11"

if (favourite === 11) { // "11" == 11 -> true, 11 === 11, 7 === 11 -> false
    console.log("Noise! 11 is an amazing number");
} else if (favourite === 7) {
    console.log("7 is also pretty great");
} else if (favourite === 9) {
    console.log("9 is neat");
} else {
    console.log("The number is not 11 or 7 or 9");
};

// different operator != & !==
if (favourite !== 11) console.log("Why not 11?");

// logical operators
const hasDriversLicense = true;
const hasGoodVision = true;

console.log(hasDriversLicense && hasGoodVision); // AND
console.log(hasDriversLicense || hasGoodVision); // OR
console.log(!hasDriversLicense); // NOT, inversts value

if (hasDriversLicense && hasGoodVision) {
    console.log("Valefar is able to drive");
} else {
    console.log("Someone else should drive");
};

const isTired = false; 
console.log(hasDriversLicense || hasGoodVision || isTired); // OR

if (hasDriversLicense && hasGoodVision && !isTired) {
    console.log("Valefar is able to drive");
} else {
    console.log("Someone else should drive");
};

// CHALLENGE #3
// const scoreDolphins = (96 + 108 + 89) / 3; // 97.6
// const scoreKoalas = (88 + 91 + 110) / 3; // 96.3
// console.log(scoreDolphins, scoreKoalas);

// if (scoreDolphins > scoreKoalas) {
//     console.log("Dolphins with the trophy 🐬");
// } else if (scoreDolphins < scoreKoalas) {
//     console.log("Koalas with the trophy 🐨");
// } else if (scoreDolphins === scoreKoalas) {
//     console.log("Both with the trophy 🐬🐨");
// };

// BONUS
const scoreDolphins = (97 + 112 + 80) / 3; // 103.3
const scoreKoalas = (109 + 95 + 50) / 3; // 109
console.log(scoreDolphins, scoreKoalas);

if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
    console.log("Dolphins with the trophy 🐬");
} else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
    console.log("Koalas with the trophy 🐨");
} else if (scoreDolphins === scoreKoalas && scoreDolphins >= 100 && scoreKoalas >= 100) {
    console.log("Both with the trophy 🐬🐨");
} else {
    console.log("No one wins the trophy 🙈");
};

// Switch Statement
const day = "friday";

switch(day) {
    case "monday": // day === "monday"
        console.log("Plan course structure");
        console.log("Go to coding meetup");
        break;
    case "tuesday":
        console.log("Prepare theory videos");
        break;
    case "wednesday":
    case "thursday":
        console.log("Write code examples");
        break;
    case "friday":
        console.log("Record videos");
        break;
    case "saturday":
    case "sunday":
        console.log("Enjoy the weekend");
        break;
    default:
        console.log("Not a valid day!");
};

if (day === "monday") {
    console.log("Plan course structure");
    console.log("Go to coding meetup");
} else if (day === "tuesday") {
    console.log("Prepare theory videos");
} else if (day === "wednesdag" || day === "thursday") {
    console.log("Write code examples");
} else if (day === "friday") {
    console.log("Record videos");
} else if (day === "saturday" || day === "sunday") {
    console.log("Enjoy the weekend");
} else {
    console.log("Not a valid day!");
}

// statements & expressions
if (23 > 10) { // statement
    const string = "23 is bigger"; // btween " " = expression
}

2037 - 1998 // expression

// conditional (ternary) operator
const age = 23;
age >= 18 ? console.log("I like to drive cars") : console.log("I like to drive bicycles");

const transport = age >= 18 ? "cars" : "bicycles";
console.log(transport);

let transport2;
if (age >= 18) {
    transport2 = "cars";
} else {
    transport2 = "bicycles";
};
console.log(transport2);

console.log(`I like to drive ${age >= 18 ? "cars" : "bicycles"}`);

// CHALLENGE #4
const bill = 40;

const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);
*/

