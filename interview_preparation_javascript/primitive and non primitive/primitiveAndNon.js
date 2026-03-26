/**************************************************************
 *  PRIMITIVE vs NON-PRIMITIVE (REFERENCE) TYPES – JAVASCRIPT
 *  Copy-Paste Ready Revision File
 **************************************************************/

/*
--------------------------------------------------------------
PRIMITIVE DATA TYPES
--------------------------------------------------------------
- Stored as VALUE
- Copied by VALUE
- Immutable
- Stored in Stack
- Changing one variable does NOT affect another
--------------------------------------------------------------
Types:
string, number, boolean, null, undefined, symbol, bigint
--------------------------------------------------------------
*/

console.log("===== PRIMITIVE TYPES =====");

let a = "AK";     // primitive string
let b = a;        // value is copied

b = "BK";         // new value assigned to b

console.log("b:", b); // BK
console.log("a:", a); // AK

// Explanation:
// a and b hold independent values
// Changing b does not touch a

/*
Memory representation (simplified):

a -> "AK"
b -> "AK"   (copy)
*/


/*
--------------------------------------------------------------
NON-PRIMITIVE DATA TYPES
--------------------------------------------------------------
- Stored in Heap
- Copied by REFERENCE (address)
- Mutable
- Variables point to same object
--------------------------------------------------------------
Types:
Object, Array, Function, Date, Map, Set
--------------------------------------------------------------
*/

console.log("\n===== NON-PRIMITIVE TYPES =====");

let x = { name: "maha" }; // object stored in heap
let y = x;                 // reference is copied

y.name = "Chowhan";        // mutating the object

console.log("x:", x); // { name: "Chowhan" }
console.log("y:", y); // { name: "Chowhan" }

// Explanation:
// x and y point to the SAME object
// Mutation via y affects x

/*
Memory representation:

x ──┐
    ├──> { name: "maha" }
y ──┘
*/


/*
--------------------------------------------------------------
ARRAY REFERENCE EXAMPLE (COMMON INTERVIEW TRAP)
--------------------------------------------------------------
*/

console.log("\n===== ARRAY REFERENCE TRAP =====");

let arr1 = [1, 2, 3];
let arr2 = arr1;

arr2.push(4);

console.log("arr1:", arr1); // [1,2,3,4]
console.log("arr2:", arr2); // [1,2,3,4]

// Both share same reference


/*
--------------------------------------------------------------
HOW TO AVOID REFERENCE MUTATION
--------------------------------------------------------------
*/

/*
SHALLOW COPY
- Copies first level only
*/

console.log("\n===== SHALLOW COPY =====");

let originalObj = { a: 1, b: 2 };
let shallowCopy = { ...originalObj };

shallowCopy.a = 100;

console.log("originalObj:", originalObj); // { a: 1, b: 2 }
console.log("shallowCopy:", shallowCopy); // { a: 100, b: 2 }


/*
DEEP COPY
- Copies entire nested structure
*/

console.log("\n===== DEEP COPY =====");

let deepOriginal = { a: 1, b: { c: 2 } };
let deepCopy = structuredClone(deepOriginal);

deepCopy.b.c = 999;

console.log("deepOriginal:", deepOriginal); // { a:1, b:{c:2} }
console.log("deepCopy:", deepCopy);         // { a:1, b:{c:999} }


/*
--------------------------------------------------------------
CONST WITH OBJECT (INTERVIEW FAVORITE)
--------------------------------------------------------------
*/

console.log("\n===== CONST OBJECT MUTATION =====");

const user = { name: "AK" };

user.name = "BK"; // Allowed
// user = {};     // ❌ Not allowed (reassignment)

console.log("user:", user); // { name: "BK" }

// const protects the reference, NOT the object


/*
--------------------------------------------------------------
FINAL MEMORY LOCK
--------------------------------------------------------------

Primitive  → VALUE copied → Independent
Object     → REFERENCE copied → Shared

"Variables don't store objects,
they store references to objects."

--------------------------------------------------------------
*/

console.log("\n===== END OF REVISION FILE =====");
