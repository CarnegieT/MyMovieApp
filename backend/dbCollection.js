//dbcollection.js
// Connects to MongoDB and uses the WatchlistDB to create a collection titled "Movies"
const MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://127.0.0.1:27017/";
 
MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
  if (err) throw err;

  //get the database object
  var dbo = client.db("watchList");
  
  //create the collection
  dbo.createCollection("movies", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    client.close(); 
  });
  
});