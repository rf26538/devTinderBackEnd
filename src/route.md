app.use("/", (req, res) => {
     res.send("Hello from server");
});

app.use("/hello", (req, res) => {
     res.send("Hello Hello Hello");
});

app.get("/user",(req, res) => {
    console.log(req.query);
    res.send({firstname: "Rehan", lastName:"Fazal"});
});

app.get("/user/:userID",(req, res) => {
    console.log(req.params);
    res.send({firstname: "Rehan", lastName:"Fazal"});
});

# // app.use("/route", rh, rh1, [rh2, rh3], rh4, rh5); - it works also

app.use("/user",
    // Route handler
    (req, res, next) => {
        console.log("Handling route user");
        next();
    },
    (req, res) => {
        console.log("Handling route user 2");
        res.send("Responde! 2")
    }
);


app.get("/user", (req, res, next) => {
    console.log("Handling route user");
    // res.send("Responde!");
    next();
});

app.get("/user", (req, res, next) => {
    console.log("Handling route user 2");
    res.send("Responde! 2");
    next();
});