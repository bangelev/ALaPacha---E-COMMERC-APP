const ErrorHandler = require('../utils/ErrorHandler')

const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role ${req.user.role} is not authorized`, 403)
            )
        }
        next()
    }
}

module.exports = authorizedRoles