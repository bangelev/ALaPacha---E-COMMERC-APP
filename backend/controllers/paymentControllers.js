const catchAsync = require('../middlewares/catchAsync')
const ErrorHandler = require('../utils/ErrorHandler.js')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// api/v1/payment/process
exports.processPayment = catchAsync(async(req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
            integration_check: 'accept_a_payment',
        },
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret, // to receive a client key ad send to frontend
    })
})

// api/v1/stipe-api
exports.sendStripeAPI = catchAsync(async(req, res, next) => {
    res.status(200).json({
        success: true,
        stripeAPIKey: process.env.STRIPE_API_KEY,
    })
})