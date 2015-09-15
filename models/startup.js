var mongoose = require('mongoose');

var StartupSchema = new mongoose.Schema({
  id: Number,
  externalId: Number,
  location: String,
  name: String,
  bio: String,
  url: String,
  twitter: String,
  image: String
});

module.exports = mongoose.model("Startup", StartupSchema);