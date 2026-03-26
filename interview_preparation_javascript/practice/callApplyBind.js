function printNameAndDetails(state, pincode) {
  return `name : ${this.Name} , state : "${state} , pincode : ${pincode}`;
}

let obj = {
  Name: "Maha NK",
};

let state = "Hyd";
let pincode = 50000233;

console.log(printNameAndDetails.call(obj, state, pincode));


