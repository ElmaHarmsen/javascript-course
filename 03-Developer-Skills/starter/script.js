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
*/

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
