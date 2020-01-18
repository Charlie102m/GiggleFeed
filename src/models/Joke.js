const mongoose = require("mongoose");

const JokeSchema = new mongoose.Schema({
  category: {
    type: String,
    default: "Miscellaneous"
  },
  type: {
    type: String,
    enum: ["twopart", "single"],
    required: [true, "Please include a type of either twopart or single"]
  },
  joke: {
    type: String,
    required: [true, "Please include a joke"]
  },
  delivery: String,
  nsfw: Boolean,
  religious: Boolean,
  political: Boolean,
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  upVotes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  ],
  downVotes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  ],
  totalUpVotes: {
    type: Number,
    default: 0
  },
  totalDownVotes: {
    type: Number,
    default: 0
  },
  created: {
    type: Date
  }
});

// update vote counts
JokeSchema.pre("save", function() {
  this.totalUpVotes = this.upVotes.length;
  this.totalDownVotes = this.downVotes.length;
});

module.exports = mongoose.model("Joke", JokeSchema);
