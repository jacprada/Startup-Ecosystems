var express = require('express');
var router  = express.Router();

var Startup = require('../models/startup');


// INDEX 
router.get('/', function(req, res){
  Startup.find()
  .exec(function(error, startups){
    if(error)return res.status(404).json({message: 'Could not find any startups'})
      return res.status(200).send(startups);
  });
});


// SHOW
router.get('/:id', function(req,res){
  var id = req.params.id;
  Startup.findById({_id: id})
  .exec(function(error, startup){
    if(error) return res.status(404).send({message: 'Could not find startup'})
      return res.status(200).send(startup || {message: 'Sorry, no startup with that ID.'});
  });
});


// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Startup.remove({_id: id}, function(error) {
    if (error) res.status(404).send({message: 'Sorry, no startup with that ID.'})
      return res.status(200).send({message: 'Startup deleted from database.'});
  });
});

module.exports = router