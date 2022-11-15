/* LOG EMITTER 

const { logEvents } = require('./log')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmmiter = new MyEmitter()

myEmmiter.on('log', (msg) => logEvents(msg))

setTimeout(() => {
    myEmmiter.emit('log', 'log event emmited')
}, 2000)

*/