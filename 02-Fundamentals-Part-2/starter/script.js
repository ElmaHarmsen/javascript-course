"use strict";

/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true; // hasDriverLicense
// strict mode error: assignment to undeclared variable hasDriverLicense
if (hasDriversLicense) console.log("I can drive");

// const interface = "Audio";
// const private = 54;
// strict mode error: interface, private is a reserved identifier

// Functions
function logger() {
    console.log("My name is Valefar");
}

// calling / running / invoking function
logger();

function fruitProcessor(apples, oranges) { // parameters
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`; // apples and oranges in numbers
    return juice;
}

// save the value in a variable
const appleJuice = fruitProcessor(5, 0); // values of function's parametres are arguments
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

// function declaration
function calcAge1(birthYear) {
    return 2037 - birthYear;
}
const age1 = calcAge1(1998);

// function expression
const caldAge2 = function (birthYear) {
    return 2037 - birthYear;
}
const age2 = caldAge2(1998);

console.log(age1, age2);

// arrow function
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1998);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years.`;
}

console.log(yearsUntilRetirement(1998, "Valefar"));
console.log(yearsUntilRetirement(1980, "Bob"));

// functions calling other functions
function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
    return juice;
}

console.log(fruitProcessor(2, 3));


const calcAge = function(birthYear) {
    return 2037 - birthYear;
}

const yearsUntilRetirement =  function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;

    if (retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years.`);
        return retirement;
        // console.log("I am unreachable code💥");
    } else {
        console.log(`${firstName} has already retired.`);
        return -1;
    }
}

console.log(yearsUntilRetirement(1950, "Valefar"));
console.log(yearsUntilRetirement(1998, "Bob"));

// CHALLENGE #1
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);
console.log(scoreDolphins, scoreKoalas);

const checkWinner = function(avgDolphins, avgKoalas) {
    if (avgDolphins >= 2 * avgKoalas) {
        console.log(`Dolphins win 🐬 (${avgDolphins} vs. ${avgKoalas})`);
    } else if (avgKoalas >= 2 * avgDolphins) {
        console.log(`Koalas win 🐨 (${avgKoalas} vs. ${avgDolphins})`);
    } else {
        console.log(`No team wins...`);
    }
}

checkWinner(scoreDolphins, scoreKoalas);

scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreDolphins, scoreKoalas);
checkWinner(scoreDolphins, scoreKoalas);

// Arrays
const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const years = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends.length);
console.log(friends[friends.length - 1]); // expression

friends[2] = "Jay";
console.log(friends);
// friends = ['Bob', 'Alice'] assignment to constant variable

const firstName = "Valefar"
const valefar = [firstName, 'Character', 2037 - 1998, 'follower', friends];
console.log(valefar);

const calcAge = function(birthYear) {
    return 2037 - birthYear;
}
const years2 = [1990, 1967, 2002, 2010, 2018];
// console.log(calcAge(years2)); NaN, not gonna work
const age1 = calcAge(years2[0]);
const age2 = calcAge(years2[1]);
const age3 = calcAge(years2[years2.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge(years2[0]), calcAge(years2[1]), calcAge(years2[years2.length - 1])];
console.log(ages);

// Array operations (methods)
const friends = ['Michael', 'Steven', 'Peter'];

// add elements
const newLength = friends.push("Jay");
console.log(friends);
console.log(newLength);

friends.unshift("John");
console.log(friends);

// remove elements
friends.pop(); // last element
const popped = friends.pop();
console.log(popped);
console.log(friends);

friends.shift(); // first element
console.log(friends);

console.log(friends.indexOf("Steven")); // 1
console.log(friends.indexOf("Bob")); // -1

console.log(friends.includes("Steven")); // true
console.log(friends.includes("Bob")); // false

if (friends.includes("Steven")) {
    console.log("You have a friend called Steven");
}

// CHALLENGE #2
const calcTip = (bill) => {
    const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
    return tip;
}

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
console.log("Bills:", bills);
console.log("Tips:", tips);

const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log("Totals:", totals);

// Objects
const valefar = {
    firstName: 'Valefar',
    lastName: 'Character',
    age: 2037 - 1998,
    job: 'follower',
    friends: ['Cat', "Deer", "Hedgehog", "Bison"]
};
console.log(valefar);

console.log(valefar.lastName); // dot notation
console.log(valefar["lastName"]); // bracket notation

const nameKey = "Name";
console.log(valefar["first" + nameKey]);
console.log(valefar["last" + nameKey]);

const interestedIn = prompt("What is you want to know about Valefar? Choose between firstName, lastName, age, job and friends");
// console.log(valefar.interestedIn); // undefined

if (valefar[interestedIn]) {
    console.log(valefar[interestedIn]);
} else {
    console.log("Wrong request. Choose between firstName, lastName, age, job and friends")
}

valefar.location = "Cult of the Lamb";
valefar["twitter"] = "@valefar";
console.log(valefar);

// "Valefar has 3 friends, and his best friend is called Deer"
console.log(`${valefar.firstName} has ${valefar.friends.length} friends, and his best friend is called ${valefar.friends[1]}`);

// Object methods
const valefar = {
    firstName: 'Valefar',
    lastName: 'Character',
    birthYear: 1998,
    job: 'follower',
    friends: ['Cat', "Deer", "Hedgehog", "Bison"],
    hasDriversLicense: false,
    // calcAge: function(birthYear) {
    //     return 2037 - birthYear;
    // }
    // calcAge: function() {
    //     console.log(this); // this = valefar object
    //     return 2037 - this.birthYear;
    // }
    calcAge: function() {
        this.age = 2037 - this.birthYear;
        return this.age;
    },
    getSummary: function() {
        return `${this.firstName} is a ${this.calcAge()} year old ${this.job}, and he has ${this.hasDriversLicense ? "a" : "no"} drivers licence.`
    }
};

// console.log(valefar["calcAge"](1998));
console.log(valefar.calcAge());
console.log(valefar.age);
console.log(valefar.getSummary());
console.log(valefar);

// CHALLENGE #3
const mark = {
    fullName: "Mark Miller",
    mass: 78,
    height: 1.69,
    calcBMI: function() {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi;
    }
};

const john = {
    fullName: "John Smith",
    mass: 92,
    height: 1.95,
    calcBMI: function() {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi;
    }
};

// to avoid writing calcBMI in the objects twice, we can use object oriented programming, but more about that later :)

// explicitly execute the function, as it is not executed by itself inside the object
mark.calcBMI();
john.calcBMI();

if (mark.bmi > john.bmi) {
    console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})`);
} else if (john.bmi > mark.bmi) {
    console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})`);
}

// For loop
// for loop keeps running while condition is TRUE
for(let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weights repetition ${rep} 🏋️`);
}

