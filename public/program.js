function tryCall(prog_id){
  callServer("get_all_programs",{data:prog_id},function(response){

  });
}

$(document).ready(function(){
  trycall(prog_id);
})
