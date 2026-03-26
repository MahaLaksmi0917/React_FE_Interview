/**************************************************************
 *  DEBOUNCE – INTERVIEW READY REVISION FILE
 *  Copy-Paste into .js and run with node
 **************************************************************/

/*
==============================================================
WHAT IS DEBOUNCE?
==============================================================
Debounce ensures that:
- A function runs ONLY AFTER
- A specified delay
- And ONLY if no new event occurs during that delay

"Wait until the user stops doing something"
==============================================================
*/

console.log("===== BASIC DEBOUNCE =====");

/*
==============================================================
WITHOUT DEBOUNCE (PROBLEM)
==============================================================
*/

function apiCall(query) {
  console.log("API called with:", query);
}

// Simulating fast typing
apiCall("a");
apiCall("ak");
apiCall("akh");
apiCall("akhi");
apiCall("maha");

/*
Problem:
- API is called on EVERY keystroke
- Performance issue
*/


/*
==============================================================
BASIC DEBOUNCE IMPLEMENTATION
==============================================================
*/

console.log("\n===== BASIC DEBOUNCE IMPLEMENTATION =====");

function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);//The timer makes sure the function runs only after the user stops, not while they are still doing something.
// we have to clear the previous timer on every call to reset the waiting period. If we didn't clear it, the function would execute after the first delay, regardless of subsequent calls.
//for example if user types "a", then "ak" within 500ms, without clearTimeout, the apiCall would execute after 500ms of the first call ("a"), even though the user is still typing. With clearTimeout, the timer resets with each keystroke, ensuring apiCall only executes after the user stops typing for 500ms.
//the timer for a will cancelled when ak is typed, then the timer for ak will be cancelled when akh is typed, and so on. Only after the user stops typing for 500ms, the last timer will execute apiCall with "maha".
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Using debounce
const debouncedApiCall = debounce(apiCall, 500);

// Simulating typing
debouncedApiCall("a");
debouncedApiCall("ak");
debouncedApiCall("akh");
debouncedApiCall("akhi");
debouncedApiCall("maha");

// Only ONE call happens after 500ms


/*
==============================================================
HOW DEBOUNCE WORKS (STEP BY STEP)
==============================================================

1. Event happens
2. Old timer is cleared
3. New timer is set
4. If no event occurs during delay → function executes
5. If event occurs → timer resets

==============================================================
*/


/*
==============================================================
INTERVIEW TRAP: this & arguments
==============================================================
*/

console.log("\n===== THIS & ARGUMENTS PRESERVATION =====");

const user = {
  name: "AK",
  greet(message) {
    console.log(`${message}, ${this.name}`);
  },
};

const debouncedGreet = debounce(user.greet, 500);

// ❌ this will be lost if not careful
debouncedGreet("Hello");

// ✅ FIX: bind
const debouncedGreetFixed = debounce(user.greet.bind(user), 500);
debouncedGreetFixed("Hello");


/*
==============================================================
DEBOUNCE WITH IMMEDIATE EXECUTION
==============================================================
*/

console.log("\n===== DEBOUNCE IMMEDIATE =====");

function debounceImmediate(fn, delay, immediate = false) {
  let timer;

  return function (...args) {
    const callNow = immediate && !timer;

    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, delay);

    if (callNow) {
      fn.apply(this, args);
    }
  };
}

const debouncedImmediate = debounceImmediate(
  () => console.log("Executed"),
  500,
  true
);

debouncedImmediate();
debouncedImmediate();
debouncedImmediate();

// Runs immediately ONCE, then ignores until delay


/*
==============================================================
REAL-WORLD USE CASES
==============================================================

- Search input API calls
- Window resize
- Scroll stop detection
- Button double-click prevention

==============================================================
*/


/*
==============================================================
DEBOUNCE vs THROTTLE (INTERVIEW MUST)
==============================================================

Debounce:
- Executes AFTER user stops
- Best for input, search

Throttle:
- Executes EVERY fixed interval
- Best for scroll, resize

==============================================================
*/


/*
==============================================================
COMMON INTERVIEW QUESTIONS & ANSWERS
==============================================================

Q: Why clearTimeout?
A: To cancel previous scheduled execution.

Q: Why closure?
A: To preserve timer state across calls.

Q: Does debounce delay first call?
A: Yes (unless immediate = true)

Q: Does debounce lose events?
A: No, it postpones execution.

==============================================================
*/


/*
==============================================================
FINAL MEMORY LOCK
==============================================================

Debounce:
"Last event wins"

If events keep coming,
function keeps waiting.

==============================================================
*/

console.log("\n===== END OF DEBOUNCE REVISION =====");
