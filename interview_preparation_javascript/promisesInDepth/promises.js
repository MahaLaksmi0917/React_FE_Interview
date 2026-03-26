// Callback function enables us to do async programming in JS. We use this for some functions that are interdependent on each other for execution. 
// For eg: Ordering can be done after adding items in cart. 
// So we pass cb functions as argument to functions which then call the cb function passed. However this causes some problems:

//1.Callback Hell : When more than 1 APIs depend on each other to get call so then we pass the callback function inside callback 
// function so it created nested callback function this makes our code less maintainable and readable this is callback hell. 
// It also know as "Pyramid of Doom".
const cartt = ["shoes", "pants", "kurtas"];
api.createOrder(cartt, function () {
    api.proceedPayment(function () {
        api.showSummary(function () {
            api.updateWallet(function () {
                console.log("Callback Hell");
            });
        });
    });
});

//   Why it’s a problem:
//     🔹Code becomes difficult to read and maintain.
//     🔹It’s hard to debug or trace errors.
//     🔹Each function depends on the previous one, so it becomes very risky if any one of them fails.

//2.Inversion of Control:  When we pass a callback function into another function then the execution of callback function
// is depend on that function so in this way we loose the control over our code this is know as Inversion of Control. 

//   Ex: Let’s say you’re building a shopping app:
//     You first Create Order
//     🔹Then do Payment
//     🔹Then show Order Summary
//     🔹Finally, Update Wallet
//    Now, if you pass the Order Summary function inside the Payment function (as a callback), you're trusting a few things:
//    That payment() will run correctly
//    That it will call the Order Summary function at the right time
//    That there are no errors from the backend or network
//    But if something goes wrong inside payment(), your Order Summary function might never get called. This means you lose control over what happens next.



//--------------------------------------------------------PROMISES IN DEPTH--------------------------------------------------------
// 1. Before promise we used to depend on callback functions which would result in 1.) Callback Hell (Pyramid of doom) | 2.) Inversion of control
// 2. Inversion of control is overcome by using promise.
//   2.1) A promise is an object that represents eventual completion/failure of an asynchronous operation.
//   2.2) A promise has 3 states: pending | fulfilled | rejected.
//   2.3)  As soon as promise is fulfilled/rejected => It updates the empty object which is assigned undefined in pending state.
//   2.4) A promise resolves only once and it is immutable. 
//   2.5) Using .then() we can control when we call the cb(callback) function.

// 3. To avoid callback hell (Pyramid of doom) => We use promise chaining. This way our code expands vertically instead of horizontally. Chaining is done using '.then()'
// 4. A very common mistake that developers do is not returning a value during chaining of promises. Always remember to return a value. This returned value will be used by the next .then()

const cart = ["shoes", "pants", "kurtas"];

createOrder(cart).then(function (orderId) {
    console.log("Order ID:", orderId);
    return orderId
})
.catch(function (error) {//it will handle all errors that occur in the above .then() block it will no stop the execution of the next .then() block 
//it will just log the error and move to the next .then() block
    console.error("Error:", error);
})
.then(function (orderId) {
    return proceedPayment(orderId);
})
.then(function (paymentInfo) {
    console.log("Payment Info:", paymentInfo);
})
.catch(function (error) {
    console.error("Error:", error);
})
.then(function () {
    console.log("No matteer what happens, this will run");
})

function createOrder(cart) {
    return new Promise(function (resolve, reject) {
        if (!validateCart(cart)) {
            reject("Invalid Cart");
        }
        if (orderId) {
            const orderId = Math.floor(Math.random() * 1000);
            resolve(orderId);
        }
    });
}

function validateCart(cart) {
    // Validate cart items
    return true; // Assuming cart is valid for this example
}

function proceedPayment(orderId) {
    return new Promise(function (resolve, reject) {
        // Simulate payment processing
        const paymentInfo = { status: "success", orderId: orderId };
        resolve(paymentInfo);
    }); 
}


