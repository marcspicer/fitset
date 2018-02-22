// require our dependencies
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
var app            = express();
var port           = process.env.PORT || 8080;
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/fitset';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// use ejs and express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// route our app
var router = require('./app/routes');
// API routes
var api = require('./app/api');

app.use('/', router);
app.use('/api', api);


// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));


// start the server
app.listen(port, function() {
  console.log('app started: visit http://127.0.0.1:' + port);
});