const ConnectionRequest = require("../models/connection")
const User = require("../models/user")
const { Types } = require('mongoose');

exports.sendConnectionRequest = async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const isAllowedStatus = ["interested", "ignored"];

        if(!isAllowedStatus.includes(status)) {
            throw new Error("Request is not allowed");
        }

        if (!Types.ObjectId.isValid(toUserId)) {
            return res.status(404).json({ message : 'Invalid ID format' });
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({ message : "User not found" });
        }

        // Check existing connection request
        const exsitingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                { fromUserId, toUserId },
                { fromUserId : toUserId, toUserId : fromUserId}
            ]
        });
        
        if(exsitingConnectionRequest) {
           return res.status(400).send({message : "Connection request already exists.."});
        } 

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();

        res.json({
            message: "Connection " + status,
            data
        })
    } catch (err) {
        res.status(400).send("ERROR : "+ err.message);
    }
}

exports.reviewConnectionRequest = async (req, res) => {
    try{
        const loggedUser = req.user;
        const { status, requestId } = req.params;


        const isAllowedStatus = ["accepted", "rejected"];

        if(!isAllowedStatus.includes(status)) {
            return res.status.json({message : "Status is not allowed"});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
           toUserId : loggedUser._id,
           status : "interested"
        })

        if(!connectionRequest) {
            return res.status(404).json({message : "Connection request not found"});
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({
            message : "Connection request " + status, 
            data
        })

    } catch(err) {
        res.status(400).send("ERROR : " + err.message)
    }
}
