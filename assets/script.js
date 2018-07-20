$(document).ready(function () {

    var $input = $("#input");
    var $buttonsDiv = $("#buttons-div");
    var $gifDiv = $("#gif-div");
    var topics = ["dogs", "frogs", "pogs"];
    rating = "G";

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Jj47hCPEGT6ulhzD7CW8qe36BtExI3qR&q="
        + topic
        + "&limit=10&rating="
        + rating;

    // =====AJAX QUERY=====
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            results = response.data;
            console.log(results);
            $gifDiv.empty();

        });

    // =====MAKE BUTTONS=====
    function makeButtons() {
        $buttonsDiv.empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("gif-btn btn btn-secondary mt-2 ml-2");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $buttonsDiv.append(a);
        }
    }
    makeButtons();

    $(document).on("click", ".gif-btn", function () {
        console.log("GIF-Button clicked!");
    });

    $input.next().on("click", function (event) {
        console.log("Input button clicked!");
        event.preventDefault();
        var input = $input.val().trim().toLowerCase();
        console.log("Input is " + input);
        if (input !== "" && topics.indexOf(input) == -1) {
            topics.push(input);
            makeButtons();
        }
    });

});

// API key: Jj47hCPEGT6ulhzD7CW8qe36BtExI3qR