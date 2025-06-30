// Named import
// import * as ShoppingCart from "./shoppingCart.js";
// ShoppingCart.addToCart("bread", 5);

// Combine imports - but usually not done
import add, { cart } from "./shoppingCart.js";

// Imports are live connections to exports
add("pizza", 2);
add("bread", 5);
add("apples", 4);
console.log(cart);

/*
// Importing module
// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";
// addToCart("bread", 5);
// console.log(price, tq);

console.log("Importing module");
// console.log(shippingCost); // doesn't work by itself

// Default import - give it a name here
import add2 from "./shoppingCart.js";
add2("pears", 3);

/////////////////////////////////////////
// Top-Level Await in modules (ES2022)
// = using await outside an async function
// but blocks the execution - use with caution
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);

const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return {
    title: data.at(-1).title,
    text: data.at(-1).body,
  };
};

const lastPost = getLastPost();
console.log(lastPost);

// Not very clean
// lastPost.then(last => console.log(last));

// Top-level await
const lastPost2 = await getLastPost();
console.log(lastPost2);


/////////////////////////////////////////
// Module pattern
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart("apple", 4);
ShoppingCart2.addToCart("pizza", 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost); // cannot do, undefined
*/

/*
/////////////////////////////////////////
// Common modules - not in JavaScript
export.addTocart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
  );
};

// Import
const { addTocart } = require('./shoppingCart.js');
*/

///////////////////////////////////////
// The Command Line
/*
Command: ls - contents of current folder
Command: cd - change directory
Command: cd + .. - going up
Command: cd + ../.. - going up two levels
Command: clear - clear console
Command: mkdir - make folder
Command: touch - make file
Command: rm - delete file
Command: mv - move to parent folder
Command: rmdir - remove directory (empty)
Command: rm -R - remove directory (filled)


///////////////////////////////////////
// NPM - Node Package Manager
Command: npm -v - check npm version
Command: npm init - initialize npm (creates package.json)
Command: npm i/install - to install a package (node modules)
Command: npm i (without package name) - installs dependencies from package.json

Lodash - package

When copying projects to another computer, don't include node_modules - doesn't make sense as you can get them any time from npm, and it slows down the computer
*/

// Not very efficient way of importing - solution: with Parcel
// import cloneDeep from "../node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

const state = {
  cart: [{ product: "bread", quantity: 5, product: "pizza", quantity: 2 }],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state); // from lodash

state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

///////////////////////////////////////
// Parcel - Bundler
/*
Command: npm i parcel --save-dev
dev dependency = tool to build an application, but is not a dependency included in the code

Command: npx parcel (path) - bundle modules together
Command for npm scripts: npm run start, npm run build

Command to install npm globally: npm i parcel -g
But recommended to install npm to stay up-to-date with versions
*/

// Parcel: hot module replacement = hot module reloading - whenever one of the modules is changed it will trigger a rebuild but the new modified bundle will be automatically injected into the browser without triggering a whole page reload (good for maintaining the state on the page)
if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////
// Configuring Babel and Polyfilling
console.log(cart.find(el => el.quantity >= 2));
Promise.resolve("TEST").then(x => console.log(x));

// Polyfilling with external library
import "core-js/stable";

// Importing only specific features - reduces bundle size
// import "core-js/stable/array/find";
// import "core-js/stable/promise";

// Polyfilling async functions
import "regenerator-runtime/runtime";