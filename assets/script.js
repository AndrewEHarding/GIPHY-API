$(document).ready(function () {

    var $input = $("#input");
    var $buttonsDiv = $("#buttons-div");
    var $gifCon = $("#gif-container");
    var topics = ["dogs", "frogs", "pogs"];

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
        var topic = $(this).attr("data-name");
        var rating;
        var number = $("#myselect").val();

        // =====SET RATING=====
        if ($('input[type=checkbox]').prop('checked')) { rating = "PG"; }
        else { rating = "G"; }

        console.log("Rated " + rating + "!");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Jj47hCPEGT6ulhzD7CW8qe36BtExI3qR&q="
            + topic
            + "&limit="
            + number
            "&rating="
            + rating;

        // =====AJAX QUERY=====
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                $gifCon.empty();
                var results = response.data;
                console.log(results);
                // Create GIFs
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>").addClass("gif-div mt-2 ml-2 bg-secondary");
                    var h3 = $("<h5>").text("This GIF is Rated: " + results[i].rating).addClass("rating p-2 text-light");
                    var gif = $("<img>").addClass("gif");
                    gif.attr("src", results[i].images.fixed_height_still.url);
                    gif.attr("data-state", "still");
                    gif.attr("data-still", results[i].images.fixed_height_still.url);
                    gif.attr("data-animate", results[i].images.fixed_height.url);
                    gifDiv.prepend(h3);
                    gifDiv.prepend(gif);
                    $gifCon.prepend(gifDiv);

                }
            });

    });

    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
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

    $("#clear").on("click", function(){
        $gifCon.empty();
    });

});

// API key: Jj47hCPEGT6ulhzD7CW8qe36BtExI3qR