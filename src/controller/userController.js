const ConnectionRequest = require('../models/connection');
const User = require("../models/user");

const USR_SAFE_DATA = "firstName lastName age gender";

exports.getUserRequest = async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested"
        //If do not pass second parameter in populate we will get all the data of it
        // }).populate("fromUserId", "firstName lastName age gender"); -> we can do like string with space or pass second param with array , seprated
        }).populate("fromUserId", ["firstName", "lastName", "age", "gender"]) 
        
        res.json({
            message : "Data fetched successfully", 
            data : connectionRequest
        })
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
}

exports.getUserConnection = async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or : [
                {toUserId : loggedInUser._id,  status : "accepted"},
                {fromUserId : loggedInUser._id,  status : "accepted"}
            ]
        })
        .populate("fromUserId", USR_SAFE_DATA)
        .populate("toUserId", USR_SAFE_DATA);


        const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id){
               return row.toUserId;
            }

            return row.fromUserId;
        });
        
        res.json({
            message : "Connection request gets successfully",
            data : data
        })
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
}

exports.getUserFeed = async (req, res) => {
    try {
        const loggedInUser = req.user;

        // :zxy -> it is access by params(helps to send dynamic data) && ?xyz -> it will be access by query(helps for skip and limit)
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 50 ? 50 : limit;

        const skip = (page-1)*limit;

        const connectionRequest = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedInUser._id},
                {toUserId : loggedInUser._id}
            ]
        })
        .select(["fromUserId", "toUserId"])
        // .populate("fromUserId", ["firstName"])
        // .populate("toUserId", "firstName");

        const hideUsersFromFeed = new Set(); //type of array does not add duplicate in it
        connectionRequest.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and : [
                { _id : { $nin : Array.from(hideUsersFromFeed) } },//funtion converts set to array
                { _id : { $ne : loggedInUser._id }}
            ],
        }).select(USR_SAFE_DATA).skip(skip).limit(limit);

        res.json({ data : users });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
}