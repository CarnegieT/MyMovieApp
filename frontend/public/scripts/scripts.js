//retuns movie search results in a  formatted table
function getMovieResults() {
  var movieName_val = $("#movieName").val();
  $.ajax({
    url: "http://localhost:5678/Movie/" + movieName_val,
    type: "get",
    success: function (response) {
      var html = "<table class='table' id='MovieList'>";
      html = html + "<thead>";
      html = html + "<tr>";
      html = html + "<th>title</th>";
      html = html + "<th>description</th>";
      html = html + "<th>poster</th>";
      html = html + "<th>Favorite</th>";
      html = html + "</tr>";
      html = html + "</thead>";

      Movies = response;
      console.log(Movies);
      Movies.forEach(movie => {
        // console.dir(movie)
        // console.log(movie.id,movie.title,movie.description,movie.image)
        row = '<tr scope="row">'
        row = row + '<td>' + movie.title + '</td>'
        row = row + '<td>' + movie.description + '</td>'
        row = row + '<td>' + '<img src="' + movie.image + '" width="50" /></td>'
        row = row + '<td>' + '<button onclick="addMovie(\'' + movie.id + '\')">Favorite</button>'
        row = row + '</tr>'
        html = html + row;
      });
      html = html + '</table>'
      console.log(html)

      console.log("after MovieList loop")
      $("#mydiv").html(html);

    },
    error: function (xhr) {
      $("#mydiv").text('error: ' + xhr);
    }
  });
}
//Adds movie clicked on by user to watchList DB
function addMovie(title) {
  //alert(title);
  $.ajax({
    url: "http://localhost:5678/MovieInfo/" + title,
    type: "get",
    success: function (response) {
      alert("'" + response.title + "'" + " added to DB!")
    },
    error: function (xhr) {
      $("#mydiv").text('error: ' + xhr);
    }
  });
}

//retuns tv/series search results in a  formatted table
function getTVResults() {
  var tvName_val = $("#tvName").val();
  $.ajax({
    url: "http://localhost:5678/Series/" + tvName_val,
    type: "get",
    success: function (response) {
      var html = "<table class='table' id='TvList'>";
      html = html + "<thead>";
      html = html + "<tr>";
      html = html + "<th>title</th>";
      html = html + "<th>description</th>";
      html = html + "<th>poster</th>";
      html = html + "</tr>";
      html = html + "</thead>";

      Tvs = response;
      console.log(Tvs);
      Tvs.forEach(show => {
        // console.dir(movie)
        // console.log(movie.id,movie.title,movie.description,movie.image)
        row = '<tr scope="row">'
        row = row + '<td>' + show.title + '</td>'
        row = row + '<td>' + show.description + '</td>'
        row = row + '<td>' + '<img src="' + show.image + '" width="50" /></td>'
        row = row + '</tr>'
        html = html + row;
      });
      html = html + '</table>'
      console.log(html)

      console.log("after TVList loop")
      $("#mydiv").html(html);

    },
    error: function (xhr) {
      $("#mydiv").text('error: ' + xhr);
    }
  });
}
//retuns a poster result in a  formatted table
function getPosterResults() {
  var id_val = $("#id").val();
  $.ajax({
    url: "http://localhost:5678/Series/" + id_val,
    type: "get",
    success: function (response) {
      var html = "<table class='table' id='PosterList'>";
      html = html + "<thead>";
      html = html + "<tr>";
      html = html + "<th>title</th>";
      html = html + "<th>poster</th>";
      html = html + "</tr>";
      html = html + "</thead>";

      Posters = response;
      console.log(Posters);
      Posters.forEach(poster => {
        // console.dir(movie)
        // console.log(movie.id,movie.title,movie.description,movie.image)
        row = '<tr scope="row">'
        row = row + '<td>' + poster.title + '</td>'
        row = row + '<td>' + '<img src="' + poster.image + '" width="200" /></td>'
        row = row + '</tr>'
        html = html + row;
      });
      html = html + '</table>'
      console.log(html)

      console.log("after PosterList loop")
      $("#mydiv").html(html);
    },
    error: function (xhr) {
      $("#mydiv").text('error: ' + xhr);
    }
  });
}

