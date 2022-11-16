const { error } = require('console')
const fs = require('fs')
const path = require('path')
const fsPromises = require('fs/promises')


const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'lorem.txt'), 'utf-8')
        await fsPromises.writeFile(path.join(__dirname, 'files', 'lorem.txt'), data)
        await fsPromises.appendFile(path.join(__dirname, 'files', 'lorem.txt'), '12')
        // await fsPromises.renameFile(path.join(__dirname, 'files', 'lorem.txt'), '34')
        const newdata = await fsPromises.readFile(path.join(__dirname, 'files', 'lorem.txt'), 'utf-8')
        console.log(newdata);
    } catch (err) {
        console.log(err);
    }
}

fileOps() 

// fs.readFile(path.join(__dirname, 'files', 'lorem.txt'), 'utf8', (err, data) => {
//     if (err) throw err
//     console.log(data);
// })

// console.log('hello');

// fs.writeFile(path.join(__dirname, 'files', 'lorem.txt'), 'khanh', (err) => {
//     if (err) throw err
//     console.log('write complete');
// })

// process.on('uncaughtException', err => {
//     console.error(`There was an uncaught error: ${err}`)
//     process.exit(1)
// })