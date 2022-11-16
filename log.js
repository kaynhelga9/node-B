const { format } = require('date-fns')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')


const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd HH:mm:ss')}`
    const logItem = `${dateTime} ${uuidv4()} ${message}\n`
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem)
    } catch (error) {
        console.log(error);
    }
}


module.exports = { logEvents }