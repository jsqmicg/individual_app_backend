const express = require("express");
const router = express.Router();

//validations
const {
  validRegister,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid");

//Load controllers
const {
  registerController,
  activationController,
  forgetController,
  loginController,
  resetController,
  googleController,
  facebookController,
} = require("../controllers/auth.controller.js");

//Pin controller
const {
  createPinController,
  getPinsController,
} = require("../controllers/pin.controller");

//routes
router.post("/register", validRegister, registerController);
router.post("/login", validLogin, loginController);
router.post("/activation", activationController);
router.put("/password/forget", forgotPasswordValidator, forgetController);
router.put("/resetpassword", resetPasswordValidator, resetController);
router.post("/createpin", createPinController);
router.get("/getpins", getPinsController);

//social login
router.post("/googlelogin", googleController);
router.post("/facebooklogin", facebookController);

module.exports = router;
