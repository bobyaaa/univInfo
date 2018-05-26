var mysql = require("mysql");
var util = require("util");
var asyn = require("async");
var EventEmitter = require('events').EventEmitter;

function Database() {}

util.inherits(Database, EventEmitter);

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pythagoras4604"
});

//CONNECTING TO THE DATABASE AS ROOT USER
// Database.prototype.connect = function(callback){
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});
// }

//FETCHING DATA FROM THE DATABASE
Database.prototype.getAllUniversities = function(callback){
  var sql = "SELECT * FROM univinfo.universities";
  var fields = [];

  con.query(sql, fields, function (err, result) {
      if (err) throw err;
      console.log("database.js");
      callback(result);
  });
}

Database.prototype.getAllPrograms = function(callback){
  var sql = "SELECT prog_id, prog_name, univ_id FROM univinfo.programs";
  var univSql = "SELECT univ_name FROM univinfo.universities WHERE univ_id = ?"
  var fields = [];

  con.query(sql, fields, function (err, result) {
      if (err) throw err;
      console.log("reached database!");

      asyn.each(result, function(result,ccallback){
        con.query(univSql, [result.univ_id], function(err, rresult){
          if (err) throw err;
          result.univ_name = rresult[0].univ_name;
          ccallback(err, rresult);
        });
      }, function(){ //Callback needs to be in a function for some reason...
        callback(result);
        }
      );
  });
}

Database.prototype.getAllProgramsUniv = function(info, callback){
  var sql = "SELECT * FROM univinfo.universities WHERE univ_id = ?";
  var fields = [info.data];

  con.query(sql, fields, function (err, result) {
      if (err) throw err;
      console.log("database.js");
      callback(result);
  });
}

module.exports = Database;