//retuns movie/series ratings in a formatted table
function getRatings() {
  var id_val = $("#id").val();
  $.ajax({
    url: "http://localhost:5678/Ratings/" + id_val,
    type: "get",
    success: function (response) {
      var html = "<table class='table' id='RatingsList'>";
      html = html + "<thead>";
      html = html + "<tr>";
      html = html + "<th>title</th>";
      html = html + "<th>IMDB rating</th>";
      html = html + "<th>metacritic rating</th>";
      html = html + "<th>themovieDB rating</th>";
      html = html + "<th>rottenTomatoes rating</th>";
      html = html + "</tr>";
      html = html + "</thead>";

      Ratings = response;
      console.log(Ratings);
      Ratings.forEach(rating => {
        // console.dir(movie)
        // console.log(movie.id,movie.title,movie.description,movie.image)
        row = '<tr scope="row">'
        row = row + '<td>' + rating.title + '</td>'
        row = row + '<td>' + rating.imDb + '</td>'
        row = row + '<td>' + rating.metacritic + '</td>'
        row = row + '<td>' + rating.theMovieDb + '</td>'
        row = row + '<td>' + rating.rottenTomatoes + '</td>'
        row = row + '</tr>'
        html = html + row;
      });
      html = html + '</table>'
      console.log(html)

      console.log("after RatingsList loop")
      $("#mydiv").html(html);
    },
    error: function (xhr) {
      $("#mydiv").text('error: ' + xhr);
    }
  });
}

//retuns  upcoming movie results in a formatted table
function getUpcoming() {
  var id_val = $("#id").val();
  $.ajax({
    url: "http://localhost:5678/ComingSoon",
    type: "get",
    success: function (response) {
      var html = "<table class='table' id='UpcomingList'>";
      html = html + "<thead>";
      html = html + "<tr>";
      html = html + "<th>title</th>";
      html = html + "<th>description</th>";
      html = html + "<th>poster</th>";
      html = html + "<th>rating</th>";
      html = html + "<th>release date</th>";
      html = html + "</tr>";
      html = html + "</thead>";

      Movies = response;
      console.log(Movies);
      Movies.forEach(movie => {
        // console.dir(movie)
        // console.log(movie.id,movie.title,movie.description,movie.image)
        row = '<tr scope="row">'
        row = row + '<td>' + movie.title + '</td>'
        row = row + '<td>' + movie.plot + '</td>'
        row = row + '<td>' + '<img src="' + movie.image + '" width="50" /></td>'
        row = row + '<td>' + movie.contentRating + '</td>'
        row = row + '<td>' + movie.releaseState + '</td>'
        row = row + '</tr>'
        html = html + row;
      });
      html = html + '</table>'
      console.log(html)

      console.log("after MovieList loop")
      $("#mydiv").html(html);
    },
    error: function (xhr) {
      $("#mydiv").text('error: ' + xhr);
    }
  });
}

//retuns IMDB id in a  formatted table
function getID() {
  var title_val = $("#title").val();
  $.ajax({
    url: "http://localhost:5678/Id/" + title,
    type: "get",
    success: function (response) {
      var html = "<table class='table' id='ID'>";
      html = html + "<thead>";
      html = html + "<tr>";
      html = html + "<th>ID</th>";
      html = html + "</tr>";
      html = html + "</thead>";

      Id = response;
      console.log(Id);
      row = '<tr scope="row">'
      row = row + '<td>' + Id + '</td>'
      row = row + '</tr>'
      html = html + row;

      html = html + '</table>'
      console.log(html)

      console.log("results:")
      $("#mydiv").html(html);
    },
    error: function (xhr) {
      $("#mydiv").text('error: ' + xhr);
    }
  });
}

//returns all movies in watchList
function getMovies() {
  $.ajax({
    url: "http://localhost:5678/watchList",
    type: "get",
    success: function (response) {
      var html = "<table class='table' id='watchList'>";
      html = html + "<thead>";
      html = html + "<tr>";
      html = html + "<th>title</th>";
      html = html + "<th>IMDB ID</th>";
      html = html + "<th>poster</th>";
      html = html + "<th>description</th>";
      html = html + "</tr>";
      html = html + "</thead>";

      Movies = response;
      console.log(Movies);
      Movies.forEach(movie => {
        // console.dir(movie)
        // console.log(movie.id,movie.title,movie.description,movie.image)
        row = '<tr scope="row">'
        row = row + '<td>' + movie.title + '</td>'
        row = row + '<td>' + movie.movie_id + '</td>'
        row = row + '<td>' + '<img src="' + movie.image + '" width="50" /></td>'
        row = row + '<td>' + movie.description + '</td>'
        row = row + '</tr>'
        html = html + row;
      });
      html = html + '</table>'
      console.log(html)

      console.log("after WatchList loop")
      $("#mydiv").html(html);

    },
    error: function (xhr) {
      $("#mydiv").text('error: ' + xhr);
    }
  });
}



