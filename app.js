var express     = require("express");
var app         = express();
var fs          = require('fs');
var bodyParser  = require("body-parser");
var morgan      = require("morgan");
var request     = require('request-promise');
var cheerio     = require('cheerio');
var mongoose    = require('mongoose');
var passport    = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/startup-ecosystems'
mongoose.connect(databaseURL);

require('./config/passport')(passport);

app.use(morgan('dev'));

app.use(require('./controllers'));

app.listen(process.env.PORT || 3000);