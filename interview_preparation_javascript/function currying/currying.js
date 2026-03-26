/**************************************************************
 *  CURRYING – INTERVIEW READY REVISION FILE
 *  Copy-Paste into .js and run with node
 **************************************************************/

/*
==============================================================
WHAT IS CURRYING?
==============================================================
Currying is a technique where:
- A function with multiple arguments
- Is transformed into a sequence of functions
- Each taking ONE argument at a time
- Each call returns another function until all arguments are provided.
==============================================================
*/

// Normal function (not curried)
console.log("===== NORMAL FUNCTION =====");

function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3)); // 6


/*
==============================================================
BASIC CURRYING
==============================================================
*/

console.log("\n===== BASIC CURRYING =====");

function curriedAdd(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // 6


/*
==============================================================
WHY CURRYING?
==============================================================
- Reusability
- Function composition
- Partial application
*/

console.log("\n===== PARTIAL APPLICATION =====");

function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15


/*
==============================================================
CURRYING USING ARROW FUNCTIONS
==============================================================
*/

console.log("\n===== ARROW FUNCTION CURRYING =====");

const subtract = a => b => c => a - b - c;

console.log(subtract(10)(3)(2)); // 5


/*
==============================================================
INTERVIEW TRAP: CURRYING vs PARTIAL APPLICATION
==============================================================

CURRYING:
- Always returns functions until final value
- One argument per function

PARTIAL APPLICATION:
- Fixes some arguments
- Returns function expecting remaining arguments
==============================================================
*/

console.log("\n===== PARTIAL vs CURRY =====");

function normalMultiply(a, b, c) {
  return a * b * c;
}

function partialMultiply(a) {
  return function (b, c) {
    return a * b * c;
  };
}

console.log(partialMultiply(2)(3, 4)); // 24


/*
==============================================================
INFINITE CURRYING (VERY COMMON INTERVIEW QUESTION)
==============================================================
*/

console.log("\n===== INFINITE CURRYING =====");

function infiniteAdd(a) {
  return function (b) {
    if (b !== undefined) {
      return infiniteAdd(a + b);
    }
    return a;
  };
}

console.log(infiniteAdd(1)(2)(3)(4)()); // 10


/*
==============================================================
CURRYING USING toString / valueOf (TRICK)
==============================================================
*/

console.log("\n===== CURRYING WITH valueOf =====");

function magicAdd(a) {
  let sum = a;

  function inner(b) {
    sum += b;
    return inner;
  }

  inner.valueOf = function () {
    return sum;
  };

  return inner;
}

console.log(+magicAdd(1)(2)(3)); // 6


/*
==============================================================
GENERIC CURRY FUNCTION (ADVANCED)
==============================================================
*/

console.log("\n===== GENERIC CURRY FUNCTION =====");

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return function (...nextArgs) {
      return curried(...args, ...nextArgs);
    };
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6


/*
==============================================================
CURRYING + CLOSURE RELATION
==============================================================

- Currying works because of closures
- Each returned function remembers previous arguments
==============================================================
*/

console.log("\n===== CURRYING USES CLOSURE =====");

function closureCurry(a) {
  return function (b) {
    return function (c) {
      console.log(a, b, c);
    };
  };
}

closureCurry("A")("B")("C"); // A B C


/*
==============================================================
FINAL MEMORY LOCK
==============================================================

Currying:
f(a, b, c) → f(a)(b)(c)

If function RETURNS another function,
and remembers previous arguments → CURRYING

==============================================================
*/

console.log("\n===== END OF CURRYING REVISION =====");
