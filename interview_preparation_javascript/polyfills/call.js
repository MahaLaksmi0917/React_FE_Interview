Function.prototype.myCall = function (context, ...args) { // for apply we use args as array (context , args)
    if (typeof this !== 'function') {
        throw new TypeError('Not a function');
    }
    context = context || window // if user pass null or undefined JS uses window (non-strict mode) Prevents crash

    context[secretKey] = Symbol() // to avoid overwriting existing properties and collision , we use a unique Symbol as the key
    context[secretKey] = this // === person.tempFn = greet;

    const result = context[secretKey](...args) // invoke the function with provided args(=== person.tempFn("Delhi", "India");)

    delete context[secretKey] // clean up the temporary property

    return result
}

// exxplain withan EXAMPLE 

function greet(city, country) {
  return `Hi, I am ${this.name} from ${city}, ${country}`;
}

const person = { name: "Rahul" };

greet.call(person, "Delhi", "India");

// greet -> this
// context -> person

//internall js behave like this 
person.tempFn = greet;
person.tempFn("Delhi", "India");
delete person.tempFn;


//bind does NOT execute the function It returns a new function with this permanently fixed

Function.prototype.myBind = function (context, ...args) {
  const originalFn = this;

  return function (...newArgs) {
    return originalFn.apply(context, [...args, ...newArgs]);
  };
};
