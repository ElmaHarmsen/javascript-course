// Remember, we're gonna use strict mode in all scripts now!
"use strict";

/*
// Solving a problem
// PROBLEM 1
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is temperature amplitude? Difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error and what to do?

// 2) Breaking down into sub-problems
// - How to ingnore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

// 3) Research
// - Javascript get min max value from array

// PROBLEM 2
// Solution found on StackOverflow
const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];

    // if value in array is not a number, then skip the rest of the for loop in this iteration
    if (typeof currentTemp !== "number") continue;

    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }
  console.log(max, min);
  return max - min; // amplitude
};
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

// Function should now receive 2 arrays of temperatures

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? No, just merge two arrays.

// 2) Breaking down into sub-problems
// - Merge two arrays

// 3) Research
// - Javascript merge two arrays

// Solution from MDN > Array.prototype.concat()
const calcTempAmplitudeNew = function (temps1, temps2) {
  const temps = temps1.concat(temps2);
  console.log(temps);
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];

    if (typeof currentTemp !== "number") continue;

    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }
  console.log(max, min);
  return max - min; // amplitude
};
const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);

// Debugging
const measureKelvin = function () {
  const measurement = {
    type: "temperature",
    unit: "celsius",

    // C) Fix bug
    // value: Number(prompt("Degrees celsius:")),
    value: 10,
  };

  // B) Find bug
  console.table(measurement);
  // console.log(measurement);

  // console.log(measurement.value);
  // console.warn();
  // console.error();

  const kelvin = measurement.value + 273;
  return kelvin;
};
// A) Identify bug
console.log(measureKelvin());
// expected output 183
// real output 10273

// Using a debugger
const calcTempAmplitudeBug = function (temps1, temps2) {
  const temps = temps1.concat(temps2);
  console.log(temps);

  // C) Fix bug
  let max = 0; // 0 instead of temps[0];
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];

    if (typeof currentTemp !== "number") continue;

    // B) Find bug
    // debugger;
    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }
  console.log(max, min);
  return max - min; // amplitude
};
const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);

// A) Identify
console.log(amplitudeBug); // min = 0, the initial value is already lower than any value in the array
*/

// CODING CHALLENGE #1
/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]

// My approach
// 1) Understanding the problem
// - One message with multiple degrees and days combination, or multiple messages for each degree and days combination?
// - How to print one single message using each item in an array but not by looping over the array to get multiple messages?

// 2) Breaking down into sub-problems
// - Loop over the array
// - Print a message for each item in the array
// - Calculate the position of the item in the array to determine how many days forward the forcasted temperature is

// 3) Research
// - How to do for each on an array
// - How to get the index of an element in an array

// Multiple messages for each item in the array
const printForecast = function (arr) {
  arr.forEach((element) => {
    console.log(`... ${element}ºC in ${arr.indexOf(element) + 1} days`);
  });
};

// Another way of doing multiple messages for each item in array
const printForecast1 = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(`... ${arr[i]}ºC in ${arr.indexOf(arr[i]) + 1} days`);
  }
};

printForecast([17, 21, 23]);
printForecast1([12, 5, -5, 0, 4]);

// Solution
// 1) Understanding the problem
// - Array transformed to string, separated by ...
// - What is the x days? Index +1

// 2) Breaking down into sub-problems
// - Transform array into string => Add multiple strings to a bigger string that keeps growing after each iteration
// - Transform each element to string with ºC
// - String needs to contain day (index + 1)
// - Add ... between element and start and end of string
// - Log string to console

// 3) Research
// - Array.prototype.toString()

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

// console.log(`... ${data1[0]}ºC ... ${data1[1]}ºC ... ${data1[2]}ºC ...`);

const printForecast2 = function (arr) {
  let string = "";
  for (let i = 0; i < arr.length; i++) {
    string += `${arr[i]}ºC in ${i + 1} days ... `;
  }
  console.log("... " + string);
};

printForecast2(data1);
*/

// CODING CHALLENGE 2 WITH AI
/*
Let's say you're building a time tracking application for freelancers. At some point in building this app, you need a function that receives daily work hours for a certain week, and returns:
1. Total hours worked
2. Average daily hours
3. The day with the most hours worked
4. Number of days worked
5. Whether the week was full-time (worked 35 hours or more)

TEST DATA: [7.5, 8, 6.5, 0, 8.5, 4, 0]
*/

// AI tool used: ChatGPT
// Promt:
/*
I'm building a time tracking application for freelancers. Write a function called analyseWorkWeek that receives an array of daily work hours for a certain week, and returns an object with the following data:
1. Total hours worked
2. Average daily hours (round to one decimal)
3. The day with the most hours worked (assume Monday is day 0 in the array)
4. Number of days worked (days with more than 0 hours)
5. Whether the week was full-time (worked 35 hours or more)
*/

// AI generated code
const analyseWorkWeek = function (workHours) {
  // Ensure the array has exactly 7 days
  if (!Array.isArray(workHours) || workHours.length !== 7) {
    throw new Error(
      "Input must be an array of exactly 7 numbers representing daily work hours."
    );
  }

  // Define weekdays
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Calculate total hours worked
  const totalHours = workHours.reduce((sum, hours) => sum + hours, 0);

  // Calculate average daily hours
  const averageHours = parseFloat((totalHours / workHours.length).toFixed(1));

  // Find the day with the most hours worked
  const maxHours = Math.max(...workHours);
  const maxDay = weekDays[workHours.indexOf(maxHours)];

  // Count the number of days worked
  const daysWorked = workHours.filter((hours) => hours > 0).length;

  // Check if the week was full-time (35 hours or more)
  const isFullTime = totalHours >= 35;

  return {
    totalHours,
    averageHours,
    maxDay,
    daysWorked,
    isFullTime,
  };
};

const weekData = [7.5, 8, 6.5, 0, 8.5, 4, 0];
console.log(analyseWorkWeek(weekData));

const weekData2 = [7.5, 8, 6.5, 0, 8.5];
console.log(analyseWorkWeek(weekData2));
