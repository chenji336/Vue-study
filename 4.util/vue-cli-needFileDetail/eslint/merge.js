function merge () {
   var i = '';
  // eslint-disable-next-line indent
   var ret = {};
  for (i in arguments) {
    var m = arguments[i];
    for (var j in m) ret[j] = m[j];
  }
  return ret;
}

console.log(merge({a: 123}, {b: 456}));