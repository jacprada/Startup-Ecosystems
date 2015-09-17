angular
  .module("final-project")
  .controller("MainController", MainController)

MainController.$inject = ["$resource", '$filter', 'TokenService', 'Startup', 'Community', '$window', '$scope'];

function MainController($resource, $filter, TokenService, Startup, Community, $window, $scope){
  var self = this;

  self.communityMember = {};
  self.communityMembers = Community.query();
  // self.numberOfMembers = "Calculating size..."
  // self.communityMembers = Community.query(function(response){
  //   console.log(response.length)
  //   self.numberOfMembers = response.length;
  // });

self.deleteCommunityMember = function(member){
  console.log("hello")
  Community.delete({id: member._id});
  var index = self.communityMembers.indexOf(member);
  self.communityMembers.splice(index, 1);
}

  self.startup  = {};
  self.startups = Startup.query();

  // self.numberOfStartups = "Calculating size..."
  // self.startups = Startup.query(function(response){
  //   console.log(response.length)
  //   self.numberOfStartups = response.length;
  // });


  // self.finite   = true;
  // self.results  = [];

  // function filterByLocation(obj) {
  //   if (obj.location == self.location) return obj 
  // }
  
  // self.filterLocation = function(){
  //   self.results = self.startups.filter(filterByLocation);
  // }

  self.totalDisplayed = 9;

  self.loadMore = function() {
    self.totalDisplayed += 9;
  };

  // self.random = function(startup) {
  //   return Math.random();
  // };

  // $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
  //   console.log("Infinite")
  //   self.finite = false;
  // });

  // angular.element($window).bind("scroll", function() {
  //   var height = document.getElementById("row").offsetHeight;
  //   if (this.pageYOffset >= 300 && !self.finite) {
  //     console.log("Finite")
  //     self.finite = true;
  //     self.totalDisplayed += 9;
  //     console.log(self.totalDisplayed)
  //   }
  // });

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
