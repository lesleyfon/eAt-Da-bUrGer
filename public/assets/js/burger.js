// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-sleep").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data("id");
    // var newSleep = $(this).data("newsleep");
    var newSleep = true;
    console.log("newSleep: ", newSleep)
    var burgerUpdate = {
      devoured: newSleep
    };

    // Send the PUT request.
    // $.put("/api/burgers/" + id, burgerUpdate, function(data){
    //   console.log(data)
    //   location.reload();
    // })
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: burgerUpdate
    }).then(
      function(data) {
        console.log("changed burger to", data);
        // Reload the page to get the updated list
        location.reload();
      });
  });

  $("#create_button").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#burger_name").val(),
      devoured: 0
    };
    console.log("newBurger", newBurger)
    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new cat");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

    $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");
    console.log(id);
    $.ajax("/api/burgers/" + id, {
      type: "DELETE" 
    }).then(
    function(){
      console.log("deleted a cat");
      location.reload();
    });
});
});
