'use strict';

var directiveModule = angular.module('fbPagesUiApp.directives', []);

directiveModule.directive('backImg', function(){
  return function(scope, element, attrs){
    attrs.$observe('backImg', function(value) {
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