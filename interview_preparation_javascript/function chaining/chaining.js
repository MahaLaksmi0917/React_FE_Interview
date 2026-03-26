class Calculator {
  value = 0;
  add(num) {
    this.value += num; // value = value + num (which is 2) now after calling the add for the first time value = 2...
    return this;
  }

  subtract(num) {
    this.value -= num;
    return this;
  }

  multiply(num) {
    this.value *= num;
    return this;
  }

  divide(num) {
    this.value /= num;
    return this;
  }
}

const calculator = new Calculator(); // now the calculator's __proto__ is pointing towards the new Calculator Class ..
console.log(calculator.__proto__); // output : {add: ƒ, subtract: ƒ, multiply: ƒ, divide: ƒ}
console.log(calculator.add(2).add(2).subtract(2).multiply(3)); // 6

const calculator2 = {};

// function chaining is nothing but calling multiple methods or functions on single object .. 
