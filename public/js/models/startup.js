angular
  .module('final-project')
  .factory('Startup', Startup);

Startup.$inject = ['$resource', 'API'];
function Startup($resource, API) {
  var url = 'https://startup-ecosystems.herokuapp.com/api'

  return $resource(
    url+'/startups/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
      // "favourite": { 
      //   url: url+"/users/:id/favourite/"+id
      //   method: "POST"
      // }
    }
  );
}