/**************************************************************
 *  DEEP COPY vs SHALLOW COPY – INTERVIEW READY REVISION FILE
 *  Copy-Paste into .js and run with node
 **************************************************************/

/*
==============================================================
WHAT IS SHALLOW COPY?
==============================================================
- Copies only the FIRST level
- Nested objects still share reference
- Changes in nested data affect original
==============================================================
*/

console.log("===== SHALLOW COPY =====");

const shallowOriginal = {
  name: "AK",
  address: {
    city: "Delhi",
  },
};

// SHALLOW COPY USING SPREAD
const shallowCopy1 = { ...shallowOriginal };

// SHALLOW COPY USING Object.assign
const shallowCopy2 = Object.assign({}, shallowOriginal);

// Mutating nested object
shallowCopy1.address.city = "Mumbai";

console.log("Original:", shallowOriginal);
console.log("Shallow Copy:", shallowCopy1);

/*
OUTPUT:
Original.address.city → "Mumbai"
WHY?
- Nested object reference is shared
*/


/*
==============================================================
SHALLOW COPY WITH ARRAYS
==============================================================
*/

console.log("\n===== SHALLOW COPY (ARRAY) =====");

const arrOriginal = [1, 2, [3, 4]];

const arrShallow = [...arrOriginal];

arrShallow[2].push(5);

console.log("Original:", arrOriginal);// [1, 2, [3, 4, 5]]
console.log("Shallow:", arrShallow);// [1, 2, [3, 4, 5]] 


/*
==============================================================
WHAT IS DEEP COPY?
==============================================================
- Copies ALL levels
- No shared references
- Safe for nested structures
==============================================================
*/

console.log("\n===== DEEP COPY =====");

const deepOriginal = {
  name: "AK",
  address: {
    city: "Delhi",
  },
};

// DEEP COPY USING structuredClone (BEST)
const deepCopy1 = structuredClone(deepOriginal);

deepCopy1.address.city = "Bangalore";

console.log("Original:", deepOriginal);// { name: 'AK', address: { city: 'Delhi' } }
console.log("Deep Copy:", deepCopy1);// { name: 'AK', address: { city: 'Bangalore' } }


/*
==============================================================
DEEP COPY USING JSON (INTERVIEW TRAP)
==============================================================
*/

console.log("\n===== JSON DEEP COPY (TRAP) =====");

const jsonOriginal = {
  name: "AK",
  date: new Date(),
  fn: function () {},
  undef: undefined,
};

const jsonCopy = JSON.parse(JSON.stringify(jsonOriginal));

console.log("JSON Copy:", jsonCopy);

/*
LIMITATIONS:
❌ Loses functions
❌ Loses undefined
❌ Date becomes string
❌ Cannot handle circular references
*/


/*
==============================================================
DEEP COPY USING RECURSION (POLYFILL)
==============================================================
*/

console.log("\n===== DEEP COPY USING RECURSION =====");

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const copy = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key]);
    }
  }

  return copy;
}

const recursiveOriginal = {
  a: 1,
  b: {
    c: 2,
  },
};

const recursiveCopy = deepClone(recursiveOriginal);

recursiveCopy.b.c = 999;

console.log("Original:", recursiveOriginal);
console.log("Recursive Copy:", recursiveCopy);


/*
==============================================================
INTERVIEW TRAP: CONST OBJECT
==============================================================
*/

console.log("\n===== CONST OBJECT =====");

const constObj = { name: "AK" };

constObj.name = "BK"; // Allowed
// constObj = {};     // ❌ Error

console.log(constObj);

/*
const protects the reference, NOT the object
*/


/*
==============================================================
WHEN TO USE WHAT?
==============================================================

Shallow Copy:
- Flat objects
- Performance-critical code
- Immutable updates (React)

Deep Copy:
- Nested structures
- State snapshots
- Safe mutations

==============================================================
*/


/*
==============================================================
FINAL MEMORY LOCK
==============================================================

Shallow Copy:
- Top-level copied
- Nested reference shared

Deep Copy:
- Everything copied
- No shared reference

"Spread is NOT deep copy"

==============================================================
*/

console.log("\n===== END OF DEEP vs SHALLOW COPY =====");
