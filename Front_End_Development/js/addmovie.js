$(document).ready(function () {
    $(document).on('click', '.submitDirector', function () {
        var getFirstName = $("#directorfirstname").val();
        var getLastName = $("#directorlastname").val();

        var createUrl = "http://127.0.0.1:5000/insertDirector?first_name=" + getFirstName + "&last_name=" + getLastName + "&checkPresent=True";
        $.ajax({
            url: createUrl,
            datatype: "json",
            type: 'GET',
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

    $(document).on('click', '.submitActor', function () {
        var getFirstName = $("#actorfirstname").val();
        var getLastName = $("#actorlastname").val();
        var getGender = $('.listofgenders option:selected').val();

        var createUrl = "http://127.0.0.1:5000/insertActor?first_name=" + getFirstName + "&last_name=" + getLastName + "&gender=" + getGender + "&checkPresent=True";
        $.ajax({
            url: createUrl,
            datatype: "json",
            type: 'GET',
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

    $(document).on('click', ".backButton", function () {
        window.location = 'admin.html';
    });

    $(document).on('click', ".submitMovie", function () {
        console.log("hi");
        var getMovieName = $('#moviename').val();
        var getYear = $('#year').val();
        var getDirectorName = $('#dname').val();
        var getActorNames = $('#actornames').val();
        var getRoles = $('#roles').val();
        var getGenress = $('#genres').val();

        var [directorFirstName, directorLastName] = getDirectorName.split(" ");

        var directorJson = {
            "first_name": [directorFirstName],
            "last_name": [directorLastName]
        };

        var actorNamesArr = getActorNames.split(",");
        var actorRolesArr = getRoles.split(",");
        var getGeneresi = getGenress.split(",");

        var tempActorFirstNameArr = [];
        var tempActorLastNameArr = [];
        var tempActorRolesArr = [];
        $.each(actorNamesArr, function (i) {
            var [fName, lName] = actorNamesArr[i].split(" ");
            tempActorFirstNameArr.push(fName);
            tempActorLastNameArr.push(lName);
        });

        var actorJson = {
            "first_name": tempActorFirstNameArr,
            "last_name": tempActorLastNameArr,
            "gender": ["M", "F"],
            "role": actorRolesArr
        };

        var finalJson = {
            "Movie_Name": getMovieName,
            "Year": getYear,
            "Director": directorJson,
            "Actor": actorJson,
            "Genre": getGeneresi
        };
        var jsonString = JSON.stringify(finalJson);

        $.ajax({
            url: "http://127.0.0.1:5000/insertMovie",
            datatype: "json",
            data: jsonString,
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