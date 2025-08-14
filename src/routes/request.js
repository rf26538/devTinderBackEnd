const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const requestController = require("../controller/requestController");

requestRouter.post("/request/send/:status/:toUserId", userAuth, requestController.sendConnectionRequest);

requestRouter.post("/request/review/:status/:requestId", userAuth, requestController.reviewConnectionRequest);

module.exports = requestRouter;