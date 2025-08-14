const express = require("express")
const jwt = require('jsonwebtoken');
const User = require("../models/user")
const app = express;

// const adminAuth =  (req, res, next) => {
//     console.log("Admin authorization");
    
//     const token = "xyz";
//     const isAdminAuthorized = token === "xyz";

//     if(!isAdminAuthorized) {
//         res.status(401).send("Unathorized");
//     } else {
//         next();
//     }
// }

// const userAuth = (req, res, next) => {
//     console.log("User authorization");

//     const token = "xyz";
//     const isUserAuthorized = token === "xyz";

//     if(!isUserAuthorized) {
//         res.status(401).send("Unathorized");
//     } else {
//         next();
//     }
// }

const userAuth = async (req, res, next) => {
    try { 
        const { token } = req.cookies;
        if(!token){
            throw new Error("Invalid Token!!");
        }

        const decodedObj = await jwt.verify(token, "DEV@Tinder$777")
        const { _id } = decodedObj;
    
        const user = await User.findById({_id : _id});
        if(!user){
            throw new Error("Uer not found")
        }

        req.user = user;

        next();
    } catch(err) {
        res.status(400).send("ERROR: "+ err.message);
    }
}

module.exports = {
    //  adminAuth, 
     userAuth
};