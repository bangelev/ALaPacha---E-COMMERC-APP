const Product = require('../models/product')
const catchAsync = require('../middlewares/catchAsync')
const ErrorHandler = require('../utils/ErrorHandler.js')

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

// CREATE PRODUCT => api/v1/products
exports.newProduct = catchAsync(async(req, res, next) => {
        const dataProduct = req.body
        dataProduct.user = req.user
        console.log(dataProduct.user)
        const newProduct = await Product.create(dataProduct)

        // TODO: Cloudinary image process
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            newProduct,
        })
    })
    // UPDATE PRODUCT api/v1/admin/products/:id
exports.updateProduct = catchAsync(async(req, res, next) => {
    let productId = req.params.id
        // cloudinary setup
    const product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
    })
    if (!product) {
        return next(new ErrorHandler('Product NOT found', 404))
    }

    res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        product,
    })
})

//DELETE PRODUCT =>api/v1/admin/products/:id
exports.deleteProduct = catchAsync(async(req, res, next) => {
    const product = await Product.findById(req.params.id)
        //TODO: Cloudinary image delete images
    if (!product) {
        return next(new ErrorHandler('Product NOT found', 404))
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
                console.log('IT has comment')
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