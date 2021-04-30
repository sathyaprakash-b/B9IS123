$(document).ready(function () {
	$.ajax({
		url: "http://127.0.0.1:5000/mainPageMovies",
		//url: "https://api.jsonbin.io/v3/b/605e420d7c9f775f638a3734/8",
		datatype: "json",
		type: 'GET',
		headers: {
			'Content-Type': 'application/json',
			//'X-Master-Key': '$2b$10$u8BckxrJmvFzVq15Kc02velEmf8Uq.6CSa89KCi.NJevtp63VZPJ2'
		},
		success: function (results) {
			console.log(results);
			// console.log(results.record.Movie_Names[1]);

			var movies = JSON.parse(results);
			var new_Movie = movies.index_movies;
			$.each(new_Movie, function (i) {
				var templateString = '<div class="col-sm-6 col-md-3"><div class="latest-movie"><a class="clicksinglemovie" data-id="' + new_Movie[i].movie_name + '"><img src="dummy/thumb-' + (i + 1) + '.jpg" alt="Movie 3"></a><h2 class="section-title" style="font-size: 1em; padding-top: 10px;"><strong>Movie Name:</strong> ' + new_Movie[i].movie_name + '<br /><strong>Year of Release:</strong> ' + new_Movie[i].movie_year + '<br /><strong>Rating:</strong> ' + new_Movie[i].rating + '</h2></div></div>';
				$("#getAllMovies").append(templateString);
			});
		}
	});

	$(document).on('click', '.clicksinglemovie', function () {
		var id = $(this).attr('data-id');
		window.location = 'single.html?id=' + id;
	});

	// if radio buttons are clicked

	$(document).on('click', "#directors", function () {
		$(".listofgenres").hide();
		$("#normalsearch").show();
	});

	$(document).on('click', "#actors", function () {
		$(".listofgenres").hide();
		$("#normalsearch").show();
	});

	$(document).on('click', "#genres", function () {
		if ($('input:radio[name=searchcat]:checked').val() == "genres") {
			$(".listofgenres").show();
			$("#normalsearch").hide();
		} else {
			$(".listofgenres").hide();
			$("#normalsearch").show();
		}
	});

	// end of radio button operations

	// authenticate admin

	$(document).on('click', ".authenticateAdmin", function () {
		var getUsername = $('#username').val();
		var getPassword = $('#password').val();
		if (getUsername == "admin" && getPassword == "admin") {
			window.location = 'admin.html';
		}
	});

	// search with different paramters

	$(document).on('click', ".searchItems", function () {
		if ($('input:radio[name=searchcat]:checked').val() == "genres") {
			var selectedvalue = $('.listofgenres option:selected').text();
			var createUrl = 'http://127.0.0.1:5000/getMovieBasedonGenre?genre=' + selectedvalue;

			$.ajax({
				 url: createUrl,
				//url: "https://api.jsonbin.io/v3/b/605e3f96838e525f31190c04",
				datatype: "json",
				type: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Master-Key': '$2b$10$u8BckxrJmvFzVq15Kc02velEmf8Uq.6CSa89KCi.NJevtp63VZPJ2'
				},
				success: function (results) {
					console.log(results);

					var movies = JSON.parse(results);
					var new_Movie = movies.Movies;
					$("#getAllMovies").empty();
					$.each(new_Movie, function (i) {
						var templateString = '<div class="col-sm-6 col-md-3"><div class="latest-movie"><a class="clicksinglemovie" data-id="' + movies.Movies[i] + '"><img src="dummy/thumb-' + (i + 1) + '.jpg" alt="Movie 3"></a><h2 class="section-title" style="font-size: 1em; padding-top: 10px;"><strong>Movie Name:</strong> ' + movies.Movies[i] + '<br /><strong>Year of Release:</strong> ' + movies.Years[i] + '<br /><strong>Rating:</strong> ' + movies.Ratings[i] + '</h2></div></div>';
						$("#getAllMovies").append(templateString);
					});
				}
			});

		}else if ($('input:radio[name=searchcat]:checked').val() == "searchmovie") {
			var getInputValue = $('#normalsearch').val();
			window.location = 'single.html?id=' + getInputValue;
		} 
		else if ($('input:radio[name=searchcat]:checked').val() == "directors") {
			var getInputValue = $('#normalsearch').val();
			var [firstName, lastName] = getInputValue.split(" ");
			var createUrl = 'http://127.0.0.1:5000/searchDirector?first_name=' + firstName + '&last_name=' + lastName;

			$.ajax({
				url: createUrl,
				//url: "https://api.jsonbin.io/v3/b/605e40c49ab74a5f2bcc4f5f",
				datatype: "json",
				type: 'GET',
				headers: {
					'Content-Type': 'application/json',
					//'X-Master-Key': '$2b$10$u8BckxrJmvFzVq15Kc02velEmf8Uq.6CSa89KCi.NJevtp63VZPJ2'
				},
				success: function (results) {
					console.log(results);

					var getResults = JSON.parse(results);

					var getDirectorFirstName = getResults.Director_First_Name;
					var getDirectorLastName = getResults.Director_Last_Name;
					var combineName = getDirectorFirstName.concat(" ", getDirectorLastName);
					console.log(combineName);

					var getNoOfMovies = getResults.Number_Of_Movies;
					console.log(getNoOfMovies);
					var getMovieNames = getResults.Top_5_Movies.Movie_Names;
					var getReleaseYears = getResults.Top_5_Movies.Release_Years;

					var combineMovieAndYear = '';
					$.each(getMovieNames, function (i) {
						var temp = "<strong>" + getMovieNames[i] + "</strong> - " + getReleaseYears[i];
						if (combineMovieAndYear == '') {
							combineMovieAndYear = temp;
						} else {
							combineMovieAndYear = combineMovieAndYear + "<br />" + temp;
						}
					});

					$("#getAllMovies").empty();

					var templateString = '<div class="row"><div class="col-md-6"><figure class="movie-poster"><img src="dummy/person-1.jpg" width="570" height="516" alt="#"></figure></div><div class="col-md-6" id="singleMovie"><h1>Director Details</h1><h3 class="movie-title">' + combineName + '</h3><ul class="movie-meta"><li><strong>Number of Movies:</strong> ' + getNoOfMovies + ' </li><li><strong>Top 5 Movies: </strong><br /> ' + combineMovieAndYear + '</li></ul></div></div>';

					$("#getAllMovies").append(templateString);
				}
			});

		} else {


			var getInputValue = $('#normalsearch').val();
			var [firstName, lastName] = getInputValue.split(" ");

			var createUrl = 'http://127.0.0.1:5000/searchActor?first_name=' + firstName + '&last_name=' + lastName;

			$.ajax({
				url: createUrl,
				//url: "https://api.jsonbin.io/v3/b/605e413f7c9f775f638a36a3",
				datatype: "json",
				type: 'GET',
				headers: {
					'Content-Type': 'application/json',
					//'X-Master-Key': '$2b$10$u8BckxrJmvFzVq15Kc02velEmf8Uq.6CSa89KCi.NJevtp63VZPJ2'
				},
				success: function (results) {
					console.log(results);

					var getResults = JSON.parse(results);

					var getActorFirstName = getResults.Actor_First_Name;
					var getActorLastName = getResults.Actor_Last_Name;
					var combineName = getActorFirstName.concat(" ", getActorLastName);
					console.log(combineName);

					var getNoOfMovies = getResults.Number_Of_Movies;
					console.log(getNoOfMovies);

					var getMovieNames = getResults.Top_5_Movies.Movie_Names;
					var getReleaseYears = getResults.Top_5_Movies.Release_Years;
					var getRoles = getResults.Top_5_Movies.Roles;

					var combineMovieAndYear = '';
					$.each(getMovieNames, function (i) {
						var temp = "<strong>" + getMovieNames[i] + "</strong> (" + getRoles[i] + ") - " + getReleaseYears[i];
						if (combineMovieAndYear == '') {
							combineMovieAndYear = temp;
						} else {
							combineMovieAndYear = combineMovieAndYear + " <br />" + temp;
						}
					});

					$("#getAllMovies").empty();

					var templateString = '<div class="row"><div class="col-md-6"><figure class="movie-poster"><img src="dummy/person-1.jpg" width="570" height="516" alt="#"></figure></div><div class="col-md-6" id="singleMovie"><h1>Actor Details</h1><h3 class="movie-title">' + combineName + '</h3><ul class="movie-meta"><li><strong>Number of Movies:</strong> ' + getNoOfMovies + ' </li><li><strong>Top 5 Movies: </strong><br /> ' + combineMovieAndYear + '</li></ul></div></div>';

					$("#getAllMovies").append(templateString);
				}
			});

		}
	});


});