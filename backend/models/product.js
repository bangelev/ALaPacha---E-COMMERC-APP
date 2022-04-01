const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please insert product name'],
        maxLength: [100, 'Product name must not exceed 100 characters'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please insert product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please insert product price'],
        default: 0.0,
    },
    category: {
        type: String,
        required: [true, 'Please insert product category'],
        enum: [
            'salad',
            'pizza',
            'breakfast',
            'main course',
            'soup',
            'appetizer',
            'alcoholic drink',
            'non-alcoholic drink',
            'burger',
            'pasta',
            'see food',
            'dessert',
            'oven cooked',
        ],
        message: 'Please select correct category for product',
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
    }, ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }, ],
})

module.exports = mongoose.model('Product', productSchema)