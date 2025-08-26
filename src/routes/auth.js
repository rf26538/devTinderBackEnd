const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/authController");

authRouter.post("/signup", authController.userSignUp);

authRouter.post("/login", authController.userLogIn);

authRouter.post("/logout", authController.userLogOut);

module.exports = authRouter;