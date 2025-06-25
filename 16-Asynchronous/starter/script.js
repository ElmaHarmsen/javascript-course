"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
// Sequence of AJAX calls
const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal
// https://countries-api-836d.onrender.com/countries/

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

/*
///////////////////////////////////////
// Oldschool way of doing Ajax
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v2/name/${country}`);
  request.send();

  // when data is fetched, load event is emitted
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData("denmark");
getCountryData("sweden");
*/

/*
const getCountryAndNeighbour = function (country) {
  // AJAx call country 1
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const neighbour = data.borders?.[0];
    // optional chaining to account for countries with no borders

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener("load", function () {
      // nested callback function
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, "neighbour");
    });
  });
};

getCountryAndNeighbour("denmark");
*/

/*
///////////////////////////////////////
// Welcome to Callback Hell
setTimeout(() => {
  console.log("1 second passed");
  setTimeout(() => {
    console.log("2 seconds passed");
    setTimeout(() => {
      console.log("3 second passed");
      setTimeout(() => {
        console.log("4 second passed");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// const request = new XMLHttpRequest();
// request.open("GET", `https://restcountries.com/v2/name/${country}`);
// request.send();

///////////////////////////////////////
// PROMISES AND FETCH API
// const request = fetch("https://restcountries.com/v2/name/usa");
// console.log(request);
// Promise is immediate

// Consuming promise
// const getCountryData = function (country) {
//   // fetch returns a promise
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     // handle a fulfilled promise
//     .then(function (response) {
//       console.log(response);
//       // json() is also async, with new promise returned
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

/*
const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
*/

// BEFORE REFACTORING FUNCTION
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, "neighbour"))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message} Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

/*
const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error("No neighbour found!");

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        "Country not found"
      );
    })
    .then(data => renderCountry(data, "neighbour"))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message} Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  getCountryData("portugal");
});

getCountryData("australia");
*/

// Common mistake, don't do this (still callback hell)
// prettier-ignore
// fetch(`https://restcountries.com/v2/alpha/${neighbour}`).then(response => response.json());

// How to handle promise rejections
// Pass a second callback function into .then()
// Use .catch() to handle errors propagated down the chain

/*
///////////////////////////////////////
// Coding Challenge #1
const whereAmI = function(lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  )
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryCode}`);

      return fetch(`https://restcountries.com/v2/name/${data.countryCode}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥💥`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

///////////////////////////////////////
// Event Loop
console.log("Test start"); // 1st
setTimeout(() => console.log("0 sec timer"), 0); // 5th
Promise.resolve("Respolved promise 1").then(res => console.log(res)); // 3rd

Promise.resolve("Resolved promise 2").then(res => {
  for (let i = 0; i < 1000000; i++) {}
  console.log(res);
}); // 4th

console.log("Test end "); // 2nd

///////////////////////////////////////
// Building a Promise
const lotteryPromise = new Promise(function(resolve, reject) {
  console.log("Lottery draw is happening 🔮");
  setTimeout(function() {
    if (Math.random() >= 0.5) {
      resolve("You WIN 🎉");
    } else {
      reject(new Error("You lost your money 💩"));
    }
  }, 2000)
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log("1 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("2 seconds passed");
    return wait(1);
  })
  .then(() => {
    console.log("3 seconds passed");
    return wait(1);
  })
  .then(() => console.log("4 seconds passed"));

// setTimeout(() => {
//   console.log("1 second passed");
//   setTimeout(() => {
//     console.log("2 seconds passed");
//     setTimeout(() => {
//       console.log("3 second passed");
//       setTimeout(() => {
//         console.log("4 second passed");
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promises that will be fullfilled/rejected immediately
Promise.resolve("You WIN 🎉").then(x => console.log(x));
Promise.reject("You LOSE 💩").catch(x => console.log(x));

///////////////////////////////////////
// Promised based geolocation API
navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.error(err)) // 2nd
console.log("Getting position"); // 1st

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryCode}`);

      return fetch(`https://restcountries.com/v2/name/${data.countryCode}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥💥`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", whereAmI);

///////////////////////////////////////
// Coding Challenge #2

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

let currentImg;

createImage("img/img-1.jpg")
  .then(img => {
    currentImg = img;
    console.log("Image 1 loaded");
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then(img => {
    currentImg = img;
    console.log("Image 2 loaded");
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
  })
  .catch(err => console.error(err));
*/

/*
///////////////////////////////////////
// Consuming promises with async/await
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// fetch(`https://restcountries.com/v2/name/${country}`).then(response => console.log(response));

// Async function
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const responseGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?${lat}&${lng}`
    );
    if (!responseGeo.ok) throw new Error("Problem getting location data");
    const dataGeo = await responseGeo.json();

    // Country data
    // await stops code exucition at this point in the function untill the promise is fulfilled - but is not blocking callstack
    const response = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.countryCode}`
    );
    if (!response.ok) throw new Error("Problem getting country");
    const data = await response.json();
    renderCountry(data[0]);

    // value of the fulfilled primise:
    return `You are in ${dataGeo.city}, ${dataGeo.countryCode}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log("1: Will get location");
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then(city => console.log(`2:${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log("3: Finished getting location"));

// async/await = syntetic sugar over the .then method in promises
// but using a different way of consuming them
*/

/*
///////////////////////////////////////
// Error handling with try..catch
try {
  let y = 1;
  const x = 2;
  y = 3;
} catch (err) {
  // error does not appear in the console - script does not "die"
  alert(err.message);
}


///////////////////////////////////////
// Returning values from async functions with IIFE
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2:${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log("3: Finished getting location");
})();

///////////////////////////////////////
// Returning promises in parallel - Promise.all combinator
const get3Countries = async function(c1, c2, c3) {
  try {
    // Not this...
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    // if one promise rejects, the full Promise.all rejects too
    // "Promise.all shortcircuts when one promise rejects"

    console.log(data.map(dataItem => dataItem[0].capital));

  } catch(err) {
    console.log(err);
  }
}

get3Countries("portugal", "canada", "tanzania");

///////////////////////////////////////
// Other promise combinators: Race, Allsettled, Any
// Promise.race - "the first settled promise wins the race", returns as soon as one of the input promises settles (value is available) - shortcircuts when one of the promises gets settled, no matter if fulfulled or rejected
(async function() {
  const response = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(response[0]);
})();

// timeout promise that automatically rejects after certain time
const timeOut = function (secs) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("Request took too long 😴"));
    }, secs * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeOut(0.2),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled - returns an array of all settled promises, fulfilled and rejected, never shortcircuts [ES2020]
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Another success"),
]).then(res => console.log(res));

// Promise.all - shortcircuts when there is one rejected promise
Promise.all([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Another success"),
]).then(res => console.log(res));

// Promise.any - takes in array, returns first fulfilled promise, and ignores rejected promises [ES2021]
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Another success"),
]).then(res => console.log(res));

///////////////////////////////////////
// Coding Challenge #3
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

let currentImg;

const loadNPause = async function () {
  try {
    // load img 1
    let img = await createImage("img/img-1.jpg");
    await wait(2);
    img.style.display = "none";

    // load img 2
    img = await createImage("img/img-2.jpg");
    await wait(2);
    img.style.display = "none";
  } catch (err) {
    console.log(err);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);

    const imgsElements = await Promise.all(imgs);
    console.log(imgsElements);
    imgsElements.forEach(img => img.classList.add("parallel"));
  } catch (err) {
    console.log(err);
  }
};
loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
*/