// Loop arrays
const valefarArray = [
    "Valefar", 
    'Character', 
    2037 - 1998, 
    'follower', 
    ['Cat', 'Deer', 'Hedgehog', 'Bison'],
    true
];

const types = [];

for(let i = 0; i < valefarArray.length; i++) {
    // reading from valefarArray
    console.log(valefarArray[i], typeof valefarArray[i]);

    // filling an array
    types[i] = typeof valefarArray[i];
    types.push(typeof valefarArray[i]);
};

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for(let i = 0; i < years.length; i++) {
    ages.push(2037 - years[i]);
    // array[i] = current loop position
};

console.log(ages);

// loop continue and break statements
// continue
console.log("--- ONLY STRINGS ---")
for(let i = 0; i < valefarArray.length; i++) {
    if(typeof valefarArray[i] !== "string") continue;
    console.log(valefarArray[i], typeof valefarArray[i]);
};

// break
console.log("--- BREAK WITH NUMBER ---")
for(let i = 0; i < valefarArray.length; i++) {
    if(typeof valefarArray[i] === "number") break;
    console.log(valefarArray[i], typeof valefarArray[i]);
};

// Looping backwards & loops in loops
const valefarArray = [
    "Valefar", 
    'Character', 
    2037 - 1998, 
    'follower', 
    ['Cat', 'Deer', 'Hedgehog', 'Bison']
];

// looping backwards
for(let i = valefarArray.length - 1; i >= 0; i--) {
    console.log(i, valefarArray[i]);
};

// loop inside loop
for(let exercise = 1; exercise <= 3; exercise++) {
    console.log(`--- Starting exercise ${exercise}⚡`);
    for(let rep = 1; rep <= 5; rep++) {
        console.log(`Exercise ${exercise}: Lifting weights repetition ${rep}🏋️`);
    }
};

// for(let rep = 1; rep <= 10; rep++) {
//     console.log(`Lifting weights repetition ${rep} 🏋️`);
// };

// While loop
let rep = 1;
while(rep <= 10) {
    // console.log(`Lifting weights repetition ${rep} 🏋️`);
    rep++;
};

let dice = Math.trunc(Math.random() * 6) + 1; 

while(dice !== 6) {
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log("Loop is about to end...");
};

// CHALLENGE 4
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for(let i = 0; i < bills.length; i++) {
    const tip = calcTip(bills[i]);
    tips.push(tip);
    totals.push(tip + bills[i]);
};
console.log(bills, tips, totals);

const calcAverage = function (arr) {
    let sum = 0;
    for(let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
        // sum += arr[i]; is the same as the line above
    }
    return sum / arr.length;
};
console.log(calcAverage([2, 3, 7])); // 12
console.log(calcAverage(totals)); 
console.log(calcAverage(tips)); 
*/