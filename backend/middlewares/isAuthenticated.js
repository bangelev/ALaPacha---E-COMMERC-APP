const User = require('../models/user')
const jwt = require('jsonwebtoken')
const catchAsync = require('./catchAsync')
const ErrorHandler = require('../utils/ErrorHandler')

const isAuthenticated = catchAsync(async(req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)

    next()
})

module.exports = isAuthenticated