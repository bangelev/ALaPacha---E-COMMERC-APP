const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please insert name'],
        maxLength: [30, 'Name can not exceed 30 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please insert email'],
        unique: true,
        validators: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please insert password'],
        minLength: [6, 'Your password must be at least 6 characters'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: false,
            default: 'avatar/j1vxlmiivkykk8nk6n2g',
        },
        url: {
            type: String,
            required: false,
            default: 'https://res.cloudinary.com/da1rwm8l6/image/upload/v1641484355/avatar/j1vxlmiivkykk8nk6n2g.jpg',
        },
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})

//hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
})

// Compare user password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getJWToken = function() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
    })
}

userSchema.methods.generateResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(16).toString('hex')
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
    this.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000)

    return resetToken
}
module.exports = mongoose.model('User', userSchema)