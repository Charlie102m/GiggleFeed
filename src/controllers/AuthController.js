const User = require("../models/User.js");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @desc        Register user
// @route       POST /api/auth/register
// @access      Public
exports.Register = asyncHandler(async (req, res, next) => {
  const checkForExistingUser = await User.findOne({ email: req.body.email });
  if (checkForExistingUser) {
    return next(new ErrorResponse("A user by that email already exists", 401));
  }

  const user = await User.create(req.body);
  res.status(200).json({ success: true, data: user });
});

// @desc        Login user
// @route       POST /api/auth/register
// @access      Public
exports.Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw next(new ErrorResponse("Incorrect credentials", 401));
  }

  const match = await user.matchPassword(password);
  if (!match) {
    throw next(new ErrorResponse("Incorrect credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc        Log user out and clear cookie
// @route       GET /api/auth/logout
// @access      Private
exports.Logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true
  });

  res.status(200).json({ success: true, data: {} });
});

// @desc        Update user details
// @route       PUT /api/auth/updatedetails
// @access      Private
exports.UpdateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: {} });
});

// @desc        Forgot password
// @route       POST /api/auth/forgotpassword
// @access      Public
exports.ResetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("No user by that email address", 404));
  }

  // invoke method from UserSchema.methods
  const resetToken = await user.getResetPasswordToken();

  // save token to user
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/resetpassword/${resetToken}`;

  const message = `You are recieving this email becuase you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  const conf = await sendEmail({
    email: user.email,
    subject: "Password reset",
    message
  });

  res.status(200).json({ success: true, data: conf });
});

// @desc        Update password
// @route       Put /api/auth/forgotpassword
// @access      Public
exports.UpdatePassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse("Invalid reset token", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ success: true, data: {} });
});

// =======
// METHODS
// =======

// get token from model, create cookie & send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
