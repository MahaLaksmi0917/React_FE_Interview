// What actually decides this in JavaScript

// this is NOT decided by where a function is written.
// this is decided by HOW the function is CALLED.

// this is set by the Javascript that ===>   Once you use:
// call
// apply
// bind
// You are manually controlling this.

function printCustomerDetails(companyName, role) {
  return `Name : ${this.userName} , Company : ${companyName}, Role:  ${role}`;
}

let personDetails = {
  userName: "Maha",
  role: "Senior software engineer",
  companyName: "EPAM systems",
};

let personDetails2 = {
  userName: "chowhan",
  role: "React engineer",
  companyName: "Pixentch systems",
};

// console.log(printCustomerDetails.call(personDetails , "pixentech" , "software engineer"));
// console.log(printCustomerDetails.apply(personDetails , ["pixentech" , "software engineer"]));

// use bind when you  need to call a function and some of the arguments are fixed and other are dynamic and those needs to calculate later on..
// example calculate AreaAndWidth....

// best example for bind ...
// wiidth is fixed one of the argument is fixed her and second one is dynamic soo here the bind method returns a function...
function calculateAreaWidth10(width, height) {
  return width * height * this.x;
}

// let xNumber = {
//     x : 2
// }

// let setWidth = calculateAreaWidth10.bind(xNumber , 10); // why nulll cause we dont want to use any "this" reference here ... soo...
// console.log(setWidth(5));

// let xNumber2 = {
//     x : 3
// }

// let anotherSetWidth = calculateAreaWidth10.call(xNumber2 , 5 , 5);
// console.log(anotherSetWidth)

function showX() {
  return this.x;
}
const obj1 = { x: 10 };
const boundFn = showX.bind(obj1);

console.log(boundFn()); // 10;

const reBound = boundFn.bind({ x: 85686 });
console.log(reBound()); // 10 why once we attach this using bind its fixed and its not changable ... we cannot change it


//--------------------INTERVIEW LEVEL qns--------------------//

// Q1. Why do we need call, apply and bind methods?
// A1. They allow us to explicitly set the this context for function invocations, enabling method borrowing, function currying, and dynamic context assignment.

// Q2. What is the difference between call and apply?
// A2. call invokes a function with a specified this value and individual arguments, while apply invokes it with a specified this value and an array of arguments.

// Q3. When would you use bind instead of call or apply?
// A3. Use bind when you want to create a new function with a fixed this context and optional preset arguments, without invoking it immediately.

// Q4. Can you change the this context of a function created with bind?
// A4. No, once a function is bound using bind, its this context cannot be changed, even with call or apply.

const person = {name:"Maa"}

function sayHi(age){
  console.log(`Hi ${this.name} age is ${age}`);
}

console.log(sayHi.call(person, 25)); // Hi Maa age is 25
console.log(sayHi.apply(person, [30])); // Hi Maa age is 30
console.log(sayHi.bind(person, 24)); // returns a function it should be like this sayHi.bind(person, 24)(); // Hi Maa age is 24


//-----------
const age = 25;

const person1 = {
  name :"xxxx",
  age:30,
  getAge: function(){
    console.log(this.age);
  },
};

const person2={
  age:35
}

person1.getAge(); //30
person1.getAge.call(person2); //35
person1.getAge.call(this); //25

//array concat using call and apply
const a = [1,2,3] // Output [1,2,3,1,2,3]
console.log(a.concat(a));
a.push.call(a,...a);
a.push.apply(a,a)

//min/max using  apply
const numbers = [1,2,3,4,5];
console.log(Math.max.apply(null,numbers));
console.log(Math.min.apply(null,numbers));

//bind chaining
function multiply(x,y){
  return this.factor * x * y;
}
const obj = {factor:2};
const boundMultiply = multiply.bind(obj);
const double = boundMultiply.bind(null,2); // first argument is null because we dont want to change this reference
console.log(double(5)); // Output: 20 (2 * 2 * 5)

function f() {
  console.log(this.name);
}
f = f.bind({name: "John"}).bind({name: "Ann"});
f(); // Output: John why because once we bind a function we cannot change it again