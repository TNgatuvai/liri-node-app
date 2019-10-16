require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");

var spotify = require("node-spotify-api");
var spotifyApi = new spotify(keys.spotify);

var searchType = process.argv[2];
var choice = process.argv[3];

function bandSearch() {
  axios.get("https://rest.bandsintown.com/artists/" + choice + "/events?app_id=codingbootcamp").then(function (response) {
    for (let i = 0; i < response.data.length; i++) {
      var stuff = response.data[i];
      console.log("Venue: " + stuff.venue.name);
      console.log("Location: " + stuff.venue.city);
      var eventTime = stuff.datetime;
      var momentTime = moment(eventTime).format("MM-DD-YYYY");
      console.log("Date: " + momentTime);
    }
  })
}

  function songSearch() {
    spotifyApi.search({ type: 'track', query: choice, market: "US" }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      for (let i = 0; i < data.tracks.items.length; i++) {
        const track = data.tracks.items[i];
        console.log("Song: " + track.name);
        console.log("Track Preview Link: " + track.external_urls.spotify);
        console.log("Album: " + track.album.name);
        for (let j = 0; j < track.artists.length; j++) {
          const artist = track.artists[j];
          console.log("Artist: " + artist.name);
        }
      }
    })
  }

  function movieSearch() {
    var movieInfo = "http://www.omdbapi.com/?t=" + choice + "&apikey=trilogy";
    axios.get(movieInfo).then(
      function (response) {
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        for (let i = 0; i < response.data.Ratings.length; i++) {
          console.log(response.data.Ratings[i]);
          //need to filter response to just Rotten Tomatoes
        }
      })
  }


  function randomSearch() {
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
      data = data.split(", ");
      pickData(Arr[0], Arr[1]);
      
    })
  }

  switch (searchType) {
    case "concert-this":
      bandSearch()
      break;

    case "spotify-this-song":
      songSearch();
      break;

    case "movie-this":
      movieSearch();
      break;

    case "do-what-it-says":
      randomSearch();
      break;
  }