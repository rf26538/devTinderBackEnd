const express = require('express');
const { userAuth } = require('../middlewares/auth');
const userController = require("../controller/userController");

const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, userController.getUserRequest)

userRouter.get("/user/connection", userAuth, userController.getUserConnection)

userRouter.get("/user/feed", userAuth, userController.getUserFeed)

module.exports = userRouter; 