angular
  .module("final-project")
  .controller("MainController", MainController)

MainController.$inject = ["$resource", '$filter', 'TokenService', 'Startup', 'Community'];

function MainController($resource, $filter, TokenService, Startup, Community){
  var self = this;

  this.communityMember = {}
  this.communityMembers = Community.query();

  this.startup = {}
  this.startups = Startup.query();

  this.startupsLocation = Startup

  this.startupSelected = 'Pick a City';

  this.getRandomStartups = function() {
    Startup.query(function(data) {
      return data[Math.floor(Math.random() * data.length)];
    })
  }

  // Post.query(function(data) {
  //    $scope.posts = data;
  //  });







  // this.filterFunction = function(element) {
  //   return element.name.match(/^Ma/) ? true : false;
  // };


}
