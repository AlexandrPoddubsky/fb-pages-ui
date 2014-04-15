'use strict';

var directiveModule = angular.module('fbPagesUiApp.directives', []);

directiveModule.directive('backImg', function () {
  return function(scope, element, attrs){
    attrs.$observe('backImg', function (value) {
      element.css({
        'background': 'url(' + value + ') no-repeat center center fixed', 
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
        'background-size': 'cover'
      });
    });
  };
});

directiveModule.directive('fbHours', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/templates/fbHours.html'
  };
});

directiveModule.directive('fbPostComments', function () {
  return {
    restrict: 'E',
    scope: {
      post: '='
    },
    templateUrl: 'views/templates/fbComments.html'
  };
});

directiveModule.directive('fbPostImage', function () {
  return {
    restrict: 'E',
    scope: {
      post: '='
    },
    templateUrl: 'views/templates/fbPostImage.html'
  };
});

directiveModule.directive('fbPostHeader', function () {
  return {
    restrict: 'E',
    scope: {
      post: '='
    },
    templateUrl: 'views/templates/fbPostHeader.html'
  };
});