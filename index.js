// index.js

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express

var Parse = require('node-parse-api').Parse;
var API_ID = "";
var MASTER_KEY = "";

var options = {
    app_id: APP_ID,
    api_key: MASTER_KEY 
}

//var parseAapp = new Parse(options);

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8081/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

