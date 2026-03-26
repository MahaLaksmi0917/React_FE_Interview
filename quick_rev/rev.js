for(var i=1; i<=5; i++) {
	  setTimeout(() => {
  	  console.log(i);
          i = i + 1;
       },  i*1000); // 10,11,12,13,14
}
console.log("outside: ", i) // 6
if( i < 10 ) i = 10;

//Loop ends → i = 6
// outside: 6
// i is changed to 10

for (var i = 1; i <= 3; i++) {
  (function(i) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  })(i);
}
// 1 2 3 Each IIFE creates a new scope.

