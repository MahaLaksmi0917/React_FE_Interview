/**************************************************************
 *  ARRAY METHODS – INTERVIEW READY REVISION FILE
 *  Copy-Paste into .js and run with node
 **************************************************************/

/*
==============================================================
1. MAP
==============================================================
- Transforms each element
- Returns NEW array
- Same length as original
- Does NOT mutate original
*/

// Internally, map() is basically doing this:

// for (let i = 0; i < array.length; i++) {
//   newArray[i] = callback(array[i], i, array);
// }

console.log("\n===== MAP =====");

const mapArr = [1, 2, 3];

const mapResult = mapArr.map((num, index, array) => {
  return num * 2;
});

console.log("mapArr:", mapArr); // [1,2,3]
console.log("mapResult:", mapResult); // [2,4,6]

/*PARSEINT in map
 - converts a string argument to an integer value,
 - parseInt(string , radix) - radix is the number betw (2 to 36)
 - parseInt("123") => 123
 - parseInt("10", 2) => 2 (binary 10 is decimal 2)
 - parseInt("10", 10) => 10 (decimal 10 is decimal 10)
 - parseInt("10", 16) => 16 (hexadecimal 10 is decimal 16)
 - parseInt("123.45") => 123 (stops at decimal point)
 - parseInt("10 years"); => 10 (stops at space)
 - parseInt("years 10"); => NaN (no valid number at start)
- parseInt("FF", 16) => 255 (hexadecimal FF is decimal 255)
 */

["10", "20", "30"].map(parseInt); // [10, NaN, NaN] ( parseInt("10", 0) = 10, parseInt("20", 1) = NaN, parseInt("30", 2) = NaN  though 2 is binary which is valid but 3 is not a binary number)
//sol
["10", "20", "30"].map((str) => parseInt(str, 10));
["10", "20", "30"].map(Number); // [10, 20, 30] Number() only takes one argument (Number(value)) ignores extra arg passed by map
//map() passes (value, index), and parseInt treats the index as radix, causing NaN.”

// MUTATE OBJ inside map
const users = [{ age: 20 }, { age: 30 }];

const result = users.map(u => {
  u.age += 1;
  return u;
}); 
// wrong practice as mutating original object , both pointing to same object in memory loation
//If you change properties on an object → you are mutating it
//If you create a new object → you are immutable
//map() only creates a new array
//It does NOT create new objects for you
users.map(u => ({ ...u, age: u.age + 1 }));
//In the first version, map returns the same object reference after mutating it.
//In the second version, spread creates a new object, so the original array remains unchanged.


/*
==============================================================
2. FILTER
==============================================================
- Filters elements based on condition
- Returns NEW array
- Length may be smaller
*/

console.log("\n===== FILTER =====");

const filterArr = [1, 2, 3, 4, 5];

const filterResult = filterArr.filter((num) => num % 2 === 0);

console.log("filterResult:", filterResult); // [2,4]

[0, 1, false, true, "", "hi", null].filter(Boolean);
// [1, true, "hi"]

//The global isFinite() function determines whether a value is finite number
// , first converting the value to a number if necessary (type coercion)
console.log(isFinite(123));        // true
console.log(isFinite("123"));      // true (coerced to number 123)
console.log(isFinite(null));       // true (coerced to number 0)
console.log(isFinite(Infinity));   // false
console.log(isFinite(NaN));        // false
console.log(isFinite("Hello"));    // false (coerced to NaN)

/*
==============================================================
3. REDUCE (MOST IMPORTANT)
==============================================================
- Reduces array to single value
- Can return ANY type (number, string, array, object,map/set)
*/

console.log("\n===== REDUCE =====");

const reduceArr = [1, 2, 3, 4];

const sum = reduceArr.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log("sum:", sum); // 10

/*
==============================================================
4. FOREACH
==============================================================
- Iterates only
- Returns undefined
- Used for side effects
*/

console.log("\n===== FOREACH =====");

const forEachArr = [10, 20, 30];

const forEachResult = forEachArr.forEach((num) => {
  console.log("num:", num);
});

console.log("forEachResult:", forEachResult); // undefined

/*
==============================================================
5. FIND
==============================================================
- Returns FIRST matching element
- Stops once found
*/

console.log("\n===== FIND =====");

const findArr = [5, 12, 8, 130];

const found = findArr.find((num) => num > 10);

console.log("found:", found); // 12

/*
==============================================================
6. FINDINDEX
==============================================================
- Returns index of FIRST match
- Returns -1 if not found
*/

console.log("\n===== FINDINDEX =====");

const index = findArr.findIndex((num) => num > 100);
console.log("index:", index); // 3

/*
==============================================================
7. SOME
==============================================================
- Returns true if AT LEAST ONE matches
*/

console.log("\n===== SOME =====");

const someResult = findArr.some((num) => num > 100);
console.log("someResult:", someResult); // true

/*
==============================================================
8. EVERY
==============================================================
- Returns true if ALL match
*/

console.log("\n===== EVERY =====");

const everyResult = findArr.every((num) => num > 0);
console.log("everyResult:", everyResult); // true

/*
==============================================================
9. INCLUDES
==============================================================
- Checks value existence
- Uses SameValueZero (NaN supported)
*/

console.log("\n===== INCLUDES =====");

const includesArr = [1, 2, NaN];

