const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/authController");

authRouter.post("/signup", authController.userSignup);

authRouter.post("/login", authController.userLogin);

authRouter.post("/logout", authController.userLogOut);

module.exports = authRouter;