const express = require('express')
const router = express.Router()

const { loadJokes } = require('../controllers/JokeController.js')

router.route('/')
    .get(loadJokes)
    .post()

router.route('/:jokeId')
    .get()
    .put()
    .delete()

module.exports = router;