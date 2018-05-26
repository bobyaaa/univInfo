var express = require("express");
var http = require("http");
// var path = require("path");
// var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// var exphbs = require("express-handlebars");
// var expressValidator = require("express-validator");
// var flash = require("connect-flash");
// var session = require("express-session");
// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// var mongo = require("mongodb");
// var mongoose = require("mongoose");
// mongoose.connect("mondodo://localhost/loginapp");
// var db = mongoose.connection;
var controller = require("./controllers/controller.js");

//Create the server
var app = express();

//Set ejs as view controller.
app.set("view engine", "ejs");

//Route to public for static files
app.use("/public", express.static("public"));

controller(app);



//Fire controllers and pass the server to it.


app.listen(3000);
