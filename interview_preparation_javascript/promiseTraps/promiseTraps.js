/**************************************************************
 *  PROMISE & MICROTASK QUEUE – INTERVIEW TRAPS
 *  Copy-Paste into .js and run
 **************************************************************/

/*
==============================================================
EVENT LOOP OVERVIEW (VERY IMPORTANT)
==============================================================

Execution order:
1. Call Stack (sync code)
2. Microtask Queue  (Promise.then, catch, finally, queueMicrotask)
3. Macrotask Queue  (setTimeout, setInterval, setImmediate)

RULE:
👉 Microtasks ALWAYS run before macrotasks

==============================================================
*/

console.log("===== EVENT LOOP START =====");


/*
==============================================================
TRAP 1: PROMISE vs setTimeout
==============================================================
*/

console.log("\n===== TRAP 1 =====");

console.log("Start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

/*
OUTPUT:
Start
End
Promise
setTimeout

WHY?
- Promise.then → microtask
- setTimeout → macrotask
*/


/*
==============================================================
TRAP 2: MULTIPLE PROMISES
==============================================================
*/

console.log("\n===== TRAP 2 =====");

Promise.resolve().then(() => {
  console.log("P1");
});

Promise.resolve().then(() => {
  console.log("P2");
});

console.log("Sync");

/*
OUTPUT:
Sync
P1
P2

WHY?
- All microtasks run AFTER sync code
- Order preserved (FIFO)
*/


/*
==============================================================
TRAP 3: PROMISE INSIDE setTimeout
==============================================================
*/

console.log("\n===== TRAP 3 =====");

setTimeout(() => {
  console.log("Timeout Start");

  Promise.resolve().then(() => {
    console.log("Promise inside timeout");
  });

  console.log("Timeout End");
}, 0);

/*
OUTPUT:
Timeout Start
Timeout End
Promise inside timeout

WHY?
- setTimeout callback runs (macrotask)
- Promise.then inside → microtask
- Microtask runs BEFORE next macrotask
*/


/*
==============================================================
TRAP 4: CHAINED PROMISES
==============================================================
*/

console.log("\n===== TRAP 4 =====");

Promise.resolve()
  .then(() => {
    console.log("Then 1");
  })
  .then(() => {
    console.log("Then 2");
  })
  .then(() => {
    console.log("Then 3");
  });

console.log("Sync End");

/*
OUTPUT:
Sync End
Then 1
Then 2
Then 3

WHY?
- Each .then is queued as a microtask
- Runs sequentially
*/


/*
==============================================================
TRAP 5: PROMISE + setTimeout MIX
==============================================================
*/

console.log("\n===== TRAP 5 =====");

setTimeout(() => {
  console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
});

setTimeout(() => {
  console.log("Timeout 2");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 2");
});

/*
OUTPUT:
Promise 1
Promise 2
Timeout 1
Timeout 2

WHY?
- All microtasks drain first
- Then macrotasks
*/


/*
==============================================================
TRAP 6: PROMISE RETURN VALUE
==============================================================
*/

console.log("\n===== TRAP 6 =====");

Promise.resolve(10)
  .then(val => {
    console.log(val); // 10
    return val * 2;
  })
  .then(val => {
    console.log(val); // 20
  });


/*
==============================================================
TRAP 7: PROMISE vs queueMicrotask
==============================================================
*/

console.log("\n===== TRAP 7 =====");

queueMicrotask(() => {
  console.log("queueMicrotask");
});

Promise.resolve().then(() => {
  console.log("Promise.then");
});

/*
OUTPUT:
queueMicrotask
Promise.then

WHY?
- Both are microtasks
- FIFO order
*/


/*
==============================================================
TRAP 8: async / await IS PROMISE
==============================================================
*/

console.log("\n===== TRAP 8 =====");

async function testAsync() {
  console.log("Inside async");
  await Promise.resolve();
  console.log("After await");
}

console.log("Before async");
testAsync();
console.log("After async");

/*
OUTPUT:
Before async
Inside async
After async
After await

WHY?
- await pauses function
- rest goes to microtask queue
*/


/*
==============================================================
TRAP 9: PROMISE ERROR HANDLING
==============================================================
*/

console.log("\n===== TRAP 9 =====");

Promise.reject("Error")
  .catch(err => {
    console.log("Caught:", err);
  });

console.log("After reject");

/*
OUTPUT:
After reject
Caught: Error
*/


/*
==============================================================
TRAP 10: PROMISE INSIDE PROMISE
==============================================================
*/

console.log("\n===== TRAP 10 =====");

Promise.resolve().then(() => {
  console.log("Outer Promise");

  Promise.resolve().then(() => {
    console.log("Inner Promise");
  });
});

/*
OUTPUT:
Outer Promise
Inner Promise

WHY?
- Inner promise queued AFTER outer
*/


/*
==============================================================
FINAL MEMORY LOCK
==============================================================

1. Sync code first
2. Microtask queue fully drains
3. Macrotask queue executes next

Promise.then / catch / finally → MICROTASK
setTimeout / setInterval        → MACROTASK

==============================================================
*/

console.log("\n===== END OF PROMISE & MICROTASK REVISION =====");
