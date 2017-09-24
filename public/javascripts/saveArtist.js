$(".addFav").on("click", function(){
  console.log(content);
  $.ajax({
    url: "/saveArtist",
    method: "POST",
    data: content,
    success: function(){
      console.log("done")
    }
  })
})
