const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const profileController = require("../controller/profileContoller");

profileRouter.get("/profile/view", userAuth, profileController.getProfile);

profileRouter.patch("/profile/edit", userAuth, profileController.editProfile);

profileRouter.patch("/profile/password",userAuth, profileController.updateProfile);

module.exports = profileRouter;