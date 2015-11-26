angular
  .module('final-project')
  .factory('Startup', Startup);

Startup.$inject = ['$resource', 'API'];
function Startup($resource, API) {
  var url = '/api'

  return $resource(
    url+'/startups/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'search': { method: 'GET', url: url + '/startups/search/:query/:city', isArray: true}
      // "favourite": { 
      //   url: url+"/users/:id/favourite/"+id
      //   method: "POST"
      // }
    }
  );
}