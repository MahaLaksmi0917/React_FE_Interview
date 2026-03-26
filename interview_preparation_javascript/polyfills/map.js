//A polyfill is a piece of code (usually JavaScript on the Web) used to 
// provide modern functionality on older browsers that do not natively support it.
Array.prototype.mahaMap = function (callBack, thisArgs) {
  if (this === null) {
    throw new TypeError("Cannot read properties of undefined.");
  }
  if (typeof callBack !== "function") {
    throw new TypeError(callBack, "Callback is not a function.");
  }

  const result = [];

  for (let i = 0; i < this.length; i++) {
    let resultToPush = callBack.call(thisArgs, this[i], i, this);
    console.log(resultToPush);
    if (i in this) {
      result.push(callBack.call(thisArgs, this[i], i, this));
    }
  }
  return result; 
};

const arrOneDouble = arrOne.mahaMap((data, index) => {
  return data * 2;
});

function testing() {
  let testingArr = [1, 2, 3, 5, 6];
  for (let i = 0; i < testingArr.length + 2; i++) {}
}
console.log(arrOneDouble);
// console.log(testing());

// key things to observe 
// this : is the original array 
// thisArgs is the another args we pass in the map method 
// Q: tricky questions what is (i in this)?
// Line-by-Line Explanation (DEEP)
// 1️⃣ Attaching method to Array prototype
// Array.prototype.mahaMap = function (callBack, thisArgs) {


// ✔ Adds mahaMap() to all arrays
// ✔ Just like native .map()
// ✔ Inside this function:

// this → the array on which mahaMap() is called

// Example:

// arrOne.mahaMap(...)


// 👉 this === arrOne

// 2️⃣ Safety check – invalid this
// if (this === null) {
//   throw new TypeError("Cannot read properties of undefined.");
// }


// ✔ Prevents calling map on null or undefined
// ✔ Same behavior as native .map()

// Example ❌:

// Array.prototype.mahaMap.call(null, cb)

// 3️⃣ Callback validation
// if (typeof callBack !== "function") {
//   throw new TypeError(callBack, "Callback is not a function.");
// }

//Callback holds a function reference which is executed later with controlled arguments and this value.
// ✔ .map() must receive a function
// ✔ Protects from:

// arr.map(123)

// 4️⃣ Result container
// const result = [];


// ✔ .map() always returns a new array
// ✔ Never mutates original array

// 5️⃣ Looping over array length
// for (let i = 0; i < this.length; i++) {


// ✔ Iterates using length
// ✔ Important:
// length ≠ number of actual elements

// Example:

// let a = [1, , 3];
// a.length === 3


// This is where (i in this) becomes critical 👇

// 6️⃣ Calling callback manually
// let resultToPush = callBack.call(thisArgs, this[i], i, this);
// console.log(resultToPush);


// ✔ .call() does two things:

// Sets this inside callback → thisArgs

// Passes arguments:

// current element

// index

// original array

// Same as native .map():

// callback(element, index, array)


// ⚠️ You are calling the callback twice (once here, once below).
// This log line is only for debugging.

// 7️⃣ ⭐ THE MOST IMPORTANT LINE ⭐
// if (i in this) {

// ❓ What is (i in this)?

// 👉 It checks whether index i actually exists in the array

// NOT whether:

// value is undefined

// index < length

// 🔥 Why this is needed

// JavaScript arrays can be sparse:

// let arr = [1, , 3];


// Internally:

// 0 in arr → true
// 1 in arr → false ❌ (hole)
// 2 in arr → true


// Without this check:

// this[i] // undefined
// callback(undefined) // WRONG


// Native .map() SKIPS empty slots
// Your polyfill must do the same.

// 8️⃣ Pushing mapped value
// result.push(callBack.call(thisArgs, this[i], i, this));


// ✔ Executes callback for valid index
// ✔ Pushes returned value into new array
// ✔ Preserves array order

// 9️⃣ Returning final array
// return result;


// ✔ Returns new transformed array
// ✔ Original array untouched

// 🔸 Usage Example
// const arrOneDouble = arrOne.mahaMap((data, index) => {
//   return data * 2;
// });


// ✔ Each element doubled
// ✔ New array returned
// ✔ Works like native .map()

// 🔸 Now the testing() Function
// function testing() {
//   let testingArr = [1, 2, 3, 5, 6];
//   for (let i = 0; i < testingArr.length + 2; i++) {}
// }

// Why length + 2?

// To show:

// i < length ❌ ≠ valid index


// Example:

// 4 in testingArr → true
// 5 in testingArr → false
// 6 in testingArr → false


// So:

// Loop runs

// But (i in array) filters invalid indices

// 🔑 FINAL ANSWER FOR INTERVIEW (MEMORIZE THIS)
// ❓ What does (i in this) do in map polyfill?

// (i in this) checks whether the current index actually exists in the array.
// It is used to skip sparse or empty slots, exactly like native Array.prototype.map().

//callback.call(thisArg, ...) --------
//We use call to control the execution context of the callback, matching native filter behavior.
//Executes the function
//Sets this explicitly
//Passes arguments individually
//callback(this[i], i, this) ❌ -> this inside callback is wrong

// inside callback this===thisArgs refers to global object (window in browsers) or undefined in strict mode.
// call allows us to set this to thisArgs (the second argument )

// “The callback is a function reference passed by the user that determines whether an element should be included. thisArg allows us to explicitly control the this value inside the callback. We use call to invoke the callback with the correct context and arguments, and i in this ensures sparse arrays are handled exactly like the native filter method.

// ❓ Why use call to invoke the callback in map polyfill?

// Using call allows us to set the this value inside the callback to thisArgs, matching native map behavior. It also lets us pass the current element, index, and original array as separate arguments.

// ❓ What is the purpose of thisArg in map polyfill?

// thisArg allows users to explicitly set the this value inside the callback function, providing flexibility in how the callback operates.

// We cannot set this directly because it is not a mutable variable. In JavaScript, this is determined by how a function is invoked. thisArg is passed as data, and we must use call or apply to bind it at execution time. This is why native methods use call, and polyfills must do the same to stay spec-compliant.

//Why call why not apply and bind?

// We use call because it allows us to pass arguments individually, which is more efficient for a known number of parameters,Executes immediately,No new function created,Sets this explicitly (three in this case). 
// apply requires an array of arguments, which adds unnecessary overhead. 
//  bind creates a new function, which is not needed here since we want to invoke the callback immediately with specific arguments.

// | Method | Executes Immediately | Creates New Function | Extra Memory   | Spec Accurate | permanent THIS
// | ------ | -------------------- | -------------------- | -------------- | ------------- |
// | call   | ✅ Yes                | ❌ No                 | ❌ No           | ✅ Yes         | ❌
// | apply  | ✅ Yes                | ❌ No                 | ⚠️ Yes (array) | ⚠️ Less ideal | ❌
// | bind   | ❌ No                 | ✅ Yes                | ❌❌ Yes         | ❌ No          |✅


// Arrow functions ignore thisArg because they do not have their own this. They lexically capture this from the surrounding scope at creation time, so call, apply, and bind cannot override it. Because polyfills rely on dynamic this binding to mimic native behavior, arrow functions cannot be used to implement polyfills correctly.
