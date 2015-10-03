var express           = require('express');
var app               = express();
var cors              = require('cors');
var fs                = require('fs');
var bodyParser        = require('body-parser');
var morgan            = require('morgan');
var request           = require('request-promise');
var expressJWT        = require('express-jwt');
var cheerio           = require('cheerio');
var mongoose          = require('mongoose');
var passport          = require('passport');
var TwitterStrategy   = require('passport-twitter').Strategy;
var config            = require('./config/config');

// Setting view folder for single index.html file
app.set("views", "./public");

// Serve all js, css, html from the public folder
app.use(express.static(__dirname + '/public'));

app
  .use('/api', expressJWT({ secret: config.secret })
  .unless({path: ['/api/auth/signup', '/api/auth/signin']}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/startup-ecosystems'
mongoose.connect(databaseURL);

app.use(cors());
app.use(morgan('dev'));

require('./config/passport')(passport);
app.use(passport.initialize());

app.use(require('./controllers'));

app.listen(process.env.PORT || 3000);