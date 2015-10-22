var jsonfile = require('jsonfile');

var file = './datasets/sample.json'
var obj = {name: 'JP'}

jsonfile.writeFile(file, obj, function (err) {
  if (err) console.error(err)
  console.log('written');
});

// var asyncConfig = {};
// var a = 2, b = 1 ;
// for(var i = 0; i < 10; i++) {
// 		a++;
// 		b--;
//     // do something with a
//     // do something with b
//     (function(a,b){
//       asyncConfig[i] = function(callback) {
//         func(a, b, callback); // func is async
//       }
//     })(a,b);
// }
// // Include some more parallel or series functions to asyncConfig
// async.auto(asyncConfig);