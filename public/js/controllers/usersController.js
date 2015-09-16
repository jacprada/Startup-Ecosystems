// angular.module('MyApp')
//   .controller('LoginCtrl', function($scope, $auth) {

//     $scope.authenticate = function(provider) {
//       $auth.authenticate(provider);
//     };

//   });

angular
  .module('final-project')
  .controller('usersController', UserController)

UserController.$inject = ['User','TokenService', '$state']
function UserController(User, TokenService, $state) {
  var self = this;

  self.all    = [];
  self.user  = {};

  // Function to display the message back to the User
  function showMessage(res) {
    var token = res.token ? res.token : null;
    
    // Console.log our response from the API
    if(token) { console.log(res); }
    self.message =  res.message ? res.message : null;
  }

  self.authorize = function() {
    User.authorize(self.user, function(res){
      $state.go("loggedin");
      showMessage(res)
    });
  }

  self.join = function() {
    User.join(self.user, function(res){
      $state.go("loggedin");
      showMessage(res)
    });
  }

  self.disappear = function() {
    TokenService.removeToken && TokenService.removeToken();
    $state.go("homepage");
  }

  self.isLoggedIn = function() {
    return TokenService.isLoggedIn ? TokenService.isLoggedIn() : false;
  }

  // self.getAgents = function() {
  //   self.all = Agent.query();
  // }

  // Load users only if you are logged in!
  // if (self.isLoggedIn()) {
  //   self.getAgents();
  //   self.agent = TokenService.parseJwt();
  // }

  return self;
}