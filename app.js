var express = require("express");

var controller = require("./controllers/controller.js");

//Create the server
var app = express();

//Set ejs as view controller.
app.set("view engine", "ejs");

//Route to public for static files
app.use("/public", express.static("public"));

//Fire controllers and pass the server to it.
controller(app);

app.listen(3000);
