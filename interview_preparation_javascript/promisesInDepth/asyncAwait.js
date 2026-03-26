//async is a keyword that is used to declare an asynchronous function(to handle promises). It allows us to write asynchronous code in a more synchronous way.
//async function always returns a promise. If we return a value from an async function, it will be wrapped in a resolved promise. If we throw an error, it will be wrapped in a rejected promise.
//async function measn that the function will always return a promise, and we can use await inside it to wait for other promises to resolve before proceeding with the execution of the code. 
async function fetchData() {
    return "Data fetched successfully";
}

const dataPromise = fetchData();
//to get data from promise
 dataPromise.then((data)=>{
    console.log(data); // output: "Data fetched successfully"
}).catch((error)=>{
    console.error(error);
});

//async and await are used to handle promises
//await is a keyword that is used to wait for a promise to resolve. 
//await keyword is used infornt of a promise and it resolves the promise
//instead of using  .then() to handle the resolved value of a promise, we can use await to get the resolved value directly
// await can only be used inside an async function. If we try to use it outside, it will throw a syntax error.

//diffference between async/await and promises:
const p1 = new Promise(((resolve, reject)=>{
    setTimeout(()=>{
        resolve("Promise resolved succesflly in p1")
    },10000)
}))

const p2 = new Promise(((resolve, reject)=>{
    setTimeout(()=>{
        resolve("Promise resolved succesflly in p2")
    },5000)
}))

async function handlePromises() {
    console.log("Hello promises");
//js engine waits for promise to get reslve 
    const val1= await p1;
    console.log("Just waiting for p1 to resolve");
    const val2= await p2;
    console.log("Just waiting for p2 to resolve");  
}

//output:
// Hello promises
// Just waiting for p1 to resolve (after 10 seconds)
// Just waiting for p2 to resolve (after 5 seconds) 
// Promise resolved succesflly in p1 (after 10 seconds)
// Promise resolved succesflly in p2 (after 5 seconds)

handlePromises();


function getData() {
    //js engie will  not wait from promise to be resoolved

    p1.then((res)=>{ console.log(res)})
    console.log("Hello");
}
getData();
//output:
// Hello
// Promise resolved succesflly in p1 (after 10 seconds)

//fetch - The fetch() method of the Window interface starts the process of fetching a resource from the network, returning a promise that is fulfilled once the response is available.
