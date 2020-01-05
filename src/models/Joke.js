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
    "id": Number
})

module.exports = mongoose.model('Joke', JokeSchema)