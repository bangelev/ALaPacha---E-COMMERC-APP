const isAuthenticated = require('../middlewares/isAuthenticated')
const authorizedRoles = require('../middlewares/authorizedRoles')

const express = require('express')
const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    updatePassword,
    userProfile,
    updateProfile,
    getAllUsers,
    updatedUser,
    deleteUser,
    getUserDetails,
} = require('../controllers/userControllers')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').get(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').get(resetPassword)
    //update user profile
router.route('/profile').get(isAuthenticated, userProfile)
router.route('/password/update').put(isAuthenticated, updatePassword)
router.route('/profile/update').put(isAuthenticated, updateProfile)
    //admin routes
router
    .route('/admin/users')
    .get(isAuthenticated, authorizedRoles('admin'), getAllUsers)
router
    .route('/admin/users/:id')
    .get(isAuthenticated, authorizedRoles('admin'), getUserDetails)
    .put(isAuthenticated, authorizedRoles('admin'), updatedUser)
    .delete(isAuthenticated, authorizedRoles('admin'), deleteUser)

module.exports = router