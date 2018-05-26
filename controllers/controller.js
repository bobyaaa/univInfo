var Database = require("./database.js");

module.exports = function(app){

  //DIRECTING TO PAGES
  app.get("/",function(req,res){
    res.sendFile("C:/Users/ahuan/documents/univinfo/views/index.html");
  });

  app.get("/home",function(req,res){
    res.sendFile("C:/Users/ahuan/documents/univinfo/views/index.html");
  });

  app.get("/universities",function(req,res){
    res.sendFile("C:/Users/ahuan/documents/univinfo/views/universities.html");
  });

  app.get("/programs",function(req,res){
    res.sendFile("C:/Users/ahuan/documents/univinfo/views/programs.html");
  });

  app.get("/content",function(req,res){
    res.render("content",{qs:req.query});
  });

  app.get("/program",function(req,res){
    res.render("program",{qs:req.query});
  });

  app.get("/review_editor", function(req, res){
    res.sendFile("C:/Users/ahuan/documents/univinfo/views/reviewEditor.html")
  });

  //MODERATING DATABSE REQUESTS

  app.post("/get_all_universities",function(req,res){
    console.log("reached!");
    var db = new Database();
    db.getAllUniversities(function(results){
      console.log("finished.");
      res.writeHead(200, {"Content-Type":"text/json"});
      res.write(JSON.stringify(results));
      res.end();
    })
  })

  app.post("/get_all_programs",function(req,res){
    console.log("reached!");
    var db = new Database();
    db.getAllPrograms(function(results){
      console.log("finished.");
      res.writeHead(200, {"Content-Type":"text/json"});
      res.write(JSON.stringify(results));
      res.end();
    })
  })

  app.post("/get_all_programs_univ",function(req,res){
    console.log("reached!");
    var db = new Database();
    db.getAllProgramsUniv({data:req.univ_id},function(results){
      console.log("finished.");
      res.writeHead(200, {"Content-Type":"text/json"});
      res.write(JSON.stringify(results));
      res.end();
    })
  })

}
