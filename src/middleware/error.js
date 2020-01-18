const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {

    // log error for dev
    console.log(err.stack.red);

    // clone err arg to new error object and ensure message is inherited
    let error = { ...err }
    error.message = err.message

    // conditional errors
    if (err.name === 'CastError') {
        error = new ErrorResponse(`Resource not found`, 404)
    }

    if (err.code === 11000) {
        error = new ErrorResponse('Duplicate field value entered', 400)
    }

    if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(errorMessage, 400)
    }

    res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error' })
}

module.exports = errorHandler