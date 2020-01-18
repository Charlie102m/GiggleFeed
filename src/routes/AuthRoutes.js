const express = require("express");
const router = express.Router();

const {
  Register,
  Login,
  Logout,
  UpdateDetails,
  ResetPassword,
  UpdatePassword
} = require("../controllers/AuthController.js");

const { Protect } = require("../middleware/auth");

router.route("/register").post(Register);

router.route("/login").post(Login);

router.route("/logout").get(Logout);

router.route("/updatedetails").put(Protect, UpdateDetails);

router.route("/resetpassword").post(ResetPassword);

router.route("/resetpassword/:resettoken").put(UpdatePassword);

module.exports = router;
