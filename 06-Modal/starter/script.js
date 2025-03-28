"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
// console.log(btnsOpenModal); // Nodelist, like an Array

/* selecting multiple elements with the same class
const btnsOpenModal = document.querySelector(".show-modal");
console.log(btnsOpenModal); // only the first one is selected
*/

const openModal = function () {
  // remove a class of an element using classList.remove
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  // add a class to an element using classList.add
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for only one line of code after () no need for {}
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

// do not call the function with (), just define it
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// document > for any keydown event that happened
document.addEventListener("keydown", function (e) {
  // console.log(e.key); // keydown { key: "Escape"}

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    // if modal does not contain class "hidden"
    closeModal();
  }
});
