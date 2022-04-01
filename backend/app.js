const express = require('express')
const errorsMiddleware = require('./middlewares/errorsMiddleware')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('dotenv').config({
    path: path.join(__dirname, './config/.env'),
})
const app = express()
    // APP MIDDLEWARES
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

//import all routes
const products = require('./routes/products')
const user = require('./routes/user')
const orders = require('./routes/orders')

//routes use
app.use('/api/v1', products)
app.use('/api/v1', user)
app.use('/api/v1', orders)

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'It is OK',
    })
})

app.use(errorsMiddleware)
module.exports = app