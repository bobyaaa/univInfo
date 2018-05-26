function callServer(path, data, success){
  $.ajax(path, {
    data:data,
    method:"post",
    success:success
  });
}

function convertUpper(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function convertTitle(str){
  str = convertUpper(str);
  str = str.replace(/_/g," ");
  for(var i=0; i<str.length; i++){
    if(str.charAt(i)===' '){
      str = str.substring(0,i) + " " + str.charAt(i+1).toUpperCase() + str.substring(i+2,str.length);
    }
  }
  return str;
}

$(document).ready(function(){
  var $title = $("#title");
  var university = convertTitle($title.text());
  $title.text(university);
  tryCall();
})

function goHome(){
  $("#homeBtn").addClass("active");
  $("#reviewBtn").removeClass("active");
  $("#programBtn").removeClass("active");
  $("#reviews").fadeOut(500);
  $("#programs").fadeOut(500);
  setTimeout(function(){
    $("#home").fadeIn(500);
  },500);
  console.log("adsf");
}

function goReviews(){
  $("#reviewBtn").addClass("active");
  $("#homeBtn").removeClass("active");
  $("#programBtn").removeClass("active");
  $("#home").fadeOut(500);
  $("#programs").fadeOut(500);
  setTimeout(function(){
    $("#reviews").fadeIn(500);
  },500);
}

function goPrograms(){
  $("#programBtn").addClass("active");
  $("#homeBtn").removeClass("active");
  $("#reviewBtn").removeClass("active");
  $("#home").fadeOut(500);
  $("#reviews").fadeOut(500);
  setTimeout(function(){
    $("#programs").fadeIn(500);
  },500);
}

function tryCall(){

  var univ_id = $("#title").text();
  console.log(univ_id);

  callServer("get_all_programs_univ",{data:univ_id},function(response){
    console.log("finished!");
    console.log(response);

    var $list = $("#progList");
    var fetchNames = [];

    response.sort();

    for(var i=0; i<response.length; i++){
      var $list = $("#"+response[i].prog_name);
      var $button = $("<a>");
      $button.addClass("list-group-item");
      var title = convertTitle(response[i].prog_name);
      var params = jQuery.param({program:response[i].prog_id});
      $button.attr("href","/program/?" + params);
      $button.text(title);
      $list.append($button);
    }
  });
}
