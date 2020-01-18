const axios = require("axios");
const mongoose = require("mongoose");
const Joke = require("../models/Joke.js");

exports.seedDB = async () => {
  try {
    const response = await axios("https://sv443.net/jokeapi/category/any");
    let joke = response.data;
    const exists = await Joke.findOne({ id: joke.id });

    if (!exists) {
      const insert = await Joke.create(joke);
      console.log("Joke Inserted: ", insert);
    } else {
      console.log(`Joke with id ${exists.id} already exists...`);
    }
  } catch (error) {
    console.log(error);
  }
};

// seeder
// const { seedDB } = require('./utils/seeder.js')
// setInterval(() => { seedDB() }, 2500);
