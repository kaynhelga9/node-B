const cors = require('cors')
const express = require('express')
const path = require('path')
const { logEvents } = require('./middleware/log')
const { logger } = require('./middleware/log')
const errorHandler = require('./middleware/errorHandler')


const PORT = process.env.PORT | 8000

const app = express()

// custom middleware logger
app.use(logger)

// cross origin resource sharing
const whitelist = ['http://localhost:8000'] //domains to allow access to app
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 | !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed cors'))
        }
    }, 
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// built in middleware, handle urlencoded data
// 'content-type" application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))

// built in middleware, json
app.use(express.json())

// built in middleware, static
app.use(express.static(path.join(__dirname, '/public')))



app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect('/new-page.html')
})

app.all('/*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')) {
        res.json({error: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }

})

app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})