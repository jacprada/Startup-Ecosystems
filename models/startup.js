var mongoose = require('mongoose');
var textSearch = require("mongoose-text-search");

var StartupSchema = new mongoose.Schema({
  id: Number,
  externalId: Number,
  location: String,
  name: String,
  bio: String,
  url: String,
  twitter: String,
  image: String,
  emails:[{ type: String, 
  				  validate: [validateEmail, 'Please fill a valid email address'],
  				  unique: true
  				}]
});


function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
var Startup = mongoose.model("Startup", StartupSchema);
module.exports = Startup;