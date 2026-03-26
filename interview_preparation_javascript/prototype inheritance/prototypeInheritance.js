let px= {
  xp1: "im inside p1",
};

let p2 = {
  xp2: "im inside p2",
  __proto__: px,
};

let p3 = {
  xp3: "im inside p3",
  __proto__: p2,
};

// console.log(p3);

let str = "maha";
console.log(str.__proto__.__proto__.__proto__); // now this is also  called protype chaining ....
// now str is pointing to a string class...
// how we can know just do str.__proto__ you will get a String class Object
let x = [];
console.log(x.__proto__.__proto__.__proto__);

// not only with the str its with all the primitive and non primitive data types we have this object prototype chaining like:  leaving undefined and null
// object , array , Boolean , number ... etc
// why why we call everything in JS are objects ...
// What this really means (in human language)
// p3 → p2 → p1 → Object.prototype → null

// When you do:
// p3.xp1

// JS thinks like this 👇

// ❌ Is xp1 inside p3? → No

// ❌ Is xp1 inside p2? → No

// ✅ Is xp1 inside p1? → Yes → return it

// This automatic searching upward is called:

// 🔥 Prototype Chain

/**************************************************************
 *  PROTOTYPE & INHERITANCE – INTERVIEW READY REVISION FILE
 *  Copy-Paste into .js and run with node
 **************************************************************/

/*
==============================================================
WHAT IS A PROTOTYPE?
==============================================================
- Every JavaScript object has an internal [[Prototype]]
- It is used for property lookup
- Implemented via __proto__ (internal)
==============================================================
*/

console.log("===== PROTOTYPE BASICS =====");

const obj = {
  name: "AK",
};

console.log(obj.__proto__ === Object.prototype); // true

/*
==============================================================
PROTOTYPE CHAIN (LOOKUP MECHANISM)
==============================================================
*/

console.log("\n===== PROTOTYPE CHAIN =====");

const arr = [];

console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true
console.log(arr.__proto__.__proto__.__proto__ === null); // true

/*
Lookup order:
arr → Array.prototype → Object.prototype → null
*/

/*
==============================================================
FUNCTION PROTOTYPE vs __proto__ (INTERVIEW FAVORITE)
==============================================================
*/

console.log("\n===== prototype vs __proto__ =====");

function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log("Hello", this.name);
};

const p1 = new Person("AK");

p1.sayHello(); // Hello AK

/*
Person.prototype → used when object is created using `new`
p1.__proto__ === Person.prototype
*/

/*
==============================================================
CONSTRUCTOR PROPERTY
==============================================================
*/

console.log("\n===== CONSTRUCTOR =====");

console.log(p1.constructor === Person); // true

/*
==============================================================
PROTOTYPE SHARING
==============================================================
*/

console.log("\n===== PROTOTYPE SHARING =====");

function User(name) {
  this.name = name;
}

User.prototype.role = "user";

const u1 = new User("A");
const u2 = new User("B");

console.log(u1.role); // user
console.log(u2.role); // user

// role is shared via prototype

/*
==============================================================
CLASSICAL INHERITANCE (PRE-ES6)
==============================================================
*/

console.log("\n===== FUNCTION-BASED INHERITANCE =====");

function Animal(type) {
  this.type = type;
}

Animal.prototype.speak = function () {
  console.log(this.type, "makes a sound");
};

function Dog(name) {
  Animal.call(this, "Dog"); // inherit properties
  this.name = name;
}

// inherit methods
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log(this.name, "barks");
};

const d = new Dog("Buddy");

d.speak(); // Dog makes a sound
d.bark(); // Buddy barks

/*
==============================================================
INHERITANCE USING ES6 CLASS
==============================================================
*/

console.log("\n===== CLASS INHERITANCE =====");

class Vehicle {
  constructor(type) {
    this.type = type;
  }

  move() {
    console.log(this.type, "is moving");
  }
}

class Car extends Vehicle {
  constructor(name) {
    super("Car");
    this.name = name;
  }

  drive() {
    console.log(this.name, "is driving");
  }
}

const car = new Car("BMW");

car.move(); // Car is moving
car.drive(); // BMW is driving

/*
==============================================================
OBJECT.CREATE INHERITANCE
==============================================================
*/

console.log("\n===== Object.create INHERITANCE =====");

const baseUser = {
  login() {
    console.log("User logged in");
  },
};

const admin = Object.create(baseUser);
admin.deleteUser = function () {
  console.log("User deleted");
};

admin.login(); // User logged in
admin.deleteUser(); // User deleted

/*
==============================================================
PROPERTY SHADOWING (INTERVIEW TRAP)
==============================================================
*/

console.log("\n===== PROPERTY SHADOWING =====");

const parent = {
  value: 10,
};

const child = Object.create(parent);
child.value = 20;

console.log(child.value); // 20
console.log(parent.value); // 10

// Child property shadows parent prototype property

/*
==============================================================
HASOWNPROPERTY vs IN OPERATOR
==============================================================
*/

console.log("\n===== hasOwnProperty vs in =====");

console.log(child.hasOwnProperty("value")); // true
console.log("value" in child); // true

/*
==============================================================
FINAL MEMORY LOCK
==============================================================

Objects inherit from objects via prototypes.
Methods live on prototype → memory efficient.

__proto__  → object → prototype link
prototype  → constructor → shared methods

==============================================================
*/

console.log("\n===== END OF PROTOTYPE & INHERITANCE =====");
