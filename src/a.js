const express = require("express");
const connectDB = require("./config/database");
const validateSignUpData = require("./utils/validation");
const app = express(); 
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const User = require("./models/user");

app.use(express.json());
app.use(cookieParser());

connectDB()
    .then(() => {
        console.log("Database connection established....");
    })
    .catch((err) => {
        console.error("Database can not be connected successfully " + err.message);
    })


//Register user
app.post("/signup", async (req, res) => {
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
});

//login api
app.post("/login", async (req, res) => {
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

            res.cookie('token', token
                // ,{ expires : new Date(Date.now() + 8 * 3600000)} // You can set cookie for expire also
            );
            
            res.send("Login Successfully!!!");
        } else {
            throw new Error("Invalid credentials")
        }
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
})

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
        
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
    
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {

        const user = req.user;
        if(user) { 
            console.log("Sending connection request", user);    
            
            res.send(user.firstName + " Sended the connection request!!");
        } else {
            throw new Error("Somthing went wrong : " + err.message);
        }
    } catch (err) {
        res.status(400).send("ERROR : "+ err.message);
    }
})

app.listen(3000, () => {
    console.log("Server is running on port : 3000");  
});
 