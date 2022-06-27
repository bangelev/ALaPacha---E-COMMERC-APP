const app = require('./app')
const path = require('path')
const connectMongoDB = require('./config/database')
const cloudinary = require('cloudinary').v2

// synchronous errors
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err.stack}`)
    console.log('Shutting down due to uncaught exception')
    process.exit(1)
})
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({
        path: path.join(__dirname, './config/.env'),
    })
}
// require('dotenv').config({
//     path: path.join(__dirname, './config/.env'),
// })

connectMongoDB()

const server = app.listen(process.env.PORT, () => {
    console.log(
        `LISTENING ON PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode!`
    )
})

// unhandled promise (async) rejection
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err.stack}`)
    console.log('Shutting down the server due to unhandled promise rejection')
    server.close(() => {
        process.exit(1)
    })
})