Array.prototype.myFilter = function (callBack, thisArgs) {
  if (this === null) {
    throw new TypeError("Cannot read property 'filter' of null or undefined");
  }

  if (typeof callBack !== "function") {
    throw new TypeError(callBack + "is not a function");
  }

  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      //   console.log(this[i]);
      if (callBack.call(thisArgs, this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }

  return result;
};


// once go through the map polyfill you will get ..