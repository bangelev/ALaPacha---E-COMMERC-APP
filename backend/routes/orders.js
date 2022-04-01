const express = require('express')
const router = express.Router()

const isAuthenticated = require('../middlewares/isAuthenticated')
const authorizedRoles = require('../middlewares/authorizedRoles')

const {
    creteOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController')

router.route('/orders/new').post(isAuthenticated, creteOrder)
router.route('/orders/me').get(isAuthenticated, myOrders)
router.route('/orders/:id').get(isAuthenticated, getSingleOrder)

//admin routes
router
    .route('/admin/orders')
    .get(isAuthenticated, authorizedRoles('admin'), getAllOrders)
router
    .route('/admin/orders/:id')
    .put(isAuthenticated, authorizedRoles('admin'), updateOrder)
    .delete(isAuthenticated, authorizedRoles('admin'), deleteOrder)

module.exports = router