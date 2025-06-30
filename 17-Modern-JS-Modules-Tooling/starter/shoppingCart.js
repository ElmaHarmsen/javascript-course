// Exporting module
console.log("Exporting module");

// Blocking code
// = blocking execution in both this module, and the module that imports this one
// console.log("start fetching users");
// await fetch("https://jsonplaceholder.typicode.com/users");
// console.log("Finish fetching users");

// Variables scoped to this module
const shippingCost = 10;
export const cart = [];

// Named export
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

// Exporting multiple values
export { totalPrice, totalQuantity as tq };

// Default export - one per module
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
