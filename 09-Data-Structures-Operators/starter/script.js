"use strict";

/*
// String methods practice
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split("+")) {
  const [type, from, to, time] = flight.split(";");
  const output = `${type.startsWith("_Delayed") ? "🔴" : ""}${type.replaceAll(
    "_",
    " "
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ":",
    "h"
  )})`.padStart(45);
  // .padStart() without second parameter = automatically " "
  console.log(output);
}

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// ES6 computing property names
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Array destructuring
// Object literal syntax
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  // openingHours: openingHours,

  // ES6 enhanced object literals
  openingHours,

  // ES6 methods
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // Destructuring object inside function argument
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(
      `Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  // The old way of writing methods
  orderPasta: function (ingredient1, ingredient2, ingredient3) {
    console.log(
      `Here is your pasta with ${ingredient1}, ${ingredient2}, and ${ingredient3}`
    );
  },

  // REST parameters
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// Coding Challenge #4
/*
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

/*
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

document.querySelector("button").addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  const lines = text.split("\n");

  for (const [i, line] of lines.entries()) {
    const [first, second] = line.toLowerCase().trim().split("_");
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20, " ")}${"⚡".repeat(i + 1)}`);
  }
});

// 1) attach an event handler to the button
// 2) get the value of the textarea input
// 3) split the input at the new entry with "\n"
// 4) loop over the lines of the input
// 5) for each line convert .toLowerCase(), .trim() for whitespace and .split() at "_"
// 6) destructure the array into two variables, first and second
// 7) use .replace() to convert the first letter at position[0] of a word from lowercase to .toUpperCase(). and store in a `string`
// 8) use .padEnd() to give each line the same fixed length
// 9) use .entries() on the input to get both the index and the value of the entry, and destructure the array accordingly
// 10) use .repeat() and the index + 1 to increase the amount of emojis per iteration

/*
// Working with Strings - Part 3
// split and join
console.log("a+very+nice+string".split("+")); // divider string based on the "+", stores elements in a new array
console.log("Valefar Character".split(" "));

const [firstName, lastName] = "Valefar Character".split(" ");

const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(" ");
  const namesUpper = [];

  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));

    // alternative
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(" "));
};

capitalizeName("jessica ann smith davis");
capitalizeName("vit brykner");

// padding strings
const message = "Go to gate 23";
console.log(message.padStart(25, "+")); // 25 is length to achieve after padding, "+" is what to pad with
console.log(message.padStart(25, "+").padEnd(35, "+"));

const maskCreditCard = function (number) {
  const str = number + ""; // same as String(number)
  const lastDigits = str.slice(-4); // last 4 digits
  return lastDigits.padStart(str.length, "*");
};

console.log(maskCreditCard(12345678));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard("334859493847755774747"));

// repeat
const message2 = "Bad weather... All departures delayed. ";
console.log(message2.repeat(5)); // 5 = number of times

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${"🚀".repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);


// Working with Strings - Part 2
const airline = "TAP Air Portugal";

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// fix capitalization in name
const passenger = "vAlefAR";
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
// capitalize letter at postion 0 + remaining letters from position 1
console.log(passengerCorrect);

const fixName = function (name) {
  const nameLower = name.toLowerCase();
  const nameFixed = nameLower[0].toUpperCase() + nameLower.slice(1);
  return nameFixed;
};

console.log(fixName("VITEK"));

// comparing userinput email
const email = "hello@valefar.io";
const loginEmail = "   Hello@Valefar.IO \n";

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail); // true

const checkEmail = function (email, emailToCheck) {
  const checkedEmail = emailToCheck.toLowerCase().trim();
  return email === checkedEmail;
};
console.log(checkEmail("hello@valefar.io", "   Hello@Valefar.IO \n"));

// replace parts of strings
const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", ".");
// .replace("itemToReplace", "string that will replace first one")
console.log(priceUS);

const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";
console.log(announcement.replace("door", "gate")); // .replace() only replaces the first occurence, case sensitive
console.log(announcement.replaceAll("door", "gate"));

// regular expression
console.log(announcement.replace(/door/g, "gate")); // g = global

// booleans
const plane = "Airbus A320neo";
console.log(plane.includes("A320")); // true
console.log(plane.startsWith("Air")); // true
console.log(plane.endsWith("neo")); // true

if (plane.startsWith("Airbus") && plane.endsWith("neo")) {
  console.log("Part of the NEW Airbus family");
}

const checkBaggage = function (items) {
  // toLowerCase = always the first step
  const baggage = items.toLowerCase();

  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are NOT allowed on board ❌");
  } else {
    console.log("Welcome aboard ✨");
  }
};
checkBaggage("I have a laptop, some Food and a pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

// Working with Strings - Part 1
const airline = "TAP Air Portugal";
const plane = "A320";

console.log(plane[0]); // "A"
console.log(plane[1]); // "3"
console.log("B737"[0]); // "B"

console.log(airline.length); // 16
console.log("B737".length); // 4

console.log(airline.indexOf("r")); // 6
console.log(airline.lastIndexOf("r")); // 10
console.log(airline.indexOf("Portugal")); // 8 (case sensitive)

console.log(airline.slice(4)); // "Air Portugal" 4 = begin parameter, 0-based, includes spaces
console.log(airline.slice(4, 7)); // "Air" 7 = end parameter, end value is not included in the string, stops before reaching 7

console.log(airline.slice(0, airline.indexOf(" "))); // "TAP"
console.log(airline.slice(airline.lastIndexOf(" ") + 1)); // "Portugal"

console.log(airline.slice(-2)); // starts extracting from the end
console.log(airline.slice(1, -1)); // "AP Air Portuga"

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const letter = seat.slice(-1);
  if (letter === "B" || letter === "E") {
    console.log("You got the middle seat 😐");
  } else console.log("You got lucky 😊");
};
checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

// why string methods work
console.log(new String("Valefar")); // { "Valefar" }
console.log(typeof new String("Valefar")); // object
// conversion from object back to string
console.log(typeof new String("Valefar").slice(1)); // string

// Coding Challenge #3
/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

/*
const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

// 1) unpack (...) the set in a new array []
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2)
gameEvents.delete(64);
console.log(gameEvents);

// 3)
console.log(
  `An event happenend on average every ${90 / gameEvents.size} minutes.`
);
// use the last key to get the full game time
// get the last element of the array with pop()
const time = [...gameEvents.keys()].pop();
console.log(
  `An event happenend on average every ${time / gameEvents.size} minutes.`
);

// 4)
for (const [i, event] of gameEvents) {
  if (i <= 45) {
    console.log(`[FIRST HALF] ${i}: ${event}`);
  } else if (i > 45) {
    console.log(`[SECOND HALF] ${i}: ${event}`);
  }
  // DRY solution
  const half = i <= 45 ? "FIRST" : "SECOND";
  console.log(`[${half} HALF] ${i}: ${event}`);
}

// alternative to populating maps
const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct answer 🎉"],
  [false, "Try again 💥"],
]);

console.log(question);

// convert object to map
console.log(Object.entries(openingHours)); // array of arrays
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get("question"));
// map iterations with desctructuring
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}
const answer = Number(prompt("Your answer"));
console.log(answer);

console.log(
  answer === question.get("correct") ? question.get(true) : question.get(false)
);
// console.log(question.get(question.get("correct") === answer));

// convert map to array
console.log([...question]);
console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);

// Maps
const rest = new Map(); // empty map

// populating the map with the set() method
rest.set("name", "Classico Italiano"); // fill the map
rest.set(1, "Firenze, Italy");
console.log(rest.set(2, "Lisbon, Portugal"));

rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open :)")
  .set(false, "We are closed");

console.log(rest.get("name"));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

console.log(rest.has("categories")); // true
rest.delete(2);
// rest.clear();
console.log(rest.size); // 7

const arr = [1, 2];
rest.set(arr, "Test");
rest.set(document.querySelector("h1"), "Heading");
console.log(rest);
console.log(rest.size); // 9
console.log(rest.get(arr)); // Test

// rest.set([1, 2], "Test");
// console.log(rest.get([1, 2])); // undefined (array is not the same object in the heap as the original array)

const italianFoods = new Set([
  "pasta",
  "gnocchi",
  "tomatoes",
  "olive oil",
  "garlic",
  "basil",
]);

const mexicanFoods = new Set([
  "tortillas",
  "beans",
  "rice",
  "tomatoes",
  "avocado",
  "garlic",
]);

// New Sets operations (ES2025)
// intersection
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log("Intersection:", commonFoods); // Set ["tomatoes", "garlic"]
console.log([...commonFoods]); // Array ["tomatoes", "garlic"]

// union
const italianMexicanFusion = italianFoods.union(mexicanFoods);
console.log("Union:", italianMexicanFusion); // Set ["pasta", etc.] (10)

console.log([...new Set([...italianFoods, ...mexicanFoods])]);

// difference
const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
console.log("Difference Italian:", uniqueItalianFoods); // Set [ "pasta", "gnocchi", "olive oil", "basil" ]

const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
console.log("Difference Mexican:", uniqueMexicanFoods); // Set [ "tortillas", "beans", "rice", "avocado" ]

// symmetric difference
const uniqueItalianMexicanFoods =
  italianFoods.symmetricDifference(mexicanFoods);
console.log("Symmetric difference", uniqueItalianMexicanFoods);

// isDisjointFrom
console.log(italianFoods.isDisjointFrom(mexicanFoods)); // false

// Sets
const ordersSet = new Set([
  "Pasta",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza",
  "Pasta",
]);

console.log(ordersSet); // all copies are gone

console.log(new Set("Valefar")); // Valef(a)r (6)

console.log(ordersSet.size); // 3 (not 6)
console.log(ordersSet.has("Pizza")); // true
console.log(ordersSet.has("Bread")); // false

ordersSet.add("Garlic Bread");
ordersSet.add("Garlic Bread");
console.log(ordersSet); // only one garlic bread was added

ordersSet.delete("Risotto");
// orderSet.clear();

// Looping Sets
for (const order of ordersSet) console.log(order);

// Remove duplicate values in arrays
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const staffUnique = [...new Set(staff)]; // new array
console.log(staffUnique); // [Waiter, Chef, Manager]

console.log(
  new Set(["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]).size
); // 3

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

/*
// 1)
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${[i + 1]}: ${player}`);
}

// 2)
const odds = Object.values(game.odds);
let average = 0;

for (const odd of odds) {
  average += odd; // average = averge + odd
}
average /= odds.length; // average = average / odds.length
console.log(average);

// 3)
const oddsEntries = Object.entries(game.odds);
for (const [team, odd] of oddsEntries) {
  const teamStr = team === "x" ? "draw" : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}

// BONUS
// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

// Looping objects (not iterables)
// Looping PROPERTY NAMES/KEYS
const properties = Object.keys(openingHours);
console.log(properties); // ["thu", "fri", "sat"]

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Looping PROPERTY VALUES
const values = Object.values(openingHours);
console.log(values);

// Looping the entrire object > KEYS + VALUES
const entries = Object.entries(openingHours);
console.log(entries);

// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

/*
console.log(restaurant.openingHours.mon); // underfined
// console.log(restaurant.openingHours.mon.open); // error

// the old way
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// WITH optional chainging
console.log(restaurant.openingHours.mon?.open); // undefined
console.log(restaurant.openingHours?.mon?.open); // undefined
// only if 'mon' exists, the 'open' property will be read
// exists = NOT null and NOT undefined

// real-world example
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of days) {
  // optional chainging and nullish coalescing operators
  const isOpen = restaurant.openingHours[day]?.open ?? "closed";
  // openingHours.mon
  console.log(`On ${day}, we open at ${isOpen}`);
}

// optional chaining on methods
console.log(restaurant.order?.(0, 1) ?? "Methods does not exist");

// optional chaining on arrays
const users = [{ name: "Valefar", emai: "hello@valefar.io" }];
console.log(users[0]?.name ?? "User array empty");

// Looping arrays: the for-of loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) {
  console.log(item); // All items individually logged
  // item is the current element in each iteration
}

// Getting the index
for (const [i, element] of menu.entries()) {
  console.log(`${i + 1}: ${element}`); // 1: Focaccia
  // [0, "Focaccia"] [1, "Bruschetta"]
}

console.log(...menu.entries());

// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

/*
// 1) Desctructuring players array
const [players1, players2] = game.players;
console.log(players1, players2);

// 2) Using REST
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3) Using SPREAD when joining two arrays
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4)
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

// 5) Nested destructuring
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6)
const printGoals = function (...playerNames) {
  console.log(playerNames);
  console.log(`${playerNames.length} goals were scored!`);
};
printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals("Davies", "Muller");
printGoals(...game.scored);

// 7)
team1 < team2 && console.log("Team 1 is more likely to win");
team1 > team2 && console.log("Team 2 is more likely to win");

// Logical assignment operators (new, since ES2021)
const restaurant1 = {
  name: "Capri",
  // numGuests: 20,
  numGuests: 0,
};

const restaurant2 = {
  name: "La Piazza",
  owner: "Giovanni",
};

// OR assignment operator
restaurant1.numGuests ||= 10;
restaurant2.numGuests ||= 10;
// restaurant1.numGuests = restaurant1.numGuests || 10;
// restaurant2.numGuests = restaurant2.numGuests || 10;

// NULLISH assignment operator (null or undefined)
restaurant1.numGuests ??= 10;
restaurant2.numGuests ??= 10;

// AND assignment operator
restaurant1.owner &&= "<ANONYMOUS>";
restaurant2.owner &&= "<ANONYMOUS>";
// restaurant1.owner = restaurant1.owner && "<ANONYMOUS>";
// restaurant2.owner = restaurant2.owner && "<ANONYMOUS>";

console.log(restaurant1);
console.log(restaurant2);

/*
// Falsy default value
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); // 10

// Nullish coalescing operator (??)
// Nullish: null and undefined (NOT 0 or " ")
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect); // 0

// Short circuting, && and ||

console.log("---- OR ----");

// Use ANY data type, return ANY data type, short-circuting (short circut evaluation)
// short-circuting > truthy value, immediately returned
console.log(3 || "Jonas"); // 3
console.log("" || "Jonas"); // Jonas
console.log(true || 0); // true
console.log(undefined || null); // null

console.log(undefined || 0 || "" || "Hello" || 23 || null);
// "Hello" > first truthy value

// Using || to set default values
restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // 10

const guests2 = restaurant.numGuests || 10;
console.log(guests2); // 10

console.log("---- AND ----");

console.log(0 && "Jonas"); // 0
console.log(7 && "Jonas"); // Jonas

console.log("Hello" && 23 && null && "Jonas");
// null > first falsy value, evaluation no longer needs to continue as the result of the operation is false

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "pesto");
}

// Using && to execute a function
restaurant.orderPizza && restaurant.orderPizza("mushrooms", "pesto");

// 1) Destructuring

// (...) SPREAD > on RIGHT side of assignment operator (=)
const arr = [1, 2, ...[3, 4, 5]];
console.log(arr); // [1, 2, 3, 4, 5]

// (...) REST pattern > on LEFT side of assignment operator (=)
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 1, 2, [3, 4, 5]

// Rest in arrays
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
]; // Rest element must be the last element in the array
console.log(pizza, risotto, otherFood);
// Pizza Risotto ["Focaccia", "Bruschetta", etc.]

// Rest in objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // { thu: {}, fri: {} }

// 2) Functions
// REST parameters
const addTogether = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

addTogether(2, 3);
addTogether(5, 3, 7, 2, 1, 4);

const x = [23, 5, 7];
addTogether(...x); // 23, 5, 7

restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
// mushrooms [onion, olives, spinach]

restaurant.orderPizza("mushrooms");
// mushrooms []

// Before the Spread operator > the old way
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// Spread operator (...)
const newArr = [1, 2, ...arr]; // New array
console.log(newArr); // [1, 2, 7, 8, 9]

console.log(...newArr); // 1, 2, 7, 8, 9

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu]; // Shallow copy

// Join 2 arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets, NOT objects
const str = "Valefar";
const letters = [...str, " ", "S."];
console.log(letters);
console.log(...str);
// console.log(`${...str}`); // won't work, not allowed

// Real-world example
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt("Ingredient 2?"),
  // prompt("Ingredient 3?"),
];
console.log(ingredients);

// restaurant.orderPasta(ingredients[1], ingredients[2], ingredients[3]); // the old way
restaurant.orderPasta(...ingredients); // the mordern way

// Objects
const newRestaurant = { est: 1998, ...restaurant, founders: "Mario & Luigi" };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ristorante Roma";
console.log(restaurantCopy.name);
console.log(restaurant.name);

// Passing in object into function
restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: "Via del Sole, 21",
  starterIndex: 1,
});

// Destructuring objects
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Changing the variable name of properties in an object
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Setting default values in object destructuring
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables while destructuring objects
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b); // 23, 7

// Nested objects in destructuring
const {
  fri: { open, close },
} = openingHours;
console.log(open, close); // 11, 23

// Getting values from an array
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// Destructuring an array
const [x, y, z] = arr;

// const [first, second] = restaurant.categories;
// Italian Pizzeria

let [main, , secondary] = restaurant.categories; // Skips second element in the array

// Switching variables
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary); // Vegetarian, Italian

// Switching variables in the array with destructuring
[main, secondary] = [secondary, main];

// Receive two return values from a function with destructuring
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse); // Garlic bread, Pizza

// Getting values from a nested array with destructuring
const nestedArray = [2, 4, [5, 6]];
// const [i, , j] = nestedArray;
// console.log(i, j); // 2, [5, 6]

// Destructuring inside destructuring, nested destructuring
const [i, , [j, k]] = nestedArray;
console.log(i, j, k); // 2, 5, 6

// When length of array is unknown
// const [p, q, r] = [8, 9];
// console.log(p, q, r); // 8, 9, undefined

// Setting default values
const [p, q, r = 1] = [8, 9];
console.log(p, q, r); // 8, 9, 1
*/
