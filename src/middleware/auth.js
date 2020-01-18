const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.Protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ErrorResponse("You must be logged in to do that!", 401));
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    req.user = user;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    return next(
      new ErrorResponse("You are not currently authorised to do that!", 401)
    );
  }
};
