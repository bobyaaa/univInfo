function callServer(path, data, success){
  $.ajax(path, {
    data:data,
    method:"post",
    success:success
  });
}

$(document).ready(function(){
  console.log("adsf");
  tryCall();
})

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

function compare(a,b) {
  if (a.last_nom < b.last_nom)
    return -1;
  if (a.last_nom > b.last_nom)
    return 1;
  return 0;
}


function tryCall(){
  callServer("get_all_universities",{},function(response){
    console.log("finished!");
    console.log(response);

    var fetchData = [];

    for(var i=0; i<response.length; i++){
      fetchData[i] = response[i].univ_name;
      // fetchId[i] = response[i].univ_id;
    }
    // fetchData.sort();
    fetchData = response.sort(function(obj1, obj2){

      let str1 = obj1.univ_name;
      let str2 = obj2.univ_name;
      console.log(str1);
      console.log(str2);
      let result = str1.localeCompare(str2);
      console.log(result);
      return result;

    });
    console.log(response);
    var $list = $("#univList");

    for(var i=0; i<fetchData.length; i++){
      var $button = $("<a>");
      $button.attr("class","list-group-item");
      var title = convertTitle(fetchData[i].univ_name);
      var params = jQuery.param({university:fetchData[i].univ_name});
      $button.attr("href","/content/?" + params);
      $button.attr("id",fetchData[i].univ_name);
      $button.attr("onclick","store(event)");
      $button.text(title);
      $list.append($button);
    }
  });
}

function store(event){
  var name = event.target.id;
  console.log(id);
  window.localStorage.setItem("univ_name",name);
  window.localStorage.setItem("univ_id", id);
}
