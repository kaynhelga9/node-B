const events = require('events')
const fs = require('fs')
const http = require('http')
const path = require('path')
const fsPromises = require('fs/promises')
const { logEvents } = require('./log')

class Emitter extends events {}
const emitter = new Emitter()

emitter.on('log', (msg, filename) => logEvents(msg, filename))

const PORT = process.env.PORT | 8000

const serveFile = async(filePath, contentType, response) => {
    try {
        const raw = await fsPromises.readFile(filePath, contentType.includes('image')? '' : 'utf8')
        const data = contentType === 'application/json'? JSON.parse(raw) : raw
        response.writeHead(filePath.includes('404')? 404 : 200, {'Content-Type': contentType})
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        )
    } catch (error) {
        console.log(error)
        emitter.emit('log', `${error.name} ${error.message}`, 'errorLog.txt')
        response.statusCode = 500
        response.end()
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    emitter.emit('log', `${req.url} ${req.method}`, 'reqLog.txt')

    const ext = path.extname(req.url)

    let contentType

    switch (ext) {
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.jpg':
            contentType = 'image/jpeg'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.txt':
            contentType = 'text/plain'
            break;
        default:
            contentType = 'text/html'
    }

    let filePath = 
        contentType === 'text/html' & req.url === '/'? 
        path.join(__dirname, 'views', 'index.html') :
        contentType === 'text/html' & req.url.slice(-1) === '/'?
        path.join(__dirname, 'views', req.url, 'index.html') :
        contentType === 'text/html' ?
        path.join(__dirname, 'views', req.url) :
        path.join(__dirname, req.url)

    if (!ext & req.url.slice(-1) != '/') {
        filePath += '.html'
    }

    const fileExists = fs.existsSync(filePath)

    if (fileExists) {
        // serve file
        serveFile(filePath, contentType, res)
    } else {
        switch(path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'})
                res.end()
                break
            case 'www-page.html':
                res.writeHead(301, {'Location': '/'})
                res.end()
                break
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
        }
    }
})

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})