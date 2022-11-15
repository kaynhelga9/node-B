const { format } = require('date-fns')
const { uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')


const logEvents = async (message) => {

    const dateTime = `${format(new Date(), 'yyyyMMdd HH:mm:ss')}`

    const logItem = `${dateTime} ${uuid} ${message}\n`
    console.log(logItem);

    try {

        if(!fs.existsSync(path.join(__dirname, 'logs'))) {

            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }

        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem)

    } catch (error) {

        console.log(error);
    }
}


module.exports = { logEvents }