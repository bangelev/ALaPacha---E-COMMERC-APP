const Order = require('../models/order')
const catchAsync = require('../middlewares/catchAsync')
const ErrorHandler = require('../utils/ErrorHandler')

// create order => api/v1/orders/new
exports.creteOrder = catchAsync(async(req, res, next) => {
    const newOrder = {
        shippingInfo: req.body.shippingInfo,
        orderItems: req.body.orderItems,
        paymentInfo: req.body.paymentInfo,
        taxPrice: req.body.taxPrice,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
        paidAt: Date.now(),
    }

    const order = await Order.create(newOrder)
    res.status(200).json({
        success: true,
        message: 'Order created successfully',
        order,
    })
})

// get single order => api/v1/orders/:id
exports.getSingleOrder = catchAsync(async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        message: 'Order found successfully',
        order,
    })
})

//get all user orders => api/v1/orders/me
exports.myOrders = catchAsync(async(req, res, next) => {
    console.log(req.user.id)
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        message: 'Orders retrieved successfully',
        orders,
    })
})

//ADMIN ROUTES
// GET ALL ORDERS => api/v1/admin/orders
exports.getAllOrders = catchAsync(async(req, res, next) => {
    const orders = await Order.find()
    let totalAmount = 0
    orders.forEach((order) => {
        totalAmount += order.totalPrice
    })

    console.log(totalAmount)
    res.status(200).json({
        success: true,
        message: 'Orders retrieved successfully',
        totalAmount,
        orders,
    })
})

//update order => api/v1/admin/orders/:id
exports.updateOrder = catchAsync(async(req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
        message: 'Orders updated successfully',
    })
})

//delete order =>api/v1/admin/orders/:id
exports.deleteOrder = catchAsync(async(req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }
    await order.remove()
    res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
    })
})