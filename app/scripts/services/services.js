'use strict';

var serviceModule = angular.module('fbPagesUiApp.services', ['ngResource', 'config']);

serviceModule.factory('fbPagesApi', ['$resource', 'ENV', function ($resource, ENV ) {
  return {
    posts:   $resource(ENV.apiEndpoint + '/fb/posts'),
    page:    $resource(ENV.apiEndpoint + '/fb/'),
    photos:  $resource(ENV.apiEndpoint + '/fb/photos/uploaded'),
    albums:  $resource(ENV.apiEndpoint + '/fb/albums'),
    album:   $resource(ENV.apiEndpoint + '/fb/:albumId/photos'),
    config:  $resource(ENV.apiEndpoint + '/config')
  };
}]);