var contents = [];

function generateButton() {
    var btn = $("<button>" + userSearch + "</button>");
    $("#keyWords").append(btn);
}


$(document).ready(function() {

  $("#button").on("click", function() {
    userSearch = document.getElementById("search").value;
    if (userSearch != "") {
      generateButton();
      contents.push(userSearch);
    }
  });
});
