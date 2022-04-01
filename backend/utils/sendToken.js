const sendToken = (user, statusCode, res) => {
    const token = user.getJWToken()
        // options for cookie
    const options = {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
        // new Date(Date.now() + process.env.JWT_EXPIRATION_TIME * 24 * 60 * 60 * 1000),
        HttpOnly: true,
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        message: 'User login successful',
        token,
        user,
    })
}

module.exports = sendToken