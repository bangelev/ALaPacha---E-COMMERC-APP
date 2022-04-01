const express = require('express')
const router = express.Router()

const isAuthenticated = require('../middlewares/isAuthenticated')
const authorizedRoles = require('../middlewares/authorizedRoles')

const {
    getAllProducts,
    getSingleProduct,
    newProduct,
    updateProduct,
    deleteProduct,
    getAdminProducts,
    createReview,
    getReview,
    deleteReview,
} = require('../controllers/productControllers')

router.route('/products').get(getAllProducts)
router.route('/products/:id').get(getSingleProduct)
router
    .route('/admin/products')
    .post(isAuthenticated, authorizedRoles('admin'), newProduct)
    .get(isAuthenticated, authorizedRoles('admin'), getAdminProducts)
router
    .route('/admin/products/:id')
    .put(isAuthenticated, authorizedRoles('admin'), updateProduct)
    .delete(isAuthenticated, authorizedRoles('admin'), deleteProduct)

//reviews
router.route('/reviews').put(isAuthenticated, createReview)
router.route('/reviews').get(isAuthenticated, getReview)
router.route('/reviews').delete(isAuthenticated, deleteReview)

module.exports = router