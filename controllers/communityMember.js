var express = require('express');
var router  = express.Router();

var CommunityMember = require('../models/communityMember');


// INDEX 
router.get('/', function(req, res){
  CommunityMember.find()
  .exec(function(error, communityMembers){
    if(error)return res.status(404).json({message: 'Could not find any community members'})
      return res.status(200).send(communityMembers);
  });
});


// SHOW
router.get('/:id', function(req,res){
  var id = req.params.id;
  CommunityMember.findById({_id: id})
  .exec(function(error, communityMember){
    if(error) return res.status(404).send({message: 'Could not find community member'})
      return res.status(200).send(communityMember || {message: 'Sorry, no community member with that ID.'});
  });
});


// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  CommunityMember.remove({_id: id}, function(error) {
    if (error) res.status(404).send({message: 'Sorry, no community member with that ID.'})
      return res.status(200).send({message: 'Community member deleted from database.'});
  });
});

module.exports = router