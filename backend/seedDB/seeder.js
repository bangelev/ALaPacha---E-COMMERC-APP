const mongoose = require('mongoose')
const connectMongoDB = require('../config/database')
const Product = require('../models/product')
const products = require('./productSeeds.json')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: 'backend/config/.env' })
const dbLocalURI = process.env.DB_LOCAL_URI
console.log(process.env.DB_LOCAL_URI)
connectMongoDB()

const seedingMongoDB = async(data) => {
    try {
        await Product.deleteMany()
        console.log('Deleted many')
        await Product.insertMany(data)
        console.log('Products inserted')
        process.exit()
    } catch (error) {
        console.log('Error while inserting')
        console.log(error)
        process.exit()
    }
}

seedingMongoDB(products)