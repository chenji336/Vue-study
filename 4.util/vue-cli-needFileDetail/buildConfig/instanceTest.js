// 用来测试一些不太懂的东西

// resolve下面的..
var path = require('path');
console.log(path.resolve(__dirname, '../eslint'));
// result： 先..在拼接eslint

// 如果没有./会提示找不到other这个module
var other = require('./other.js');
other.other();