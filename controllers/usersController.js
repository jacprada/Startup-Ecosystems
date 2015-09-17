var express = require('express');
var router  = express.Router();
var User    = require('../models/user');

router.get('/', function(req, res){
  User.find(function(error, users){
    if (error) return res.status(404).json({message: 'There are no users in the database.'});
    return res.status(200).send(users);
  });
});

router.post('/', function(req, res){
  var user = new User(req.body);
  user.save(function(error){
    if (error) return res.status(403).send({message: "User failed to create."})
      return res.status(200).send(user);
  });
});

router.get('/:id', function(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user){
    if (error) return res.status(404).send({message: 'The user does not exist.'})
      return res.status(200).send(user);
  });
});

// router.post('/:id/favorites/:startup_id', function(req, res){
//   User.findByIdAndUpdate(req.params.id, {
//     $addToSet: {"favouriteStartups": req.body.startup_id},
//           });
// });

router.post('/:id', function(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user) {
    if (error) return res.status(404).send({message: 'The user does not exist.'})

      if (req.body.full_name) user.full_name = req.body.full_name;
    if (req.body.email) user.email         = req.body.email;

    user.save(function(error) {
      if (error) return res.status(500).send({message: "There seems to be some error in updating your user."})
        return res.status(200).send(user);
    });
  });
});

router.delete('/:id', function(req, res){
  var id = req.params.id;
  User.remove({_id: id}, function(error) {
    if (error) res.status(404).send({message: 'You seem to be mistaken, we have no user with that identity.'})
      res.status(204);
  });
  return;
});

module.exports = router