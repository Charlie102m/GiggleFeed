const express = require("express");
const router = express.Router();
const Joke = require("../models/Joke");

const {
  bulkInsert,
  loadJokes,
  findJoke,
  createJoke,
  updateJoke,
  deleteJoke
} = require("../controllers/JokeController.js");

const { Protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

router.route("/bulkinsert/now").post(Protect, bulkInsert);

router
  .route("/")
  .get(advancedResults(Joke, "upVotes downVotes"), loadJokes)
  .post(Protect, createJoke);

router
  .route("/:jokeId")
  .get(findJoke)
  .put(Protect, updateJoke)
  .delete(Protect, deleteJoke);

module.exports = router;
