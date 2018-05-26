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

function tryCall(){
  callServer("get_all_programs",{},function(response){
    console.log("finished!");
    console.log(response);

    var $list = $("#progList");
    var noDupes = [];
    var fetchNames = [];

    response.sort();

    for(var i=0; i<response.length; i++){
      noDupes[i] = response[i].prog_name;
    }

    var nooDupes = [];
    $.each(noDupes, function(i, el){
      if($.inArray(el, nooDupes) === -1)
        nooDupes.push(el);
    });
    nooDupes = nooDupes.sort();
    console.log(nooDupes);

    for(var i=0; i<nooDupes.length; i++){
      var $ul = $("<ul>");
      $ul.attr("class","list-group-item");
      $ul.attr("id",nooDupes[i]);
      $ul.attr("onclick","show(event)");
      $ul.css("cursor","pointer");
      var title = convertTitle(nooDupes[i]);
      $ul.text(title);
      $list.append($ul);
    }

    for(var i=0; i<response.length; i++){
      var $list = $("#"+response[i].prog_name);
      var $button = $("<a>");
      $button.addClass("list-group-item");
      $button.css("display","none");
      var title = convertTitle(response[i].prog_name);
      var univ = convertTitle(response[i].univ_name);
      console.log(response[i].univ_name);
      var params = jQuery.param({program:response[i].prog_id});
      $button.attr("href","/program/?" + params);
      $button.text(title+ " - " +univ);
      $list.append($button);
    }
  });
}

$(document).ready(function(){
  console.log("ready!");
  tryCall();
})

function show(event){
  var id = event.target;
  var children = $(id).children();
  $(children).fadeIn(500);
}
// $(".slideUp").on("click",function(){
//   console.log("adsf");
//   $(".slideDown").slideDown(1000);
//   $("#father").addClass("loud");
// })
