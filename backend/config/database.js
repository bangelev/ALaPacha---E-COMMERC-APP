const mongoose = require('mongoose')

// const dbLocalURI = process.env.DB_LOCAL_URI
const connectMongoDB = () => {
        if (process.env.NODE_ENV === 'PRODUCTION') {
            mongoose.connect(process.env.DB_URI).then((con) => {
                console.log(`Connected to MongoDB ${con.connection.host}`)
            })
        } else {
            mongoose.connect(process.env.DB_LOCAL_URI).then((con) => {
                console.log(`Connected to local MongoDB ${con.connection.host}`)
            })
        }
    }
    //TODO: should probably reset
module.exports = connectMongoDB