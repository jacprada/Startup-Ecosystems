angular
  .module('final-project')
  .factory('Community', Community);

Community.$inject = ['$resource', 'API'];
function Community($resource, API) {
  var url = 'http://localhost:3000/api'

  return $resource(
    url+'/community/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}