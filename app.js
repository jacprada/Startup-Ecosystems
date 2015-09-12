var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var morgan      = require("morgan");
var mongoose    = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/startup-ecosystems'
mongoose.connect(databaseURL);

app.use(morgan('dev'));

app.use(require('./controllers'));

app.listen(process.env.PORT || 3000);