//this is NOT a variable.
//It is a keyword that refers to the object it belongs to.
//It has different values depending on where it is used.
//You cannot assign to it.this = obj; // ❌ SyntaxError

// this is :Determined at call time

// Controlled by how a function is invoked

// NOT something you mutate

// Who controls this then?

// Only 4 mechanisms control this:

// call
// apply
// bind
// new

// this in global scope
console.log(this); // globalobject - window(browswer ), global(node)

// this in function scope
function f() {
    //this value depends on strict or non-strict mode
  console.log(this); // strict mode: undefined, non-strict mode: global object  
}

//this inside non-strict mode - (this substitution)

//if the value of the this keyword is undefined or null , this keyword will be replaced with golabl object only in non strict mode

//this keyword value depends on how the function is called, not where it is defined

x() // undefined
window.x() // this will be window object

// if u able to write a function as part of obj then iit will be method and this will refer to the object
const obj = {
    a:10,
    x:function(){ //x is method of obj
        console.log(this); // this.a -> 10
    }
}
obj.x(); //this ->  this will be obj {a:10, x: ƒ}

//call, apply, bind

//this inside arraow function
//Arrow functions do not have their own this value. Instead, they inherit the this value from the enclosing lexical context. This means that the value of this inside an arrow function is determined by where the arrow function is defined, not how it is called.

const obj1 = {
    x:10,
    x:()=>{
        console.log(this); // this will be global object because arrow function does not have its own this value and it inherits from the enclosing lexical context which is global object in this case
    }
}

obj1.x();

const obj2 = {
    x:10,
    y:function(){ 
        //here arrrow function inndirectly looks like this conosle.log(this)
        const y=()=>{
            console.log(this); // this will be obj2 because arrow function inherits this value from the enclosing lexical context which is obj2 in this case
        }
    }}

//this inside  DOM elements -> refrence to HTML element