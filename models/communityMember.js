var mongoose = require('mongoose');

var CommunityMemberSchema = new mongoose.Schema({
  id: Number,
  location: String,
  name: String,
  bio: String,
  url: String,
  twitter: String,
  image: String
});

var CommunityMember = mongoose.model("CommunityMember", CommunityMemberSchema);
module.exports = CommunityMember;