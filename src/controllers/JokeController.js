const Joke = require('../models/Joke.js')
const ErrorResponse = require('../utils/errorResponse')

exports.loadJokes = async (req, res, next) => {
    try {
        const jokes = await Joke.find()

        if (jokes.length === 0) {
            return next(new ErrorResponse('No jokes were found', 404))
        }

        res.status(200).json({ success: true, count: (await jokes).length, data: jokes })
    } catch (error) {
        return next(error)
    }
}