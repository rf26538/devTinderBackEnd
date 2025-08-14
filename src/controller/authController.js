const { validateSignUpData } = require("../utils/validation");
const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
    try{
        validateSignUpData(req);
    
        const {firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
        
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
         
        await user.save();
        res.send("User Added Successfully");
    } catch(err) {
        res.status(400).send("Error saving user:"+ err.message );
    }
}

exports.userLogin = async (req, res) => {
    try {
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId : emailId});

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {

            const token = await jwt.sign({_id: user._id}, "DEV@Tinder$777", { expiresIn : "7d"}); //this can be offload to user Schema methods for clean code i have written there just use it
            // console.log(token);

            res.cookie(
                'token', token,
                { expires : new Date(Date.now() + 8 * 3600000)} // You can set cookie for expire also
            );
            
            res.send(user);
        } else {
            throw new Error("Invalid credentials")
        }
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
}

exports.userLogOut = async (req, res) => {
    // res.cookie("token", null, {
    //     expires : new Date(Date.now())
    // })
    // res.status(200).send("User logout successfully");

    // or chain

    res
    .cookie("token", null, {
        expires : new Date(Date.now())
    }).send("Logout Successfull!!!");
}