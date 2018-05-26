function callServer(path, data, success){
  $.ajax(path, {
    data:data,
    method:"post",
    success:success
  });
}

$(document).ready(function(){
  tryCall();
})

function tryCall(){
  callServer("get_all_universities",{},function(response){
    console.log("finished!");
    var $list = $("#list");
    for(var i=0; i<response.length; i++){
      $list.append(response[i].univ_name);
    }
  });
}

// window.localStorage.setItem("last","league reddit");
