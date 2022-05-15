//movieserver.js

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const http = require('http');
const glob = require('glob');
const axios = require('axios').default;
var url = "mongodb://127.0.0.1:27017/";
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const { json } = require('body-parser');
const { response } = require('express');
const { Console } = require('console');
require('dotenv').config(); //loads IMDB API

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false }))
app.use(express.static('./frontend'));

const api_key = process.env.API_KEY;    //pull API key from environment variable 

app.use(cors ({
    origin: '*'
}));


/* IMDB API endpoints */

//GET requet
/*Description: Accesses user entered search and passes 
the information to the GetmovieRequest function */
app.get('/Movie/:movieName', function(req, res){
    var movieName = req.params.movieName;  

    //call to GetmovieRequest function
    const data = GetmovieRequest(movieName, res);
});
//Function Name: GetmovieRequest 
//Description: Access IMDB API to return movie result list where the title matches the search entered by the user
//@Params: Var MovieName (represents the search entered by user), res (response variable for get method)
//@Return: sends a result list that will be outputed to the user
function GetmovieRequest(movieName, res){
    axios.get('https://imdb-api.com/en/API/SearchMovie/'+ api_key + '/' + movieName + '/').then(
        (response) => {
            var result = response.data;    //captures search result information 
            console.log("Searching results for the movie " + "'" + movieName  + "'" + "...\n");
            var obj = result.results;   //convert data into an object variable'
            console.log("Success!");
            console.dir(obj); //Output all the data  properties
            res.status(200).send(obj);  //return information if sucessful 

         },
         (error) => {
             //display error message if acessing API requets is unsucessful 
             console.log(error.response);
             res.status(404).send("Error acessing API!");
         }
    );
}


//GET requet
/*Description: Accesses user entered search and passes 
the information to the GetTVRequest function */
app.get('/Series/:tvName', function(req, res){
    var tvName = req.params.tvName;

    //call to GetmovieRequest function
    GettvRequest(tvName, res);
});
//Function Name: GettvRequest 
//Description: Access IMDB API to return movie result list where the title matches the search entered by the user
//@Params: Var TvName (represents the search entered by user)
//@Return: a list of all the tv series results from the search
function GettvRequest(tvName, res){
    axios.get('https://imdb-api.com/en/API/SearchSeries/'+ api_key + '/' + tvName + '/').then(
        (response) => {
            var result = response.data;    //captures search result information 
            console.log("Searching results for the series " + "'" + tvName  + "'" + "...\n");
            var obj = result.results;   //convert data into an object variable
            console.log("Success!");
            console.dir(result); //Output all the data  properties
            res.status(200).send(obj);  //return information if sucessful 
         },
         (error) => {
             //display error message if acessing API requets is unsucessful 
            console.log(error.response);
            res.status(400).send("Error acessing API!");
         }
    );
}


//GET requet
/*Description: Accesses user entered search and passes 
the information to the GetposterRequest function */
app.get('/Posters/:id', function(req, res){
    var id = req.params.id;

    //call to GetmovieRequest function
    GetposterRequest(id, res);
});
//Function Name: GetposterRequest 
//Description: Access IMDB API to return poster where the title matches the search entered by the user
//@Params: Var id (represents the imdb id for a movie/series)
//@Return: a list of poster urls where the id matches the id entered by the user
function GetposterRequest(id, res){
    axios.get('https://imdb-api.com/en/API/Posters/'+ api_key + '/' + id).then(
        (response) => {
            var result = response.data;    //captures search result information 
            console.log("Searching for posters with an IDMb id of " + "'" + id + "'" + "...\n");
            console.log("Success!");
            console.dir(result); //Output all the data  properties
            res.status(200).send(result);  //return information if sucessful 
         },
         (error) => {
             //display error message if acessing API requets is unsucessful 
            console.log(error.response);
            res.status(400).send("Error acessing API!");
         }
    );
}


//GET requet
/*Description: Accesses user entered search and passes 
the information to the GetcomingsoonRequest function */
app.get('/ComingSoon', function(req, res){

    //call to GetmovieRequest function
    GetcomingsoonRequest(res);
});
//Function Name: GetcomingsoonRequest 
//Description: Access IMDB API to return list of upcoing movies
//@Params: N/A
//@Return: a list of movies that are coming soon
function GetcomingsoonRequest (res){
    axios.get('https://imdb-api.com/en/API/ComingSoon/'+ api_key).then(
        (response) => {
            var result = response.data;    //captures search result information 
            console.log("Searching for upcoming movies...\n");
            console.log("Success!");
            var movies = result.items;
           // var arr = [];
            //arr.push(movies);
            console.dir(movies); //Output all the data  properties
            res.status(200).send(movies);  //return information if sucessful 
         },
         (error) => {
             //display error message if acessing API requets is unsucessful 
            console.log(error.response);
            res.status(400).send("Error acessing API!");
         }
    );
}


//GET requet
/*Description: Accesses user entered search and passes 
the information to the GetratingsRequest function */
app.get('/Ratings/:id', function(req, res){
    var id = req.params.id; //store id entered

    //call to GetmovieRequest function
    GetratingsRequest(id, res);
});
//Function Name: GetratingsRequest 
//Description: Access IMDB API to return show/movie ratings for the id entered by user
//@Params: N/A
//@Return: a list of series/movie ratings from various film companies
function GetratingsRequest(id, res){
    axios.get('https://imdb-api.com/en/API/Ratings/'+ api_key + '/' + id).then(
        (response) => {
            var result = response.data;    //captures search result information 
            console.log("Searching for show/movie ratings for the id:" + id + "...\n");
            console.log("Success!");
            var arr = [];
            arr.push(result);
            console.dir(arr); //Output all the data  properties
            res.status(200).send(arr);  //return information if sucessful 
         },
         (error) => {
             //display error message if acessing API requets is unsucessful 
            console.log(error.response);
            res.status(400).send("Error acessing API!");
         }
    );
}



