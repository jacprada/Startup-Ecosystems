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

app
  .use('/api', expressJWT({ secret: config.secret })
  .unless({path: ['/api/auth/signup', '/api/auth/signin', '/api/auth/twitter', '/api/auth/twitter/callback']}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/startup-ecosystems'
mongoose.connect(databaseURL);

app.use(cors());
app.use(morgan('dev'));

require('./config/passport')(passport, TwitterStrategy);
app.use(passport.initialize());

// app.get("/api/auth/twitter", passport.authenticate("twitter", {token : { secure: false }}));

// app.get("api//auth/twitter/callback", passport.authenticate("twitter", {
//   successRedirect: "/localhost:8000/",
//   failureRedirect: "/localhost:8000/signin"
// }));


// app.get('/api/auth/twitter', passport.authenticate('twitter'));

// app.get('/api/auth/twitter/callback', passport.authenticate('twitter',{
//   successRedirect: 'http://localhost:8000/',
//   failureRedirect: 'http://localhost:8000/signin'
//   })
// )

app.use(require('./controllers'));

app.listen(process.env.PORT || 3000);