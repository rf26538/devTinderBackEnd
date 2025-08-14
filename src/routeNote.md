const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

# Remember the way can not be changed
app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send("Something went wrong");
    }
});

app.use("/admin", adminAuth);

app.get("/getUserData", (req, res) => {
    try{
        throw new Error("dfkm");
        res.send("All user data fetched successfully")
    } catch (err) {
        res.status(500).send("unauthorized");
    }
});

// app.get("/user/getAllusers", userAuth, (req, res) => {
//     try{
//         throw new Error("dfkm");
//         res.send("All user data fetched successfully")
//     } catch (err) {
//         res.status(500).send("unauthorized");
//     }
// });

// app.get("/admin/getAllUserAdmin", (req, res) => {
//     res.send("All admin data fetched successfully")
// });

// app.post("/admin/addUserAdmin", (req, res) => {
//     res.send("User data inserted successfully")
// });

app.listen(3000, () => {
    console.log("Server is running on port : 3000");  
});
 