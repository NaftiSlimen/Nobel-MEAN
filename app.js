require("./api/data/db.js");
const express=require("express");
var app=express();


app.use(express.json());
const path=require("path");
const routes=require("./api/routes/index.js")
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.set("port",5000);
app.use(express.static(path.join(__dirname,"public")));

app.use("/",routes);

app.use(function(req,  res, next){
    console.log(req.method,  req.url);
    next();
});

var server=  app.listen(app.get("port"),  function() {
    var port= server.address().port;
    console.log("Listening  to port "+ port);
});

