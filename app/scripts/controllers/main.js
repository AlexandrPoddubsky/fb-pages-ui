'use strict';

angular.module('fbPagesUiApp.controllers', [])
  .controller('MainCtrl', ['$scope', 'fbApi', function ($scope, fbApi) {
    $scope.posts  = fbApi.posts.get();
    $scope.page   = fbApi.page.get();
    $scope.hours  = {};

    $scope.orderedPosts = {
        'high': [],
        'low': []
      };
    //sort the posts into priority order... The intent here is to load posts about the business before
    //posts that the business promotes by sharing links, images etc. This can lead to some awareness of the 
    //lack of actual posts by/about the business...
    $scope.posts.$promise.then(function () {
      //reset
      $scope.orderedPosts = {
        'high': [],
        'low': []
      };

      angular.forEach($scope.posts.data, function(post) {
        if (!post.message && !post.name && !post.description) {
          return;
        }
        /*jshint camelcase: false */
        if (post.type === 'status' || post.status_type === 'added_photos' || post.status_type === 'mobile_status_update') {
          this.high.push(post);
        } else {
          this.low.push(post);
        }
      }, $scope.orderedPosts);

      //tighten up hours - could see different hour directives each site could use 
      $scope.page.$promise.then( function () {
        var days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
            open,
            close;

        for (var i = 0; i < days.length; i++) {
          if ($scope.page.hours[days[i] + '_1_open'] === undefined || $scope.page.hours[days[i] + '_1_close'] === undefined) {
            continue;
          }
          open = $scope.page.hours[days[i] + '_1_open'].split(':');
          close = $scope.page.hours[days[i] + '_1_close'].split(':');
          
          open = open[0] > 12 ? open[0] - 12 + ':' + open[1] + ' pm' : open[0] + ':' + open[1] + ' am';
          close = close[0] > 12 ? close[0] - 12 + ':' + close[1] + ' pm' : close[0] + ':' + close[1] + ' am';
          
          if (!$scope.hours[open + ' - ' + close]) {
            $scope.hours[open + ' - ' + close] = [];
          }
          $scope.hours[open + ' - ' + close].push(days[i]);
        }
      });
    });

    $scope.hasComments = function (post) {
      return (post.comments && post.comments.data.length > 0) || (post.caption && post.caption.length > 0);
    };

    $scope.hasImage = function (post) {
      return ((post.link && post.picture) || post.name || post.description);
    };

  }]);
