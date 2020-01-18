// todos: create forgot password POST with email, reset password PUT which then sends a token response.

const User = require('../models/User.js')
const ErrorResponse = require('../utils/errorResponse')

exports.Register = async (req, res, next) => {
    try {
        const checkForExistingUser = await User.findOne({ email: req.body.email })
        if (checkForExistingUser) {
            return next(new ErrorResponse('A user by that email already exists', 401))
        }

        const user = await User.create(req.body);
        res.status(200).json({ success: true, data: user })

    } catch (error) {
        return next(error);
    }
}

exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            throw next(new ErrorResponse("Incorrect credentials", 401))
        }

        const match = await user.matchPassword(password)
        if (!match) {
            throw next(new ErrorResponse("Incorrect credentials", 401))
        }

        sendTokenResponse(user, 200, res)

    } catch (error) {
        return next(error);
    }
}

// get token from model, create cookie & send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken()

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res.status(statusCode).cookie('token', token, options).json({ success: true, token })
}