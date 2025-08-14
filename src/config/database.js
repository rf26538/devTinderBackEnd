const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://rf26538:rf26538@cluster0.ig1phbq.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0");
};

module.exports = connectDB ;