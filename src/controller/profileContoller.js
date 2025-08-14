const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");

exports.getProfile = async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
        
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
    
}

exports.editProfile = async (req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit request");
        }

        const loggedInUser = req.user;
        // console.log(loggedInUser);

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        // console.log(loggedInUser); //those two are diffrent becouse we are changing it

        await loggedInUser.save();

        // res.send(`${loggedInUser.firstName } your profile updated successfully`);

        // Or if i want to send data from here i can use res.json({})
        res.json({
            message : `${loggedInUser.firstName } your profile updated successfully`,
            data : loggedInUser
        }); 
    } catch(err) {
        res.status(404).send("ERROR : " + err.message);
    }
}

exports.updateProfile  = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const {oldPassword, newPassword} = req.body;

        const isValidPassword = await bcrypt.compare(oldPassword, req.user.password);

        if(!isValidPassword) {
            throw new Error("Invalid old password");
        }

        loggedInUser.password = await bcrypt.hash(newPassword, 10);
        console.log(loggedInUser);

        await loggedInUser.save();

        res.send(`${loggedInUser.firstName} your password has changed successfully`);
        
    } catch (err) {
        res.status(400).send("Password can not be changed")
    }
}