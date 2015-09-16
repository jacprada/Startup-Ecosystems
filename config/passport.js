var LocalStrategy   = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var User            = require("../models/user");
var jwt             = require('jsonwebtoken');
var secret          = require('./config').secret;

module.exports = function(passport) {
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({ 'email' : email }, function(err, user) {
        
        if (err) return done(err);
        if (user) return done(null, false);

        var newUser       = new User();
        newUser.email     = email;
        newUser.full_name = req.body.full_name;
        newUser.password  = newUser.encrypt(password);
        newUser.save(function(err) {
          if (err) return done(err);
          return done(null, newUser);
        });
      });
    });
  }));

  passport.serializeUser(function(user, done) {
     done(null, user._id);
   });

   passport.deserializeUser(function(id, done) {
     User.findById(id, function(err, user) {
       console.log('deserializing user:',user);
       done(err, user);
     });
   });

//    passport.use('twitter', new TwitterStrategy({
//        consumerKey: 'tiFFEAmcEGGPxpUcIrYWEx1aQ',
//        consumerSecret: 'KQ3jIoEaqAbSR9b7nRqZY0sGIDRaRJQUcR1mN9ICTXvklpIZRF',
//        callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
//      },
//      function(token, tokenSecret, profile, done) {

//              // make the code asynchronous
//          // User.findOne won't fire until we have all our data back from Twitter
//          process.nextTick(function() {

//            User.findOne({ 'email' : profile.id }, function(err, user) {

//                      // if there is an error, stop everything and return that
//                      // ie an error connecting to the database
//                      if (err)
//                        return done(err);

//                      // if the user is found then log them in
//                      if (user) {
//                          return done(null, user); // user found, return that user
//                        } else {
//                          // if there is no user, create them
//                          var newUser                 = new User();

//                          // set all of the user data that we need
//                          // newUser.id          = profile.id;
//                          newUser.full_name   = profile.displayName;
//                          newUser.token       = token;
//                          newUser.email       = profile.email;
//                          newUser.password    = jwt.sign(token,secret);

//                          // save our user into the database
//                          newUser.save(function(err) {
//                            if (err)
//                              throw err;
//                            return done(null, newUser);
//                          });
//                        }
//                      });

// });

// }));

passport.use("twitter", new TwitterStrategy({
    consumerKey: 'tiFFEAmcEGGPxpUcIrYWEx1aQ',
    consumerSecret: 'KQ3jIoEaqAbSR9b7nRqZY0sGIDRaRJQUcR1mN9ICTXvklpIZRF',
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    // Set this callbackURL in apps.twitter settings as well to make it work
  },
  function(token, tokenSecret, profile, callback) {
    console.log(profile);
      User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
        if (err) return callback(err);
        if (user) {
          return callback(null, user);
        } else {
          var newUser = new User();
          
          newUser.twitter.id           = profile.id;
          newUser.twitter.token        = token;

          newUser.save(function(err) {
            if (err) throw err;
            return callback(null, newUser);
          });
        };
      });
  }
));













}

//    passport.use('facebook', new FacebookStrategy({
//      clientID        : process.env.FACEBOOK_KEY_API,
//      clientSecret    : process.env.FACEBOOK_SECRET_API,
//      callbackURL     : 'http://localhost:3000/api/auth/facebook/callback',
//      enableProof     : true,
//      profileFields   : ['name', 'emails']
//    }, function(access_token, refresh_token, profile, done) {    
//      // console.log(profile)

//      process.nextTick(function() {

//        User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
//          if (err) return done(err);
//          if (user) {
//            // Update user
//            return done(null, user);
//          } else {
           
//            var newUser = new User();
//            newUser.full_name      = profile.name.givenName + " " + profile.name.familyName;
//            newUser.access_token   = access_token;
//            newUser.email          = profile.id;
//            newUser.password       = jwt.sign(access_token, secret);

//            newUser.save(function(err) {
//              if (err) throw err;
//              return done(null, newUser);
//            });
//          };
//        });
//      });
//    }));
// }