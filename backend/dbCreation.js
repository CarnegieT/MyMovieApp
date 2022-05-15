//dbCreation.js
// Creates a connection to MongoDB server and creates a database named "watchList"

const MongoClient = require('mongodb').MongoClient;

url = "mongodb://127.0.0.1:27017/watchList";  //string location for mongodb

MongoClient.connect(url, { useUnifiedTopology: true}, function(err,client) {
    if(err) throw err;
    console.log("Databse created!");
    client.close();
});