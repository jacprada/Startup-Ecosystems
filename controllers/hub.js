var express = require('express');
var router  = express.Router();

var Hub = require('../models/hub');


// INDEX 
router.get('/', function(req, res){
  Hub.find()
  .exec(function(error, hubs){
    if(error)return res.status(404).json({message: 'Could not find any hubs'})
      return res.status(200).send(hubs);
  });
});


// SHOW
router.get('/:id', function(req,res){
  var id = req.params.id;
  Hub.findById({_id: id})
  .exec(function(error, hub){
    if(error) return res.status(404).send({message: 'Could not find hub'})
      return res.status(200).send(hub);
  });
});

// POST
router.post('/', function(req, res){
  var hub = new Hub(req.body);
  hub.save(function(error){
    if(error) return res.status(403).send({message: 'Could not create hub b/c' + error});
    return res.status(200).send(hub);
  });
});

// // DELETE
// router.delete('/:id', function(req, res){
//   var id = req.params.id;
//   Hunt.findById(id, function(error, hunt){
//     for (var i = 0; i < hunt.tasks.length; i++) {
//       Task.remove({_id: hunt.tasks[i]}, function(){});
//     }
//     Hunt.remove({_id: id}, function(error){
//       if (error) res.status(404).send({message: 'No hunt with that ID. Could not delete.'})
//         return res.status(204).send({message: 'Deleted!'})
//     });
//   });
// });

module.exports = router