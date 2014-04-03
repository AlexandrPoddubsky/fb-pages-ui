'use strict';

var serviceModule = angular.module('fbPagesUiApp.services', ['ngResource']);

serviceModule.factory('fbPagesApi', ['$resource', 'ENV', function ($resource, ENV ) {
  return {
    posts: $resource(ENV.apiEndpoint + '/fb/posts'),
    page: $resource(ENV.apiEndpoint + '/fb/')
  };
}]);