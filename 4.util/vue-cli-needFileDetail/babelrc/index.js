require('babel-polyfill');

var a = [3,4,5];
a = a.map(item => item+1);
console.log(a);

var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }