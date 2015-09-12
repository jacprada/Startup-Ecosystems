var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var morgan      = require("morgan");
var mongoose    = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/startup-ecosystems'
mongoose.connect(databaseURL);

app.use(morgan('dev'));


var Hub = require('./models/hub');


// INDEX 
app.get('/hubs', function(req, res){
  Hub.find()
  .exec(function(error, hubs){
    if(error)return res.status(404).json({message: 'Could not find any hubs'})
      return res.status(200).send(hubs);
  });
});

// SHOW
app.get('/hubs/:id', function(req,res){
  var id = req.params.id;
  Hub.findById({_id: id})
  .exec(function(error, hub){
    if(error) return res.status(404).send({message: 'Could not find hub'})
      return res.status(200).send(hub);
  });
});

// POST
app.post('/hubs', function(req, res){
  var hub = new Hub(req.body);
  hub.save(function(error){
    if(error) return res.status(403).send({message: 'Could not create hub b/c' + error});
    return res.status(200).send(hub);
  });
});

app.listen(process.env.PORT || 3000);