function callServer(path, data, success){
  $.ajax(path, {
    data:data,
    method:"post",
    success:success
  });
}
