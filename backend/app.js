const express = require('express')
const errorsMiddleware = require('./middlewares/errorsMiddleware')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

// if (process.env.NODE_ENV !== 'PRODUCTION') {
//     require('dotenv').config({
//         path: path.join(__dirname, './config/.env'),
//     })
// }
require('dotenv').config({
    path: path.join(__dirname, './config/.env'),
})
const app = express()
    // APP MIDDLEWARES
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload())

//import all routes
const products = require('./routes/products')
const user = require('./routes/user')
const orders = require('./routes/orders')
const payment = require('./routes/payment')

//routes use
app.use('/api/v1', products)
app.use('/api/v1', user)
app.use('/api/v1', orders)
app.use('/api/v1', payment)

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorsMiddleware)
module.exports = app