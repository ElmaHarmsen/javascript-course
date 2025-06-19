"use strict";

/*
// Constructor function
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this - bad practice
  // this.calcAge = function () {
  // console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person("Jonas", 1991);
console.log(jonas);

// 1. New { } is created
// 2. Function is called, this = { }
// 3. { } is linked to prototype
// 4. Function automatically returns { }

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person); // true

// Static methods
Person.hej = function () {
  console.log("Hej there 👋");
  console.log(this);
};
Person.hej();
// jonas.hej(); // not in the prototype

// Prototypes & Prototypal Inheritance
// Each function in js has automatically a prototype property
// Each object created by a constructor function will get access to (inherit) all methods and properties defined on the constructor's prototype property
// With the this keyword set to the object calling the method
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge(); // 46
matilda.calcAge(); // 20

console.log(jonas.__proto__); // the prototype
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

//.prototypeOfLinkedObjects

// Setting properties on prototype
// Person.prototype.species = "Homo Sapiens";
// console.log(jonas, matilda);
// console.log(jonas.species, matilda.species);
// Object { firstName: "Jonas", birthYear: 1991 }
//   birthYear: 1991
//   firstName: "Jonas"
// <prototype>: Object { 
//   calcAge: calcAge(),
//   constructor: function Person(firstName, birthYear)
//   species: "Homo Sapiens" 
// }

console.log(jonas.hasOwnProperty("firstName")); // true
console.log(jonas.hasOwnProperty("species")); // false

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 4, 5, 6, 9, 9, 3]; // new Array === []
// Created by the Array constructor
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true

console.log(arr.__proto__.__proto__);

// Extending the prototype of a built-in object
// Added a new method to prototype property of Array constructor
// All arrays will inherit this new method
// But generally not a good practice
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir(h1);

//////////////////////////////////////////
// Coding Challenge #1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);
console.log(bmw, mercedes);

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

bmw.accelerate(); // 130
bmw.accelerate(); // 140
bmw.accelerate(); // 150
bmw.brake(); // 145
bmw.accelerate(); // 155

//////////////////////////////////////////
// ES6 Classes

// class expression
// const PersonClass = class {};

// class declaration
class PersonClass {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hej ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  // fullName setter is executed whenever this.fullName is filled
  set fullName(name) {
    console.log(name);
    if (name.includes(" ")) this._fullName = name;
    // _fullName is a convention to avoid naming conflict with setter
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hej() {
    console.log("Hej there 👋");
    console.log(this);
  }
}

const jessica = new PersonClass("Jessica Davis", 1996);
console.log(jessica);
jessica.calcAge(); // 41
console.log(jessica.age); // 41

console.log(jessica.__proto__ === PersonClass.prototype);

// PersonClass.prototype.greet = function () {
//   console.log(`Hej ${this.firstName}`);
// };
jessica.greet();

const walter = new PersonClass("Walter White", 1965);
PersonClass.hej();

//////////////////////////////////////////
// Setters & Getters
const account = {
  owner: "jonas",
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

// getter: writing it as a property (not a method)
console.log(account.latest);

account.latest = 50;
console.log(account.movements);

//////////////////////////////////////////
// Object.create - Prototypal Inheritance
// PersonProto is going to be the prototype of all Person objects
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    (this.firstName = firstName), (this.birthYear = birthYear);
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
// Setting properties - but not the ideal way
(steven.name = "Steven"), (steven.birthYear = "2002");
steven.calcAge();

console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto);
console.log(sarah);
sarah.init("Sarah", 1979);
sarah.calcAge();

//////////////////////////////////////////
// Coding Challenge #2
class CarClass {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarClass("Ford", 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.speedUS = 50;
console.log(ford);

/*
//////////////////////////////////////////
// Inheritance between "classes" - Constructor Functions
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
// This position in the code matters
// Student.prototype object inherits from Person.prototype
// Object.create returns empty object
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

console.dir(Student.prototype.constructor); // Person

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // Student

//////////////////////////////////////////
// Coding Challenge #3
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV("Tesla", 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();

//////////////////////////////////////////
// Inheritance between "classes" - ES6 Classes
class PersonClass {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hej ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  // fullName setter is executed whenever this.fullName is filled
  set fullName(name) {
    console.log(name);
    if (name.includes(" ")) this._fullName = name;
    // _fullName is a convention to avoid naming conflict with setter
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hej() {
    console.log("Hej there 👋");
  }
}

// "extends" links prototypes behind the scenes
class StudentClass extends PersonClass {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    // Creates the this keyword for the class
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentClass("Martha Jones", 2012, "Computer Science");
martha.introduce();
martha.calcAge();

//////////////////////////////////////////
// Inheritance between "classes" - Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    (this.firstName = firstName), (this.birthYear = birthYear);
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
// StudentProto object = prototype of jay object
// PersonProto object = prototype of StudentProto
// PersonProto is a parent prototype of jay > in prototype chain
// jay object can use methods in StudentProto and PersonProto

jay.init("Jay", 2010, "Computer Science");
jay.introduce();
jay.calcAge();

//////////////////////////////////////////
// Another class example
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account,  ${owner}`);
  }

  // Public interface
  deposit(value) {
    this.movements.push(value);
  }

  withdraw(value) {
    this.deposit(-value);
  }

  approveLoan(value) {
    return true;
  }

  requestLoan(value) {
    if (this.approveLoan(value)) {
      this.deposit(value);
      console.log(`Loan of ${value} approved`);
    }
  }
}

const acc1 = new Account("Valefar", "EUR", 1111);

// Bad practice
// acc1.movements.push(250);
// acc1.movements.push(-140);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);

// Should not be allowed to be accessible
acc1.approveLoan(1000);

console.log(acc1);
console.log(acc1.pin); // Accessible from outside

//////////////////////////////////////////
// Encapsulation: private class fields and methods
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// STATIC version of these four

class Account {
  // Public fields
  locale = navigator.language;
  bank = "Bankist";

  // Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    console.log(`Thanks for opening an account,  ${owner}`);
  }

  // Public interface (API)
  getMovements() {
    return this.#movements;
    // NOT chainable
  }

  deposit(value) {
    this.#movements.push(value);
    return this;
  }

  withdraw(value) {
    this.deposit(-value);
    return this;
  }

  // Private method
  #approveLoan(value) {
    return true;
  }

  requestLoan(value) {
    if (this.#approveLoan(value)) {
      this.deposit(value);
      console.log(`Loan of ${value} approved`);
    }
    return this;
  }

  static #test() {
    console.log("TEST");
  }
}

const acc1 = new Account("Valefar", "EUR", 1111);
// acc1.deposit(300);
// acc1.withdraw(100);
const movements = acc1
  .deposit(300) // acc1
  .withdraw(100) // acc1
  .withdraw(50) // etc.
  .requestLoan(25000)
  .withdraw(4000)
  .getMovements();

console.log(acc1);
console.log(movements);

// console.log(acc1.#movements);
// acc1.#approveLoan(323);
// Account.#test();
*/

//////////////////////////////////////////
// Coding Challenge #4
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl("Rivian", 120, 23);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();
