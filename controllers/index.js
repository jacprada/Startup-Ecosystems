var express = require('express');
var router  = express.Router();

router.use('/hubs', require('./hub'));
router.use('/startups', require('./startup'));
router.use('/auth', require('./authenticationController'));
router.use('/users', require('./usersController'));

module.exports = router;