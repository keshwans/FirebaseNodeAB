// index.js

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express

var Parse = require('node-parse-api').Parse;
var APP_ID = "";
var MASTER_KEY = "";

var options = {
    app_id: APP_ID,
    api_key: MASTER_KEY 
}
//var parseAapp = new Parse(options);

var Firebase = require("firebase");
var FirebaseClient = require('firebase-client');

var FIREBASE_DB =  "https://sktestmozi.firebaseio.com/";
var firebaseDBRef = new Firebase(FIREBASE_DB);
var firebaseAuthToken = "";
var firebaseClient;

firebaseDBRef.authWithPassword({
  email    : "ab@gmail.com",
  password : "sktestmozi"
}, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData.token);
    firebaseClient = new FirebaseClient({
  		url: FIREBASE_DB,
  		auth: authData.token
    	});
  }
});

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8081/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

router.get('/users/', function(req, res){
	firebaseClient
	   .get('users')
	   .then (function(body){
		console.log(body);
		res.send(body);
	   })
	  .fail (function(err) {
		console.log(err);
	  });
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

