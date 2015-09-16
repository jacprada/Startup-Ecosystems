angular
  .module("final-project")
  .controller("StartupsController", StartupsController)

StartupsController.$inject = ["$resource", '$filter', 'TokenService', 'Startup'];

function StartupsController($resource, $filter, TokenService, Startup){
  // var orderBy    = $filter('orderBy');
  // self.predicate = '-location';
  // var self       = this;
  // self.reverse   = true;

  // self.order = function(predicate) {
  //   self.reverse = (self.predicate === predicate) ? !self.reverse : false;
  //   self.predicate = predicate;
  // }



  // self.all = [];















  var self = this;

  // Blank new character for form
  this.startup = {}

  // Fetch all todos
  this.startups = Startup.query();

}


  // var self = this;

  // // Blank new character for form
  // // this.character = {}

  // // Fetch all todos
  // this.all = Startup.query();

  // Fetch the clicked todo
  // this.selectCharacter = function(character) {
  //   self.selectedCharacter = Character.get({id: character._id});
  // };

  // var orderBy = $filter('orderBy');
  // var self = this;
  // self.all = [];

  // // function getStartups() {
  // //   $http
  // //   .get('http://localhost:3000/criminals')
  // //   .then(function(response){
  // //     self.all = response.data.criminals;
  // //   })
  // // }

  // self.getStartups = function() {
  //   if (TokenService.isLoggedIn()) {
  //     Startups.all(function(result) {
  //       self.allMovies = result;
  //     });
  //   }

  
  // self.text = ""
  // self.movie_id  = [];
  // self.allStartups = [];

  // self.predicate = '-title';
  // self.reverse   = true;
  // self.letterLimit = 200;
  

  // self.order = function(predicate) {
  //   self.reverse = (self.predicate === predicate) ? !self.reverse : false;
  //   self.predicate = predicate;
  // }

  // self.onFilter = function(input) {
  //   if(input){
  //     Movie.search({ query: input }, function(result){
  //       self.allMovies = result
  //     });
  //   } else {
  //     self.allMovies = [];
  //     input = "";
  //   }  
  // }

  // self.getMovies();
  // self.limitChar();
  // console.log(result)
  // for (i=0; i < result.length; i++){
  //   var test = result[i].genre_id
  //   console.log(test)
  // }
// }