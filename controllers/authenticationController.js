var User     = require('../models/user');
var jwt      = require('jsonwebtoken');
var passport = require('passport');
var secret   = require('../config/config').secret;
var express  = require('express');
var router   = express.Router();

router.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(401).send({ error: 'User already exists!' });

    var token = jwt.sign(user, secret, { expiresInMinutes: 1440 });

    return res.status(200).send({ 
      success: true,
      message: "The Hunt is on.",
      token: token
    });
  })(req, res, next);
});

router.post('/signin', function(req, res, next) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) return res.status(500).send(err);

    if (!user) return res.status(403).send({ message: 'You seem to be mistaken, we have no user with that identity.' });

    if (!user.validPassword(req.body.password)) return res.status(403).send({ message: 'Authentication failed. Wrong password.' });

    var token = jwt.sign(user, secret, { expiresInMinutes: 1440 });

    return res.status(200).send({
      success: true,
      message: 'Youre in the hunt now dude.',
      token: token
    });
  });
});

module.exports = router