const app = require('./app')
const connectMongoDB = require('./config/database')

// synchronous errors
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err.stack}`)
    console.log('Shutting down due to uncaught exception')
    process.exit(1)
})

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