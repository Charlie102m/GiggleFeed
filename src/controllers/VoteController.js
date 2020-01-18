const Joke = require("../models/Joke.js");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc        Vote on joke
// @route       PUT /api/vote/:jokeId/:direction
// @access      Private
exports.voteOnJoke = asyncHandler(async (req, res, next) => {
  const { jokeId, direction } = req.params;

  if (direction !== "up" && direction !== "down") {
    return next(
      new ErrorResponse("You must provide a vote direction of up or down", 400)
    );
  }

  const joke = await Joke.findById(jokeId);

  if (!joke) {
    return next(new ErrorResponse("No joke found", 404));
  }

  const user = req.user._id;

  if (joke.createdBy.toString() === user.toString()) {
    return next(new ErrorResponse("You cannot vote on your own jokes!", 400));
  }

  if (direction === "up") {
    const alreadyVoted = joke.upVotes.includes(user);
    const votedOtherWay = joke.downVotes.includes(user);

    if (!alreadyVoted && !votedOtherWay) {
      joke.upVotes.push(user);
    } else if (votedOtherWay) {
      joke.upVotes.push(user);
      joke.downVotes.splice(joke.downVotes.indexOf(user), 1);
    } else {
      return next(
        new ErrorResponse("You have already up voted that joke", 400)
      );
    }
  } else {
    const alreadyVoted = joke.downVotes.includes(user);
    const votedOtherWay = joke.upVotes.includes(user);
    if (!alreadyVoted && !votedOtherWay) {
      joke.downVotes.push(user);
    } else if (votedOtherWay) {
      joke.downVotes.push(user);
      joke.upVotes.splice(joke.upVotes.indexOf(user), 1);
    } else {
      return next(
        new ErrorResponse("You have already down voted that joke", 400)
      );
    }
  }

  await joke.save();
  res.status(200).json({ success: true, data: joke });
});

// @desc        Delete vote
// @route       DELETE /api/vote/:jokeId/:direction
// @access      Private
exports.removeVote = asyncHandler(async (req, res, next) => {
  const { jokeId, direction } = req.params;

  if (direction !== "up" && direction !== "down") {
    return next(
      new ErrorResponse("You must provide a vote direction of up or down", 400)
    );
  }

  const joke = await Joke.findById(jokeId);

  if (!joke) {
    return next(new ErrorResponse("No joke found", 404));
  }

  const user = req.user._id;

  if (!joke.upVotes.includes(user) && !joke.downVotes.includes(user)) {
    return next(new ErrorResponse("You haven't voted on this joke!", 400));
  }

  if (direction === "up" && joke.upVotes.includes(user)) {
    joke.upVotes.splice(joke.upVotes.indexOf(user), 1);
  } else if (direction === "down" && joke.downVotes.includes(user)) {
    joke.downVotes.splice(joke.downVotes.indexOf(user), 1);
  } else {
    return next(
      new ErrorResponse("You haven't voted on this joke in that direction", 400)
    );
  }

  await joke.save();

  res.status(200).json({ success: true, data: joke });
});
