  //Array of contents//
  var contents = ["cat", "puppy", "bear", "bird", "funny cat", "funny dog", "ostrich", "polar bear", "owl", "hedgehog", "rabbit"];
  //Generate buttons from the contents array, assign class, and custom attribute to each value//
  function generateButton() {
    $("#keyWords").empty();
    for (var i = 0; i < contents.length; i++) {
      var btn = $("<button>");
      btn.addClass("image btn-lg btn-danger");
      btn.attr("data-name", contents[i]);
      btn.text(contents[i]);
      $("#keyWords").append(btn);
      localStorage.clear();
      localStorage.setItem("search", btn);
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
      //Loop through 10 API datas and create image elements with custom attributes and div elements to display the ratings for each pictures//
      for (var i = 0; i < response.data.length; i++) {
        var newDiv = $("<div>");
        $("#images").append(newDiv);
        var showRating = $("<div>");
        var image = response.data[i].images.downsized_still.url;
        var showImage = $("<img>");
        showImage.addClass("gifs");
        showImage.attr("data-still", response.data[i].images.downsized_still.url);
        showImage.attr("data-animate", response.data[i].images.downsized.url);
        showImage.attr("data-state", "still");
        showImage.attr("src", showImage.attr("data-still"));
        showRating.addClass("rating");
        var rating = response.data[i].rating;
        newDiv.append(showImage);
        newDiv.append(showRating);
        showRating.text("Rating: " + rating);
      }
    });
  }
//Adds the keywords that user inputs as long as it's not "" nor not in the contents array already//
  $("#addKeywords").on("click", function(event) {
    event.preventDefault();
    var keywordSearch = $("#search").val().trim().toLowerCase();
    if (keywordSearch != "" && contents.indexOf(keywordSearch) === -1) {
      contents.push(keywordSearch);
      generateButton();
      document.getElementById("search").value="";
    }
  });
//Generate 10 gif images on click of keywords//
  $(document).on("click", ".image", getImages);
//Animate & stop gif images on click//
  $("#images").on("click", ".gifs", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("data-state", "animate");
      $(this).attr("src", $(this).attr("data-animate"));
    } else if (state === "animate") {
      $(this).attr("data-state", "still");
      $(this).attr("src", $(this).attr("data-still"));
    }
  });
