// angular
//   .module('MyApp', ['satellizer'])
//   .config(function($authProvider) {

//   $authProvider.twitter({
//     url: '/auth/twitter',
//     authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
//     redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
//     type: '1.0',
//     popupOptions: { width: 495, height: 645 }
//   });

// });

angular
  .module('final-project', ['angular-jwt', 'ngResource', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider']
  function MainRouter($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('signup', {
        url: "/signup",
        templateUrl: "js/templates/signup.html"
      })
      .state('login', {
        url: "/login",
        templateUrl: "js/templates/login.html"
      })
      .state('homepage', {
        url: "/",
        templateUrl: "js/templates/homepage.html"
      })
      .state('startups', {
        url: "/startups",
        templateUrl: "js/templates/startups.html"
      })
      .state('community', {
        url: "/community",
        templateUrl: "js/templates/community.html"
      })
      $urlRouterProvider.otherwise('/');    
    }
