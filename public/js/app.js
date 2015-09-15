angular
  .module('MyApp', ['satellizer'])
  .config(function($authProvider) {

  $authProvider.twitter({
    url: '/auth/twitter',
    authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
    redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
    type: '1.0',
    popupOptions: { width: 495, height: 645 }
  });

});