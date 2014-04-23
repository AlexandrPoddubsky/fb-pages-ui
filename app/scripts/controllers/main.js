'use strict';

angular.module('fbPagesUiApp.controllers', [])
  .controller('MainCtrl', ['$scope', 'fbApi', function ($scope, fbApi) {
    $scope.posts  = fbApi.posts.get();
    $scope.page   = fbApi.page.get();

    $scope.orderedPosts = {
        'high': [],
        'low': []
      };
    //sort the posts into priority order... The intent here is to load posts about the business before
    //posts that the business promotes by sharing links, images etc. This can lead to some awareness of the 
    //lack of actual posts by/about the business...
    $scope.posts.$promise.then(function() {
      //reset
      $scope.orderedPosts = {
        'high': [],
        'low': []
      };

      angular.forEach($scope.posts.data, function(post, key) {
        if (post.type === 'status' || post.status_type === 'added_photos' || post.status_type === 'mobile_status_update') {
          this.high.push(post);
        } else {
          this.low.push(post);
        }
      }, $scope.orderedPosts);
    });

    $scope.hasComments = function (post) {
      return (post.comments && post.comments.data.length > 0) || (post.caption && post.caption.length > 0);
    }

  }]);
