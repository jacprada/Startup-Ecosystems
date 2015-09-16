angular
  .module("final-project")
  .controller("MainController", MainController)

MainController.$inject = ["$resource", '$filter', 'TokenService', 'Startup', 'Community'];

function MainController($resource, $filter, TokenService, Startup, Community){
  var self = this;

  self.communityMember = {}
  self.communityMembers = Community.query();

  self.startup = {}
  self.startups = Startup.query();

  self.totalDisplayed = 9;

  self.loadMore = function () {
    self.totalDisplayed += 9;  
  };

  self.random = function(startup) {
    return Math.random();
  };

  // self.random = function() {
  //   return 15 - Math.random();
  // }

  // self.newStartupSearch = []

  // self.getRandomStartups = function() {

  //   var startupsByLocation = [] 
  //   var startupData = []


  //   for (var i = 0 ; i < self.startups.length ; i++) {
  //     if(self.startups[i].location==self.startup.location){
  //       startupsByLocation.push(self.startups[i])
  //     }
  //   };

  //   console.log(startupsByLocation)



  //   for (var i = 0; i < 30; i++) {
  //     startupData.push(startupsByLocation[Math.floor(Math.random() * startupsByLocation.length)])
  //   };

  //   console.log(startupData)

  //   self.newStartupSearch.push(startupData)
  //   self.startup = {}

  //   console.log(self.newStartupSearch)
  // }

  // Post.query(function(data) {
  //    $scope.posts = data;
  //  });


  // this.filterFunction = function(element) {
  //   return element.name.match(/^Ma/) ? true : false;
  // };


}
