angular
  .module("final-project")
  .controller("CommunityController", CommunityController)

CommunityController.$inject = ["$resource", '$filter', 'TokenService', 'Community'];

function CommunityController($resource, $filter, TokenService, Community){


  var self = this;

  // Blank new character for form
  this.communityMember = {}

  // Fetch all todos
  this.communityMembers = Community.query();

}
