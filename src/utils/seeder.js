const axios = require('axios')
const mongoose = require('mongoose')
const Joke = require('../models/Joke.js')

exports.seedDB = async () => {
    try {
        const response = await axios("https://sv443.net/jokeapi/category/any")
        const joke = await Joke.create(response.data)
        console.log('joke: ', joke);
    } catch (error) {
        console.log(error);
    }
}