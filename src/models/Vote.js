const mongoose = require('mongoose')

const VoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    joke: {
        type: mongoose.Schema.ObjectId,
        ref: 'Joke',
        required: true
    },
    type: {
        type: String,
        enum: ['upVote', 'downVote'],
        required: true
    }
})

module.exports = mongoose.model('Vote', VoteSchema)