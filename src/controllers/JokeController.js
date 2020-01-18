const Joke = require("../models/Joke.js");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc        Load all jokes
// @route       GET /api/joke
// @access      Public
exports.loadJokes = asyncHandler(async (req, res, next) => {
  //   const jokes = await Joke.find();

  //   if (jokes.length === 0) {
  //     return next(new ErrorResponse("No jokes were found", 404));
  //   }

  //   res
  //     .status(200)
  //     .json({ success: true, count: (await jokes).length, data: jokes });

  res.status(200).json(res.advancedResults);
});

// @desc        Get joke by Id
// @route       GET /api/joke/:jokeId
// @access      Public
exports.findJoke = asyncHandler(async (req, res, next) => {
  const joke = await Joke.findById(req.params.jokeId).populate(
    "upVotes downVotes"
  );

  if (!joke) {
    return next(new ErrorResponse("No joke found by that id", 400));
  }

  res.status(200).json({ success: true, data: joke });
});

// @desc        create new joke
// @route       POST /api/joke
// @access      Private
exports.createJoke = asyncHandler(async (req, res, next) => {
  const jokeToCreate = {
    createdBy: req.user.id,
    created: new Date(),
    ...req.body
  };

  const joke = await Joke.create(jokeToCreate);

  res.status(200).json({ success: true, data: joke });
});

// @desc        Bulk insert jokes
// @route       POST /api/joke/bulkinsert/now
// @access      Private
exports.bulkInsert = asyncHandler(async (req, res, next) => {
  const jokes = req.body.jokes.map(j => {
    let obj = Object.assign({}, j);
    (obj.createdBy = req.user.id), (obj.created = new Date());
    return obj;
  });

  await Joke.insertMany(jokes);

  res.status(200).json({ success: true, data: {} });
});

// @desc        Update joke
// @route       PUT /api/joke/:jokeId
// @access      Private
exports.updateJoke = asyncHandler(async (req, res, next) => {
  let joke = await Joke.findById(req.params.jokeId);

  if (!joke) {
    return next(new ErrorResponse("No joke found", 404));
  }

  if (joke.createdBy.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse("You are not authorised to update this joke", 404)
    );
  }

  joke = await Joke.findByIdAndUpdate(req.params.jokeId, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: joke });
});

// @desc        Delete joke
// @route       DELETE /api/joke/:jokeId
// @access      Private
exports.deleteJoke = asyncHandler(async (req, res, next) => {
  let joke = await Joke.findById(req.params.jokeId);

  if (!joke) {
    return next(new ErrorResponse("No joke found", 404));
  }

  if (joke.createdBy.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse("You are not authorised to delete this joke", 404)
    );
  }

  await Joke.findByIdAndDelete(req.params.jokeId);

  res.status(200).json({ success: true, data: {} });
});
