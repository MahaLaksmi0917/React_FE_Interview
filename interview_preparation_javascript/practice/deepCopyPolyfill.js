function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  const result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]); // most important  we are pushing the obj
    }
  }

  return result;
}

let obj = {
  name: "maha",
  address: {
    state: "hyderabad",
  },
};

let obj2 = deepClone(obj);
obj2.address.state = "Banglore";
// console.log(obj2);

function testing(obj) {
  for (let key in obj) {
    console.log(key);
  }
  console.log(obj.hasOwnProperty("address"));
}

// console.log(testing(obj));

// ================ practice ==========

// deep copy

function deepCopyTest(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj; // i.e value if its not an object ...
  }

  if (Array.isArray(obj)) {
    return obj.map((item, index) => deepClone(item));
  }

  const result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }

  return result;
}
function shallowCopyTest(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj; // i.e value if its not an object ...
  }

  if (Array.isArray(obj)) {
    return obj.map((item, index) => item);
  }

  const result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }

  return result;
}

// what ever i got im explaining that in my language to understand stuff more clearly
/*
this below base condition is very very important

if (obj === null || typeof obj !== "object") {
    return obj; // i.e value if its not an object ...
} 

while doing recursive call in for deep copy this base condition is very important has it return its not an object as it is ...

and why are we checking this if (obj.hasOwnProperty(key))
because 


Object.prototype.globalProp = "boom";

const obj = { a: 1 };

for (let key in obj) {
  console.log(key);
}

outputs
a
globalProp (here the globalProp is not a property of obj) thats the reason we check ... 


we can do this also if not using hasOwnProperty 
Object.keys(obj).forEach(key => {
  result[key] = deepClone(obj[key]);
});

*/

const originalObj = {
  name: "maha",
  arr: ["maha", "builder"],
  address: {
    state: "hyderabad",
    stat: {
      ltd: 17,
    },
  },
};

let deepCopy = deepCopyTest(originalObj);
deepCopy.address.state = "banglore";
deepCopy.arr[1] = "maitreyee not builder ";
deepCopy.address.stat.ltd = 25;

// console.log(originalObj, deepCopy);

Object.prototype.globalProp = "boom";

const objj = { a: 1 };

for (let key in objj) {
  console.log(key);
}
