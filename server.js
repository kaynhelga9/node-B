/* INTRO
console.log('hello')
console.log(global);

const os = require('os')
const path = require('path')

console.log(os.type());
console.log(os.version());
console.log(__dirname);

console.log(path.parse(__filename))
*/

/* SERVER */
const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')

const logEvents = require('./lo')