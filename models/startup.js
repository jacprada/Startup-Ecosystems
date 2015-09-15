var mongoose = require('mongoose');

var StartupSchema = new mongoose.Schema({
  id: Number,
  location: String,
  name: String,
  bio: String,
  href: String,
  twitter: String,
  image: String
});

var Startup = mongoose.model("Startup", StartupSchema);
module.exports = Startup;