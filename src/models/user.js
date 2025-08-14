
const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50 
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String, 
        trim: true,
        lowercase: true,
        reuired: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address: " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is too weak: "+ value)
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 45
    },
    gender: {
        type: String,
        enum : {
            values : ["male", "female", "others"],
            message : `{VALUE} is not a valid gender type`
        },
        validate(value) { 
            if(!["male", "female", "others"].includes(value)) {
                throw Error("Gender data is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Please enter a valid url..")
            }
        }
    },
    about: {
        type: String,
        default: "This is default string for user"
    },
    skills: {
        type: [String]
    }
},
    {
        timestamps: true
    }
);

// Use offload for jwt and always write pure function not arrow function will respond--ERROR becouse for refrance we are using this and we can not use in arrow function
// Good and cleaner code also
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DEV@Tinder$777", { expiresIn : "7d"}); 
    
    return token;
}

//Validate Password
userSchema.methods.validatePassword = async function (passwordInputByUSer) {
    const user = this;
    const hashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUSer, hashedPassword);

    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;