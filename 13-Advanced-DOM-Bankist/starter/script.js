"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect(); // coordinates
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("current scroll (x/y)", window.pageXOffset, window.pageYOffset);

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // relative to the top of the entire page, not the viewport
  // old way
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // modern way - only works in modern browsers
  section1.scrollIntoView({
    behavior: "smooth",
  });
});

///////////////////////////////////////
// Page navigation (without event delegation)
// (not a very efficient way for many elements)
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({
//       behavior: "smooth",
//     });
//     // use the href attribute to select the element
//   });
// });

// Page navigation (with event delegation)
// 1. Add event listener to common parent element
document.querySelector(".nav__links").addEventListener("click", function (e) {
  // 2. Determine which element originated the event
  console.log(e.target);
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

///////////////////////////////////////
// Tab component
// Event delegation
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause - modern
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach(content =>
    content.classList.remove("operations__content--active")
  );

  // Active tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Menu fade in-out animation
const handleHover = function (e) {
  // console.log(this); // 1 or 0.5
  // "this" equals e.currentTarget

  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
    // use "this" to pass additional values into function
    // this = opacity
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
// works with bind > bind() returns new function
// workaround to the problem that the handler function can only really receive one argument

// Sticky navigation Intersection Observer API
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// }; // is called each time the observed element (target element) is intersecting the root element at the defined threshhold

// const observerOptions = {
//   root: null, // element target intersects with, null = intersection with full viewport
//   treshhold: [0, 0.2], // %
//   // 0 = when target enters view, moves completely out of view
//   // 1 = when 100% of target is visible into view
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

///////////////////////////////////////
// Sticky navigation Intersection Observer API
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; // = entries[0]

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reaveal section on sroll Intersection Observer API
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

///////////////////////////////////////
// Lazy loading images - page performance
// 1. Low resolution image as placeholder
// 2. When visible, replace with high resolution in data-src
// 3. Remove the blur filter from CSS when loaded
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // Listen for load event and remove filter
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px", // load imgs before visible
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider component
const slider = function () {
  // use a function to not pollute global namespace
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach(dot => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Previous slide
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      currentSlide = Number(e.target.dataset.slide);
      // custom data attributes are in dataset (data-slide)
      goToSlide(currentSlide);
      activateDot(currentSlide);
    }
  });
};
slider();
// optional: pass in options into slider() (=common to do)

/*
///////////////////////////////////////
///////////////////////////////////////
// Selecting elements
console.log(document.documentElement); // <html lang="en">
console.log(document.head); // <head>
console.log(document.body); // <body>

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections); // NodeList

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons); // HTMLCollection > live HTML collection

console.log(document.getElementsByClassName("btn")); // live HTML

// Creating and inserting elements
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality and analytics";
message.innerHTML =
  "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!<b/button>";

header.append(message);
// header.prepend(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

//.insertAdjacentHTML

// Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
    // message.parentElement.removeChild(message); // old way
  });

// Styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.height); // <empty string>
// works only for inline styles, set in js
console.log(message.style.backgroundColor);

// computed styles
console.log(getComputedStyle(message).color); // CSS style
console.log(getComputedStyle(message).height); // CSS style

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

// changing CSS root variables
document.documentElement.style.setProperty("--color-primary", "orangered");

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

// non0standard property
console.log(logo.designer); // undefined
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

console.log(logo.src); // absolute url
console.log(logo.getAttribute("src")); // relative url

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

// Data attributes, data-
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add("c", "j");
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c");

// Don't use
logo.className = "jonas";
*/

/*
///////////////////////////////////////
// Events
const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading :)");

  // only listen to the event once
  h1.removeEventListener("mouseenter", alertH1);
};

h1.addEventListener("mouseenter", alertH1);

// remove an event using a timeout
// setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// oldschool
// h1.onmouseenter = function (e) {
//   alert("addEventListener: Great! You are reading the heading :)");
// };

///////////////////////////////////////
// Event propagation: Bubbling and Capturing
// 1. Capturing phase > event start at the document, event travels through parent scopes to target
// 2. Target phase > addEventListener
// 3. Bubbling phase > event travels back up to the document through parent scopes, it's as if the event happened in each of the parent elements
// Events are handled in the target and bubbling phases
// Not all events have the capturing, target, bubbling cycle

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget);

  // Stop event propagation
  // e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("NAV", e.target, e.currentTarget);
  },
  true
);
// third parameter true > event listens to capturing events instead of bubbling
// "NAV" will appear first > it's the first element through which the event passes = capturing: listens for the event as it travels down to the target (bubbling: listening for the event as it travels back up)

// Event bubbling > e.target will always be the same for all three eventListeners
// e.currentTarget > to which the event handler is attached
// e.currentTarget === this keyword in event handler
// e.stopPropagation() stops propagation of event to the parent elements

///////////////////////////////////////
// DOM traversing
// Selecting elements based on other elements
const h1 = document.querySelector("h1");

// Going downwards: selecting child elements
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes); // node can be anything
console.log(h1.children); // HTMLCollection for direct children
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "white";

// Going upwards: selecting parent element
console.log(h1.parentNode);
console.log(h1.parentElement);

// Select the closest parent element
h1.closest(".header").style.background = "var(--gradient-secondary)";
h1.closest("h1").style.background = "var(--gradient-primary)";

// Going sideways: selecting direct sibling elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// For nodes
console.log(h1.previousSibling);
console.log(h1.previousSibling);

// Selecting all siblings
console.log(h1.parentElement.children); // HTMLCollection

// Looping over siblings but not h1
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = "scale(0.5)";
});

///////////////////////////////////////
// Lifecycle DOM Events
document.addEventListener("DOMContentLoaded", function (e) {
  // just HTML and JavaScript, not images and external resources
  console.log("HTML parsed and DOM tree built!", e);
});
// when <script> is at the end of the HTML file, it's not needed to listen for DOMContentLoaded

window.addEventListener("load", function (e) {
  // for all resources
  console.log("Page fully loaded", e);
});

// window.addEventListener("beforeunload", function (e) {
//   // created before user is about to leave the page
//   e.preventDefault();
//   console.log(e);
//   // e.returnValue = "";
// });
*/

///////////////////////////////////////
// Efficient script loading: Defer and Async
// 1. Regular <script> Parsing HTML, Fetching Script, Executing, Finishing Parsing HTML (HEAD) | Parsing HTML, Fetching Script, Executing (BODY END)
// 2. Async <script async> Parsing HTML and Fetching Script happens asyncronously (HEAD)
// 3. Defer <script defer> Parsing HTML and Fetching Script happens asyncronously, AND the Parsing is never interrupted (HEAD)

// Parsing HTML = building DOM tree from elements
