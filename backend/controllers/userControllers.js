const User = require('../models/user')
const catchAsync = require('../middlewares/catchAsync')
const ErrorHandler = require('../utils/ErrorHandler')
const sendToken = require('../utils/sendToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

// register a new user
exports.registerUser = catchAsync(async(req, res, next) => {
    const newUserData = req.body
    console.log(newUserData)

    const newUser = await User.create(newUserData)

    sendToken(newUser, 200, res)
})

//login user
exports.loginUser = catchAsync(async(req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please enter your email and password', 400))
    }
    const userFound = await User.findOne({ email }).select('+password')

    if (!userFound) {
        return next(new ErrorHandler('Invalid email or password, try again', 401))
    }
    // const isPasswordMatch = await user.comparePassword(password)
    const isPasswordMatch = await userFound.comparePassword(password)

    if (!isPasswordMatch) {
        return next(new ErrorHandler('Invalid password or email, try again!'))
    }
    sendToken(userFound, 200, res)
})

// lOGOUT USER => api/v1/logout
exports.logoutUser = catchAsync(async(req, res, next) => {
    const options = {
        expiresIn: Date.now(),
        httpOnly: true,
    }

    res.status(200).cookie('token', null, options).json({
        success: true,
        message: 'User logout successfully',
    })
})

//forgot password
exports.forgotPassword = catchAsync(async(req, res, next) => {
    const email = { email: req.body.email }
    const user = await User.findOne(email)
    if (!user) {
        return next(new ErrorHandler(`User with email this does not exist`))
    }
    const resetToken = user.generateResetPasswordToken()

    await user.save()

    const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is as follow:\n\n${resetURL}\n\nIf you have not requested this email, then ignore it.`

    try {
        sendEmail({
            email: user.email,
            subject: `LaLaPacha password recovery `,
            message,
            html: `<form action=${resetURL}><div><h2>Click below to reset password</h2><button>RESET PASSWORD</button></div></form>`,
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()

        return next(new ErrorHandler(error.message, 500))
    }
})

// RESET PASSWORD => api/v1/password/reset/:token
exports.resetPassword = catchAsync(async(req, res, next) => {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })
    if (!user) {
        return next(
            new ErrorHandler(
                'Password reset token is invalid or has been expired',
                400
            )
        )
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    sendToken(user, 200, res)
})

// user profile api/v1/profile
exports.userProfile = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        return next(new ErrorHandler(`You must to login first`))
    }

    res.status(200).json({
        success: true,
        message: 'User retrieved profile',
        user,
    })
})

// update password =>api/v1/password/update

exports.updatePassword = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    const isMatchedPassword = await user.comparePassword(req.body.oldPassword)

    if (!isMatchedPassword) {
        return next(new ErrorHandler('Invalid old password'))
    }

    user.password = req.body.password
    await user.save()

    sendToken(user, 200, res)
})

//update user profile =>api/v1/profile/update
exports.updateProfile = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        return next(new ErrorHandler(`You must to login first`))
    }

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    //TODO: Cloudinary image

    const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        message: 'User successfully updated',
        updatedUser,
    })
})

//ADMIN ROUTES
//admin  users profile =>api/v1/admin/users
exports.getAllUsers = catchAsync(async(req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        message: 'Users successfully retrieved',
        users,
    })
})

//ADMIN GET User details =>api/v1/admin/users:id
exports.getUserDetails = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(
            new ErrorHandler(`User does not found with id: ${req.params.id}`),
            404
        )
    }
    res.status(200).json({
        success: true,
        message: 'User details',
        user,
    })
})

//admin update user => api/v1/admin/users/:id
exports.updatedUser = catchAsync(async(req, res, next) => {
    const userNewData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        }
        //TODO: Cloudinary image
    const user = await User.findByIdAndUpdate(req.params.id, userNewData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user,
    })
})

// ADMIN delete user => api/v1/admin/users/:id
exports.deleteUser = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(
            new ErrorHandler(`User does not found with id: ${req.params.id}`)
        )
    }

    //TODO: Remove from cloudinary
    await user.remove()

    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
    })
})