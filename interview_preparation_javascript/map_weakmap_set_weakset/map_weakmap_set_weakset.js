/**************************************************************
 *  MAP, WEAKMAP, SET, WEAKSET – INTERVIEW READY REVISION FILE
 *  Copy-Paste into .js and run with node
 **************************************************************/

/*
==============================================================
MAP
==============================================================
- Collection of key-value pairs
- Keys can be ANY data type (object, function, primitive)
- Maintains insertion order
- Iterable
- SameValueZero 
 map.set(NaN, 1);
map.get(NaN); // works beacuse SameValueZero considers NaN equal to NaN.
- OrderedHashMap {
   hashTable
   keyStorage
   valueStorage
   size
} A Map is internally something like: A hash is computed for the key, and the value is stored in a hash table. 
 The key itself is stored in a separate storage to maintain the order of keys, and the values are stored in another storage.
  This allows for efficient lookups while maintaining the order of insertion.
==============================================================
*/

console.log("===== MAP =====");

const map = new Map();

map.set("name", "AK");              // string key
map.set(1, "number key");           // number key
map.set(true, "boolean key");       // boolean key

const objKey = { id: 1 };
map.set(objKey, "object key");      // object key ,Map stores the real object reference, not string version.

console.log(map.get("name"));       // AK
console.log(map.get(objKey));       // object key

console.log("Map size:", map.size); // 4

// Iterating Map
for (let [key, value] of map) {
  console.log(key, "=>", value);
} 

// map holds strong refernce
let user1 = { name: "John" };

map.set(user1, "data");

user1 = null;
map.get(user1); // still works because map holds strong reference to the original object 


/*
Why Map over Object?
- Object keys are always strings
- Map allows ANY key type
- Better performance for frequent add/remove
- Normal objects convert keys to string.map does not
*/


/*
==============================================================
WEAKMAP
==============================================================
- Key-value pairs
- Keys MUST be objects //Why only objects allowed? Because garbage collection works only on objects.Primitives (like numbers, strings) cannot be garbage collected like that.
- Weakly referenced keys
- NOT iterable
- Garbage collected automatically
==============================================================
*/

console.log("\n===== WEAKMAP =====");

let weakMap = new WeakMap();

let user = { name: "AK" };

weakMap.set(user, "private data");

console.log(weakMap.get(user)); // private data

user = null; // reference removed

/*
After this:
- Object becomes unreachable
- Garbage collector removes it
- weakMap entry disappears automatically
*/

// ❌ Not allowed:
// weakMap.set("name", "value"); // Error
//You can't check size.

/*
Use cases:
- Private data
- Caching
- Avoid memory leaks
*/


/*
==============================================================
SET
==============================================================
- Collection of UNIQUE values
- No duplicate values allowed
- Iterable
- Maintains insertion order
==============================================================
*/

console.log("\n===== SET =====");

const set = new Set();

set.add(1);
set.add(2);
set.add(2); // ignored
set.add("AK");
set.add({ id: 1 });
set.add({a:1});
set.add({a:1}); // These are different objects → both added Because identity is different.

console.log(set); // duplicates removed output: Set(5) { 1, 2, 'AK', { id: 1 }, { a: 1 },{ a: 1 } } 
//{a:1} !== {a:1}
//If You Want Only One {a:1} --- You must reuse the same reference:
const obj = {a:1};

set.add(obj);
set.add(obj); // duplicate reference

console.log(set.size); // now 5

console.log("Set size:", set.size);

// Iterating Set
for (let value of set) {
  console.log(value);
}

// Checking existence
console.log(set.has(1)); // true

// Removing value
set.delete(2);
console.log(set);


/*
==============================================================
WEAKSET
==============================================================
- Collection of UNIQUE OBJECTS only
- Values MUST be objects
- Weakly referenced
- NOT iterable
==============================================================
*/

console.log("\n===== WEAKSET =====");

let weakSet = new WeakSet();

let obj1 = { a: 1 };
let obj2 = { b: 2 };

weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1)); // true

obj1 = null;

/*
After this:
- obj1 removed from WeakSet automatically
*/

// ❌ Not allowed:
// weakSet.add(1); // Error
// weakSet.forEach(...) // Error


/*
==============================================================
MAP vs OBJECT (INTERVIEW QUESTION)
==============================================================

Object:
- Keys: string / symbol
- Not iterable by default
- Prototype pollution possible

Map:
- Keys: ANY type
- Iterable
- Better performance for frequent operations

==============================================================
*/


/*
==============================================================
MAP vs WEAKMAP
==============================================================

Map:
- Strong reference
- Iterable
- Manual cleanup needed

WeakMap:
- Weak reference
- Not iterable
- Automatic garbage collection

==============================================================
*/


/*
==============================================================
SET vs ARRAY
==============================================================

Array:
- Allows duplicates
- index-based access

Set:
- Unique values only
- Faster lookup
- No index

==============================================================
*/


/*
==============================================================
SET vs WEAKSET
==============================================================

Set:
- Any value type
- Iterable
- Strong reference

WeakSet:
- Objects only
- Not iterable
- Weak reference (GC friendly)

==============================================================
*/


/*
==============================================================
FINAL MEMORY LOCK
==============================================================

Map      → key-value (any key)
WeakMap → key-value (object keys only, weak)
Set      → unique values
WeakSet → unique objects (weak)

WeakMap & WeakSet:
- No iteration
- GC removes entries automatically

==============================================================
*/

console.log("\n===== END OF MAP / WEAKMAP / SET / WEAKSET REVISION =====");
