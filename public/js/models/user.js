angular
  .module('final-project')
  .factory('User', User);

User.$inject = ['$resource', 'API'];
function User($resource, API) {
  var url = '/api'

  return $resource(
    url+'/users/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'authorize': { 
        url: url + '/auth/signin',
        method: 'POST' 
      }, 
      'join': {
        url: url + '/auth/signup',
        method: 'POST'
      }
    }
  );
}