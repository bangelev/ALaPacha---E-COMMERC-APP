const mongoose = require('mongoose')

// const dbLocalURI = process.env.DB_LOCAL_URI
const connectMongoDB = () => {
        mongoose.connect(process.env.DB_LOCAL_URI).then((con) => {
            console.log(`Connected to MongoDB ${con.connection.host}`)
        })
    }
    //TODO: should probably reset
module.exports = connectMongoDB