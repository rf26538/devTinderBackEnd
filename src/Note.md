# ADVANCE ROUTING

app.get("/ab?c",(req, res) => {
    res.send({firstname: "Rehan", lastName:"Fazal"});
    // -> 'b' is optional and it will work
    // -> Should match the pattern
    // -> Can work for http://localhost:3000/abc , /ac
});

app.get("/ab+c",(req, res) => {
    res.send({firstname: "Rehan", lastName:"Fazal"});
    // -> 'a' should first position and c should be at the last it will work
    // -> Should match the pattern
    // -> Can work for http://localhost:3000/abc , /abbc, abbbbbc
});

app.get("/ab*cd",(req, res) => {
    res.send({firstname: "Rehan", lastName:"Fazal"});
    // -> 'ab' should first position and cd should be at the last it will work
    // -> Should match the pattern
    // -> Can work for http://localhost:3000/abcd , /abrehancd, abfazalcd
});

app.get("/a(bc)?d",(req, res) => {
    res.send({firstname: "Rehan", lastName:"Fazal"});
    // -> 'bc' is optional it will work
    // -> Should match the pattern
    // -> Can work for http://localhost:3000/abcd , /ad
});

# -------Regex route ----------

app.get(/a/,(req, res) => {
    res.send({firstname: "Rehan", lastName:"Fazal"});
    // -> 'a' is available in the word it will work
    // -> Should match the pattern
    // -> Can work for http://localhost:3000/a , /hack, /elephant
});

app.get(/.*fly$/,(req, res) => {
    res.send({firstname: "Rehan", lastName:"Fazal"});
    // -> if (*)starts with fly or ends with fly it will work
    // -> Should match the pattern
    // -> Can work for http://localhost:3000/fly, /dragonfly, /butterfly
});