console.log(includesArr.includes(2)); // true
console.log(includesArr.includes(NaN)); // true

/*
==============================================================
10. INDEXOF
==============================================================
- Returns index
- Does NOT detect NaN
*/

console.log("\n===== INDEXOF =====");

console.log(includesArr.indexOf(2)); // 1
console.log(includesArr.indexOf(NaN)); // -1

/*
==============================================================
11. SLICE
==============================================================
- Returns NEW array
- Does NOT mutate
*/

console.log("\n===== SLICE =====");

const sliceArr = [1, 2, 3, 4];

const sliced = sliceArr.slice(1, 3);

console.log("sliceArr:", sliceArr); // [1,2,3,4]
console.log("sliced:", sliced); // [2,3]

/*
==============================================================
12. SPLICE (DANGEROUS)
==============================================================
- MUTATES original array
- Can remove / inser
- return Array of removed elements
*/

console.log("\n===== SPLICE =====");
//array.splice(startIndex, deleteCount, item1, item2, ...); //inserts at startIndex after deleting deleteCount items

const spliceArr = [1, 2, 3, 4];

const removed = spliceArr.splice(1, 2, 99);

console.log("removed:", removed); // [2,3]
console.log("spliceArr:", spliceArr); // [1,99,4]

const arr = [1, 2, 3, 4];
arr.splice(-1, 1);
console.log(arr); // [1, 2, 3]
// -1 means “start from the end”

/*
==============================================================
13. SORT (INTERVIEW TRAP)
==============================================================
- Mutates array
- Sorts as STRING by default
*/

console.log("\n===== SORT =====");

const sortArr = [10, 5, 2, 40];

sortArr.sort();
console.log("wrong sort:", sortArr); // [10,2,40,5] - sorted as strings lexicographically dictionary order

sortArr.sort((a, b) => a - b);
console.log("correct sort:", sortArr); // [2,5,10,40]

/*
==============================================================
14. FLAT
==============================================================
- Flattens nested arrays
- flat() returns a new array and doesn’t mutate.
- Default depth is 1.
- It removes empty slots.
- For deep flatten, use flat(Infinity) or reduce recursion.
*/

console.log("\n===== FLAT =====");

const flatArr = [1, [2, [3, 4]]];

console.log(flatArr.flat()); // [1,2,[3,4]]
console.log(flatArr.flat(2)); // [1,2,3,4]

//flatMap only flattens 1 level.

/*
==============================================================
15. CONCAT
==============================================================
- Merges arrays
- Returns new array
*/

console.log("\n===== CONCAT =====");

const c1 = [1, 2];
const c2 = [3, 4];

const merged = c1.concat(c2);

console.log("merged:", merged); // [1,2,3,4]

/*
==============================================================
16. PUSH / POP (MUTATING)
==============================================================
*/

console.log("\n===== PUSH / POP =====");

const ppArr = [1, 2];

ppArr.push(3);
console.log("after push:", ppArr); // [1,2,3]

ppArr.pop();
console.log("after pop:", ppArr); // [1,2]

/*
==============================================================
17. SHIFT / UNSHIFT (MUTATING)
==============================================================
*/

console.log("\n===== SHIFT / UNSHIFT =====");

const suArr = [2, 3];

suArr.unshift(1);
console.log("after unshift:", suArr); // [1,2,3]

suArr.shift();
console.log("after shift:", suArr); // [2,3]

/*
==============================================================
FINAL MEMORY LOCK
==============================================================

map      → transform → new array
filter   → condition → new array
reduce   → single value
forEach  → side effects only
slice    → safe
splice   → dangerous (mutates)
sort     → string by default (mutates)

==============================================================
*/

console.log("\n===== END OF ARRAY METHODS REVISION =====");
 
//----MUTATES original array

// | Method         | What it does             | What it returns               |
// | -------------- | ------------------------ | ----------------------------- |
// | `push()`       | Add to end               | **New length**                |
// | `pop()`        | Remove from end          | **Removed element**           |
// | `shift()`      | Remove from start        | **Removed element**           |
// | `unshift()`    | Add to start             | **New length**                |
// | `splice()`     | Add / remove / replace   | **Array of removed elements** |
// | `sort()`       | Reorders elements        | **Same array (sorted)**       |
// | `reverse()`    | Reverses order           | **Same array (reversed)**     |
// | `copyWithin()` | Copies part inside array | **Same array**                |
// | `fill()`       | Fills with value         | **Same array**                |

//----DOES NOT MUTATE original array

// | Method        | What it does           | What it returns          |
// | ------------- | ---------------------- | ------------------------ |
// | `map()`       | Transform elements     | **New array**            |
// | `filter()`    | Select elements        | **New array**            |
// | `reduce()`    | Reduce to single value | **Any value**            |
// | `concat()`    | Merge arrays           | **New array**            |
// | `slice()`     | Extract portion        | **New array**            |
// | `flat()`      | Flatten array          | **New array**            |
// | `flatMap()`   | Map + flat(1)          | **New array**            |
// | `includes()`  | Check existence        | **Boolean**              |
// | `indexOf()`   | Find index             | **Number**               |
// | `find()`      | Find element           | **Element or undefined** |
// | `findIndex()` | Find index             | **Number**               |
// | `every()`     | All pass?              | **Boolean**              |
// | `some()`      | Any pass?              | **Boolean**              |
// | `join()`      | Convert to string      | **String**               |