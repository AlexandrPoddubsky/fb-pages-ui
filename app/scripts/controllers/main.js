'use strict';

angular.module('fbPagesUiApp')
  .controller('MainCtrl', ['$scope', 'fbPagesApi', function ($scope, fbPagesApi) {
    $scope.posts = fbPagesApi.posts.get();
    $scope.page  = fbPagesApi.page.get();
  }]);
