angular
  .module('final-project')
  .factory('Startup', Startup);

Startup.$inject = ['$resource', 'API'];
function Startup($resource, API) {
  var url = 'http://localhost:3000/api'

  return $resource(
    url+'/startups/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}