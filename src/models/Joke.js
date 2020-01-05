const mongoose = require('mongoose')

const JokeSchema = new mongoose.Schema({
    "category": String,
    "type": String,
    "joke": String,
    "setup": String,
    "delivery": String,
    "nsfw": Boolean,
    "religious": Boolean,
    "political": Boolean,
    "id": {
        type: Number,
        unique: true
    },
    "upvotes": {
        type: Number,
        default: 0
    },
    "downvotes": {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Joke', JokeSchema)