// 1. Promise can be created using a new Promise() constructor function.
// 2. This constructor function takes a callback function as argument. 
// 3. The callback function has 2 arguments named 'resolve' and 'reject'. Resolve and reject are the keywords provided by JS.
// 4. We can only resolve or reject a promise. Nothing else can be done.
// 5. An error can also be created using new Error('error message').
// 6. There is also .catch() which is used to attach a failure callback function that handles any error that pops up during the execution of promise chain.
// 7. .catch only handles error of .then() that are present above it. If there is any .then() below it, catch will not handle any error for that, also that ,then will get executed no matter what.
// 8. It can be useful in a way if we want to catch error for a particular portion of a chain.
// 9. We can have multiple catch based on requirement and then a general catch at the end.
// 10. Always remember to return a value in the promise chain for the next .then to use .
// 11. If it returns a value => It will be  used as an argument in next function. If it is a promise then the next .then in the promise chain is attached to the promise returned by the current callback function.

// PROMISE ALL
const p1=new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve("Promise 1 resolved")
    }, 5000);
});

const p2=new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve("Promise 2 resolved")
    }, 3000);
});

const p3=new Promise((resolve,reject)=>{
    setTimeout(() => {
        // resolve("Promise 3 resolved")
     reject("Promise 3 rejected")
    }, 1000);
});

Promise.all([p1,p2,p3])
.then((res)=>{
    console.log(res);
}).catch((error)=>{
    console.error(error);
});// output: ["Promise 1 resolved", "Promise 2 resolved", "Promise 3 resolved"] after 5 seconds. 
// Promise.all waits for all promises to resolve and then returns an array of results. If any promise rejects, it will catch the error.
// output: "Promise 3 rejected" after 1 second. Promise.all will reject as soon as any promise rejects.

Promise.allSettled([p1,p2,p3])
.then((res)=>{
    console.log(res);
});// output: [{status: "fulfilled", value: "Promise 1 resolved"}, {status: "fulfilled", value: "Promise 2 resolved"}, {status: "rejected", reason: "Promise 3 rejected"}] after 5 seconds.
// Promise.allSettled waits for all promises to settle (either resolve or reject) and then returns an array of objects with the status and value/reason of each promise. It does not reject if any promise rejects.

Promise.race([p1, p2, p3])
.then((res)=>{
    console.log(res);
});// output: "Promise 3 rejected" after 1 second. Promise.race returns the result of the first promise that settles (either resolves or rejects).
//  In this case, p3 rejects first, so it returns "Promise 3 rejected".

//Settle (means got resultit can be)having 2 states: resolve or reject 
                        //   success or failure
                        //   fulfilled or rejected

Promise.any([p1, p2, p3])
.then((res)=>{
    console.log(res);
}).catch((error)=>{
    console.error(error);
});// output: "Promise 1 resolved" after 5 seconds. Promise.any returns the result of the first promise that fulfills (resolves). If all promises reject, it will gives aggregate error
//Handling aggregate errors in Promise.any involves accessing the errors in an array format, allowing for comprehensive error management and analysis.


//-----------------Quick  Recap-----------------
// 1. Promises are used to handle asynchronous operations in JavaScript and provide a cleaner way to manage callbacks.
// 2. A promise can be in one of three states: pending, fulfilled, or rejected.
// 3. Promises can be chained using .then() for success and .catch() for error handling.
// 4. Promise.all handles multiple promises simultaneously, returning an array of results when all promises are fulfilled, and throwing an error if any promise fails.
//If any promise in Promise.all fails, the entire operation fails, and an error is thrown immediately without waiting for other promises.

// 5. Promise.allSettled waits for all promises to settle (whether fulfilled or rejected) before returning an array of results or errors, making it suitable for scenarios where partial failures are acceptable

//6.  Promise.race returns the result of the first settled promise, whether it's success or failure, making it ideal for scenarios where the fastest response is required.

//7.Promise.any is similar to Promise.race but waits for the first successful promise rather than the first settled one, making it suitable for scenarios where success is prioritized over speed.