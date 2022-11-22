const cors = require('cors')
const express = require('express')
const path = require('path')
const { logEvents } = require('./middleware/log')
const { logger } = require('./middleware/log')
const errorHandler = require('./middleware/errorHandler')
const corsOptions = require('././config/corsOption')

const PORT = process.env.PORT | 8000

const app = express()

// custom middleware logger
app.use(logger)


app.use(cors(corsOptions))

// built in middleware, handle urlencoded data
// 'content-type" application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))

// built in middleware, json
app.use(express.json())

// built in middleware, static
app.use('/', express.static(path.join(__dirname, '/public')))

// routing
app.use('/', require('./routes/root'))
app.use('/employees', require('./routes/api/employees'))

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