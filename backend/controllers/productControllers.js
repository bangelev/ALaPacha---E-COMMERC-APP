const Product = require('../models/product')
const catchAsync = require('../middlewares/catchAsync')
const ErrorHandler = require('../utils/ErrorHandler.js')

const cloudinary = require('cloudinary').v2

// GET ALL PRODUCTS
exports.getAllProducts = catchAsync(async(req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
        success: true,
        message: 'All products retrieved successfully',
        countProducts: products.length,
        products,
    })
})

// GET SINGLE PRODUCT
exports.getSingleProduct = catchAsync(async(req, res, next) => {
    const productId = req.params.id

    const product = await Product.findById(productId)
    if (!product) {
        next(new ErrorHandler('No such product', 404))
    }
    res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        product, // check if product is needed in frontend
    })
})

// CREATE PRODUCT => api/v1/admin/products
exports.newProduct = catchAsync(async(req, res, next) => {
        // In case is one img it will be string not Array
        let images = []
        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }
        let imagesLinks = []
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: 'products',
            })
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            })
        }
        req.body.images = imagesLinks
        req.body.user = req.user._id
        const newProduct = await Product.create(req.body)

        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            newProduct,
        })
    })
    // UPDATE PRODUCT api/v1/admin/products/:id
exports.updateProduct = catchAsync(async(req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    // In case is one img it will be string not Array
    let images = []
    if (images) {}
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    if (images !== undefined) {
        //Deleting images associated with product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.uploader.destroy(
                product.images[i].public_id
            )
        }

        let imagesLinks = []
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: 'products',
            })
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            })
        }
        req.body.images = imagesLinks
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        product,
    })
})

//DELETE PRODUCT =>api/v1/admin/products/:id
exports.deleteProduct = catchAsync(async(req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product NOT found', 404))
    }
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.uploader.destroy(
            product.images[i].public_id
        )
    }
    await product.deleteOne()
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
    })
})

// GET ALL PRODUCTS => api/v1/admin/products
exports.getAdminProducts = catchAsync(async(req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
        success: true,
        message: 'Product found successfully',
        products,
    })
})

// GET ADMIN PRODUCTS => api/v1/admin/products
exports.getAdminProducts = catchAsync(async(req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
        success: true,
        message: 'All products retrieved successfully',
        countProducts: products.length,
        products,
    })
})

//REVIEWS ROUTES
// new/update review =>api/v1/reviews
exports.createReview = catchAsync(async(req, res, next) => {
    const { comment, rating, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    product.ratings =
        product.reviews.reduce((acc, review) => review.rating + acc, 0) /
        product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: 'Review submitted successfully',
    })
})

// get review
exports.getReview = catchAsync(async(req, res, next) => {
    const product = await Product.findById(req.query.productId)

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})

//delete review
exports.deleteReview = catchAsync(async(req, res, next) => {
    const product = await Product.findById(req.query.productId)

    const reviews = product.reviews.filter(
        (review) => review._id.toString() !== req.query.reviewId.toString()
    )

    const numOfReviews = reviews.length

    const ratings =
        product.reviews.reduce((acc, review) => review.rating + acc, 0) /
        reviews.length || 0

    await Product.findByIdAndUpdate(
        req.query.productId, {
            reviews,
            ratings,
            numOfReviews,
        }, {
            runValidators: true,
            new: true,
        }
    )

    res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
    })
})