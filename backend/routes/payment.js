const express = require('express')
const router = express.Router()

const {
    processPayment,
    sendStripeAPI,
} = require('../controllers/paymentControllers')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.route('/payment/process').post(isAuthenticated, processPayment)
router.route('/stripe-api').get(isAuthenticated, sendStripeAPI)

module.exports = router