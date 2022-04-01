const ErrorHandler = require('../utils/ErrorHandler')
const colors = require('colors')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
        // DEVELOPMENT ERRORS
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        console.log('FROM MIDDLEWARE ERROR FUNC'.red)
        res.status(err.statusCode).json({
            success: false,
            error: err,
            message: err.message,
            stack: err.stack,
        })
    }

    // PRODUCTION ERRORS
    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = {...err }
        error.message = err.message

        // Mongoose CastError
        if (err.name === 'CastError') {
            const message = `Resource NOT found: invalid ${err.path}`
            error = new ErrorHandler(message, 400)
        }
        //Mongoose ValidationError
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((value) => value.message)
            error = new ErrorHandler(message, 400)
        }
        //Duplicate key errors
        if (err.code === 11000) {
            const message = `User with email: ${Object.values(
        err.keyValue
      )} already exist`
            error = new ErrorHandler(message, 400)
        }
        //Handling wrong JWT error
        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON Web Token is invalid. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }
        // Expire tokens
        // Handling Expired JWT error
        if (err.name === 'TokenExpiredError') {
            const message = 'JSON Web Token is expired. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        })
    }
}