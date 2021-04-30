$(document).ready(function () {
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        // console.log(results);
        if (results == null) {
            return null;
        }
        else {
            return decodeURI(results[1]) || 0;
        }
    }
    var fetchId = $.urlParam('id');

    var createUrl = 'http://127.0.0.1:5000/searchMovie?movie_name=' + fetchId;
    $.ajax({
         url: createUrl,
        //url: "https://api.jsonbin.io/v3/b/605e41bf9ab74a5f2bcc5027",
        datatype: "json",
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
           // 'X-Master-Key': '$2b$10$u8BckxrJmvFzVq15Kc02velEmf8Uq.6CSa89KCi.NJevtp63VZPJ2'
        },
        success: function (results) {
            console.log(results);


            var getResults = JSON.parse(results);

            var getActorsNames = getResults.Five_Actors.Actor_Names;
            var getRoles = getResults.Five_Actors.Roles;
            var getGenres = getResults.Genres;

            var getDirector = getResults.Director_Name;
            var getMovieName = getResults.Movie_Name;
            var getYear = getResults.Year;
            var combineActorsNames = getActorsNames.join(", ");
            var combineRoles = getRoles.join(", ");
            var combineGenres = getGenres.join(", ");


            var templateString = '<div class="row"><div class="col-md-6"><figure class="movie-poster"><img src="dummy/thumb-1.jpg" width="570" height="516" alt="#"></figure></div><div class="col-md-6" id="singleMovie"><h2 class="movie-title">' + getMovieName + '</h2><ul class="movie-meta"><li><strong>Premiere:</strong> ' + getYear + ' </li><li><strong>Genres:</strong> ' + combineGenres + '</li></ul><ul class="starring"><li><strong>Directors:</strong> ' + getDirector + '</li><li><strong>Stars:</strong> ' + combineActorsNames + '</li><li><strong>Roles:</strong> ' + combineRoles + '</li></ul><hr /><h3>Add Review</h3><table><tr><th style="text-align: left;"><label for="name">Your Name</label></th><td><input type="text" placeholder="Enter Your Name" name="name" id="name"></td></tr><tr><th style="text-align: left;"><label for="reviewmessage">Review Message</label></th><td><input type="text" placeholder="Enter Review Message" name="reviewmessage" id="reviewmessage" /></td></tr><tr><th style="text-align: left;"><label for="rating">Rate From 1 to 10</label></th><td><select name="rating" class="rating"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td></tr><tr><th></th><td><input type="button" class="submitReview" value="submit" style="background-color: #1e252b;color: white;padding: 4px 20px;margin: 8px 0;border: none;cursor: pointer;font-size: 15px;width: 50%;"/></td></tr></table><input type="button" class="viewreview" href="#showReview" value="View Review" style="background-color: #4CAF50;color: white;padding: 8px 20px;margin: 8px 0;border: none;cursor: pointer;font-size: 27px;width: 100%;"></div></div>';

            $(".content").append(templateString);


        }
    });

    $(document).on('click', ".viewreview", function (e) {
        var getMoviesName = $(".movie-title").text();
        var createUrl = "http://127.0.0.1:5000/getReview?name=" + getMoviesName;

        $.ajax({
            url: createUrl,
            //url: "https://api.jsonbin.io/v3/b/60605a30418f307e2583bcbb",
            datatype: "json",
            type: 'GET',
            headers: {
                'Content-Type': 'application/json',
               // 'X-Master-Key': '$2b$10$u8BckxrJmvFzVq15Kc02velEmf8Uq.6CSa89KCi.NJevtp63VZPJ2'
            },
            success: function (results) {
                var getInReview = JSON.parse(results);
                $(".movie-list").empty();
                $.each(getInReview, function (i) {
                    var templateString = '<div class="movie"><p><strong>Name: </strong>' + getInReview[i].name + '</p><p><strong>Comment: </strong>' + getInReview[i].comment + '</p><p><strong>Rating: </strong> ' + getInReview[i].rating + '</p></div>';
                    $(".movie-list").append(templateString);
                });
            }
        });

        e.preventDefault();
        var targetID = $(this).attr('href');
        var elementPosition = $(targetID).offset().top
        $('html,body').animate({ scrollTop: elementPosition }, 'slow');

    });

    $(document).on('click', ".submitReview", function () {
        var getName = $("#name").val();
        var getReviewMessage = $("#reviewmessage").val();
        var getRating = $('.rating option:selected').val();
        var getMovieName = $(".movie-title").text();

        var createUrl = "http://127.0.0.1:5000/addReview?name=" + getName + "&movie_name=" + getMovieName + "&review_message=" + getReviewMessage + "&star=" + getRating;

        $.ajax({
            url: createUrl,
            datatype: "json",
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'X-Master-Key': '$2b$10$u8BckxrJmvFzVq15Kc02velEmf8Uq.6CSa89KCi.NJevtp63VZPJ2'
            },
            success: function (results) {
                console.log(results);
                alert(results);
            }
        });
    });
});