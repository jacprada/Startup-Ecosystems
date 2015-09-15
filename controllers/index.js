var express = require('express');
var router  = express.Router();

router.use('/api/startups', require('./startup'));
router.use('/api/community', require('./communityMember'));
router.use('/api/auth', require('./authenticationController'));
router.use('/api/users', require('./usersController'));

module.exports = router;