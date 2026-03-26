/**************************************************************
 *  CLOSURES – INTERVIEW TRAPS & OUTPUT QUESTIONS
 *  Copy-Paste Ready Revision File
 **************************************************************/

/*
--------------------------------------------------------------
WHAT IS A CLOSURE?
--------------------------------------------------------------
A closure is created when:
- A function remembers variables from its outer scope
- Even after the outer function has finished execution
-A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). 
In other words, a closure gives a function access to its outer scope. 
In JavaScript, closures are created every time a function is created, at function creation time.
--------------------------------------------------------------
*/

console.log("===== BASIC CLOSURE =====");

function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log("count:", count);
  }

  return inner;
}

const fn = outer(); // outer executed, inner returned
fn(); // 1
fn(); // 2
fn(); // 3

// inner remembers `count` even after outer() is done


/*
--------------------------------------------------------------
TRAP 1: CLOSURE WITH VAR (CLASSIC INTERVIEW QUESTION)
--------------------------------------------------------------
*/

console.log("\n===== VAR CLOSURE TRAP =====");

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log("var i:", i);
  }, 1000);
}

/*
OUTPUT:
var i: 3
var i: 3
var i: 3

WHY?
- var is function-scoped and it happens in closures
- Only ONE `i` exists
- setTimeout runs after loop ends
*/


/*
--------------------------------------------------------------
FIX 1: USING LET (BLOCK SCOPE)
--------------------------------------------------------------
*/

console.log("\n===== LET FIX =====");

for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log("let i:", i);
  }, 1000);
}

/*
OUTPUT:
let i: 0
let i: 1
let i: 2

WHY?
- let creates new binding per iteration
*/


/*
--------------------------------------------------------------
FIX 2: USING IIFE (OLD SCHOOL INTERVIEW FAVORITE)
--------------------------------------------------------------
*/

console.log("\n===== IIFE FIX =====");

for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(() => {
      console.log("IIFE i:", i);
    }, 1000);
  })(i);
}

/*
Each IIFE captures its own `i`
*/


/*
--------------------------------------------------------------
TRAP 2: CLOSURE INSIDE FUNCTION CALL
--------------------------------------------------------------
*/

console.log("\n===== FUNCTION CALL CLOSURE =====");

function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1

// Each function call creates a NEW closure


/*
--------------------------------------------------------------
TRAP 3: CLOSURE WITH OBJECT REFERENCE
--------------------------------------------------------------
*/

console.log("\n===== OBJECT CLOSURE TRAP =====");

function outerObj() {
  let obj = { value: 10 };

  return function () {
    obj.value++;
    console.log(obj.value);
  };
}

const objFn = outerObj();
objFn(); // 11
objFn(); // 12


/*
--------------------------------------------------------------
TRAP 4: CLOSURE + setTimeout + PARAMETER
--------------------------------------------------------------
*/

console.log("\n===== setTimeout PARAM TRICK =====");

for (var i = 1; i <= 3; i++) {
  setTimeout(function (i) {
    console.log("param i:", i);
  }, i * 1000, i);
}

/*
OUTPUT:
param i: 1
param i: 2
param i: 3

WHY?
- i passed as argument
- NOT taken from closure
*/


/*
--------------------------------------------------------------
TRAP 5: PRIVATE VARIABLES USING CLOSURE
--------------------------------------------------------------
*/

console.log("\n===== PRIVATE VARIABLES =====");

function BankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      console.log("Balance:", balance);
    },
    withdraw(amount) {
      balance -= amount;
      console.log("Balance:", balance);
    },
  };
}

const account = BankAccount(1000);
account.deposit(500);   // 1500
account.withdraw(300);  // 1200

// balance is NOT accessible directly


/*
--------------------------------------------------------------
TRAP 6: CLOSURE MEMORY LEAK
--------------------------------------------------------------
*/

console.log("\n===== MEMORY LEAK EXAMPLE =====");

function heavyClosure() {
  let largeData = new Array(1000000).fill("AK");

  return function () {
    console.log("Using large data");
  };
}

let leak = heavyClosure();
// largeData stays in memory as long as `leak` exists

leak = null; // cleanup


/*
--------------------------------------------------------------
TRAP 7: CLOSURE WITH THIS (VERY IMPORTANT)
--------------------------------------------------------------
*/

console.log("\n===== CLOSURE WITH THIS =====");

const user = {
  name: "AK",
  greet: function () {
    setTimeout(function () {
      console.log("Hello", this.name);
    }, 1000);
  },
};

user.greet(); // Hello undefined

/*
WHY?
- Regular function has its own `this`
- this === window / global
*/


/*
FIX: ARROW FUNCTION
*/

console.log("\n===== FIX THIS USING ARROW =====");

const userFixed = {
  name: "AK",
  greet: function () {
    setTimeout(() => {
      console.log("Hello", this.name);
    }, 1000);
  },
};

userFixed.greet(); // Hello AK

//outpu based qns

for(var i=1; i<=5; i++) {
	  setTimeout(() => {
  	  console.log(i);
          i = i + 1;
       },  i*1000); // 10,11,12,13,14
}
console.log("outside: ", i) // 6
if( i < 10 ) i = 10;

//Loop ends → i = 6
// outside: 6
// i is changed to 10

for (var i = 1; i <= 3; i++) {
  (function(i) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  })(i);
}
// 1 2 3 Each IIFE creates a new scope.


/*
--------------------------------------------------------------
FINAL MEMORY LOCK
--------------------------------------------------------------

Closures capture VARIABLES , not VALUES.
They capture REFERENCES to the scope.

If the variable changes later,
closure sees the updated value.

--------------------------------------------------------------
*/

console.log("\n===== END OF CLOSURE REVISION FILE =====");