//GET requet
/*Description: Accesses user entered search and passes 
the information to the GetidRequest function */
app.get('/Id/:title', function(req, res){
    var title = req.params.title; //store id entered

    //call to GetmovieRequest function
    GetID(title, res);
});
//Function Name: GetID
//Description: Access IMDB API to return IMDb id for a title entered by user
//@Params: var title (represents title entered by user)
//@Return: a string that represents the id of a given title
function GetID(title, res){
    axios.get('https://imdb-api.com/en/API/SearchTitle/'+ api_key + '/' + title).then(
        (response) => {
            var result = response.data;    //captures search result information 
            console.log("Searching for the id of " + "'" + title + "'" + "...\n");
            console.log("Success!");
            var arr = [];
            var id = result.results[0].id;
            arr.push(id);
            console.dir(arr); //Output all the data  properties
            res.status(200).send(arr);  //return information if sucessful 
         },
         (error) => {
             //display error message if acessing API requets is unsucessful 
            console.log(error.response);
            res.status(400).send("Error acessing API!");
         }
    );
}


/*
//CRUD methods for watchlist
*/

//GET method
/*Description: Accesses user entered search and passes 
the information to the GetMovieInfo function then returns results to addMovie function */
app.get('/movieInfo/:movieName', function(req, res) {
    var movieName = req.params.movieName;
    movieObj = {}; //Initalize empty object to store information 
    movieObj.title = "";
    movieObj.movieId = "";
    movieObj.image = "";
    movieObj.description = "";

    console.log(movieName);
    GetMovieInfo(movieName, movieObj).then(result => { 
        console.log(result);
        addMovie(result);   //Call function to add information to Mongo DB
        res.status(200).send(result);
        console.dir(result);
    })
});
//Function Name: GetMovieInfo
//Description: Access IMDB API to return movie information
//@Params: var movieName (represents title entered by user), var movie (object to store data)
//@Return: an object containg information about a movie;
 async function GetMovieInfo(movieName, movieObj){
  try{
        let response = await axios.get('https://imdb-api.com/en/API/SearchMovie/'+ api_key + '/' + movieName + '/');
        var result = response.data;    //captures search result information 
          
        movieObj.title = result.results[0].title;
        movieObj.movieId = result.results[0].id;
        movieObj.image = result.results[0].image;
        movieObj.description = result.results[0].description;  

        console.dir(movieObj);
        return movieObj;
    } catch(err){
        console.dir(err);
        return err;
    }
};
//Function Name: AddMovie
//Description: Connects to MongoDB and adds movie obj to "Watclist" DB
//@Params: var movie (object to store data)
//@Return: N/A
function addMovie(movieObj){
    //open connection to DB
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err;

    console.log("connected!");

    //get the database object
    var dbo = client.db("watchList");

    //create JSON objectto insert data
    var data = {
      "title": movieObj.title,
      "movie_id": movieObj.movieId,
      "image": movieObj.image,
      "description": movieObj.description
    };

    //insert object data into the student collection 
    dbo.collection("movies").insertOne(data, function(err, result) {
        if (err) throw err;
      
        console.log("inserted document!");
    
        client.close();
  
      });
    }); //end of DB connection
}


//GET method
//Description: Returns all the information for movies inside the  "watchList"  
app.get('/watchList', function(req, res) {
    var data = req.body;
   //open connection
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
        if (err) throw err;

        console.log("Databse connected!");

        //get the database object
        var dbo = client.db("watchList");

        //return all the documents in the collection and convert results into an array
        dbo.collection("movies").find().toArray(function(err, data) {
            if (err) throw err;
            console.dir(data);
            client.close();
            res.status(200).send(data);
          });
   }); //end of DB conenction

}); //End of get method (get all)

//GET method
//Description: Takes a user entered watchlist id and passes it to getaMovie function
app.get('/watchList:/_id', function(req, res) {

    var movie_id = req.params.movie_id;
  
    getaMovie(movie_id, res); //call helper function
}); //End of get method 

//Function Name: getaMovie
//Description: Connects to MongoDB and  returns details where the db id = id entered by user
//@Params: var movieName (user entered title)
//@Return: information for that movie
function getaMovie(movie_id, res){
    //Open connection to db
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err;

    console.log("Databse connected!");

    //get the database object
    var dbo = client.db("watchList");

    //define filter query
    var query = {"movie_id": movie_id };
    
    dbo.collection("movies").find(query).toArray(function(err, data) {
      if (err) throw err;
      console.dir(data);
      client.close();
      res.status(200).send(data);
    });
  }); //end of DB conenction
}

//Description: Takes a user entered DB id and passes it to deleterecord function
app.delete('/watchList/:movie_id', function(req, res) {
  //Delete by ID service 
  var movie_id = req.params.movie_id;

  deleteRecord(movie_id, res);  //Call  to delete record by ID
}); //end delete method

function deleteRecord(movie_id, res){
    //open connection to DB
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
      if (err) throw err;
    
      var dbo = client.db("watchList");
    
      var query = { "movie_id": movie_id};
  
      //use method to remove movie that meets the query parameters
  
      dbo.collection("movies").deleteOne(query, function(err, data) {
        if (err) throw err;
        console.dir("Deleting movie with id: "+ movie_id);
        console.dir("Movie Removed!")
        client.close();
        res.status(200).send("Movie with id " + movie_id + " removed!");
    
      });
    });
} //end of delete method*/
app.listen(5678); 
console.log("Server is running...");