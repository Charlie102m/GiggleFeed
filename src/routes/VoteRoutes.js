const express = require("express");
const router = express.Router();

const { voteOnJoke, removeVote } = require("../controllers/VoteController.js");

const { Protect } = require("../middleware/auth");

router
  .route("/:jokeId/:direction")
  .put(Protect, voteOnJoke)
  .delete(Protect, removeVote);

module.exports = router;
