const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User", //Refrance to user collection
        reqired : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : ["ignored", "interested", "accepted", "rejected"],
            message : `{VALUE} is not supported`
        }
    }
}, { timestamps : true });

connectionRequestSchema.index({fromUserId : 1, toUserId : -1});

connectionRequestSchema.pre("save", function (next) {
    const ConnectionRequest = this;

    //  Check if the from fromUserId and toUserId is same
    if(ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId)){
        throw new Error("Cann't send connection request to yourself");
    } 
    next();
});

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;