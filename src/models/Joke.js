const mongoose = require('mongoose')

const JokeSchema = new mongoose.Schema({
    category: String,
    type: String,
    joke: String,
    setup: String,
    delivery: String,
    nsfw: Boolean,
    religious: Boolean,
    political: Boolean,
    id: {
        type: Number,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Joke', JokeSchema)