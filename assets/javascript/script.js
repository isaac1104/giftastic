$(document).ready(function() {
  //Array of contents//
  contents = ["cat", "puppy", "bear", "bird", "funny cat"];
  //Generate buttons from the contents array, assign class, and custom attribute to each value//
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
  generateButton();
  //Gets the gif images from GIPHY API using AJAX//
  function getImages() {
    var userSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userSearch + "&limit=10&api_key=dc6zaTOxFJmzC";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      $("#images").empty();
      for (var i = 0; i < response.data.length; i++) {
        var newDiv = $("<div>");
        $("#images").append(newDiv);
        var showRating = $("<div>");
        showRating.addClass("rating");
        image = response.data[i].images.downsized_still.url;
        rating = response.data[i].rating;
        newDiv.append("<img src=" + image + ">");
        newDiv.append(showRating);
        showRating.text("Rating: " + rating);
      }
    });
  }

  $("#addKeywords").on("click", function(event) {
    event.preventDefault();
    var keywordSearch = $("#search").val().trim().toLowerCase();
    if (keywordSearch != "" && contents.indexOf(keywordSearch) === -1) {
      contents.push(keywordSearch);
      generateButton();
      document.getElementById("search").value="";
    }
  });
  $(document).on("click", ".image", getImages);
});
