angular
  .module('final-project')
  .service('TokenService', TokenService)

TokenService.$inject = ['$window' , 'jwtHelper']
function TokenService($window, jwtHelper) {

  var self = this;

  self.parseJwt = function() {
    var token = self.getToken();
    return jwtHelper.decodeToken(token);
  }

  self.saveToken = function(token) {
    $window.localStorage['secret'] = token;
  }

  self.getToken = function() {
    return $window.localStorage['secret'];
  }

  self.removeToken = function() {
    $window.localStorage.removeItem('secret');
  }

  self.isLoggedIn = function() {
    var token = self.getToken();

    if (token) {
      return true;
    } else {
      return false;
    }
  }

}