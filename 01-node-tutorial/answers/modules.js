const names = require('./names.js');
const sayHello = require('./utils');
const data = require('./alternative-flavor');
require('./mind-grenade');
sayHello('susan')
sayHello(names.anna)
sayHello(names.maria)

console.log(data);