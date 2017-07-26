//Array of contents//
var contents = ["cat", "dog", "bear"];

//Generate buttons from the contents array//
function generateButton() {
  $("#keyWords").empty();
  for (var i = 0; i < contents.length; i++) {
    var btn = $("<button>");
    btn.addClass("image");
    btn.attr("data-name", contents[i]);
    btn.text(contents[i]);
    $("#keyWords").append(btn);
  }
}

//Gets the gif images from GIPHY API using AJAX//
function getImages() {
  var userSearch = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userSearch + "&limit=10&api_key=dc6zaTOxFJmzC";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    for (var i = 0; i < response.data.length; i++) {
      var newDiv = $("<div>");
      $("#images").append(newDiv);
      var showRating = $("<div>");
      showRating.addClass("rating");
      image = response.data[i].images.downsized.url;
      rating = response.data[i].rating;
      newDiv.append("<img src=" + image + ">");
      newDiv.append(showRating);
      showRating.text("Rating: " + rating);
    }
  });
}

$(document).ready(function() {

  $("#button").on("click", function(event) {
    event.preventDefault();
    var userSearch = $("#search").val().trim();
    if (userSearch != "") {
      contents.push(userSearch);
      generateButton();
    }
  });

  $(document).on("click", ".image", getImages);
  $("#images").empty();
  generateButton();
});
