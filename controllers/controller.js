module.exports = function(app){

  app.get("/",function(req,res){
    res.sendFile("C:/Users/ahuan/documents/univinfo/views/index.html");
  })

}
