'use strict';

var directiveModule = angular.module('fbPagesUiApp.directives', []);

directiveModule.directive('fbBackImg', ['$window', function ($window) {
  var bgImages, element;

  function setBackgroundImage (elem, imageUrl, width, height) {
    elem.css({
      'background': 'url(' + imageUrl + ') no-repeat center center fixed', 
      'background-size': '' + width + 'px ' + height + 'px',
      '-webkit-background-size': 'cover',
      '-moz-background-size': 'cover',
      '-o-background-size': 'cover'
    });
  }

  function findBackground (w, h, backgroundImages) {
    console.log('in find background');
    var matchingImage = {}; 
    //find the image that is just bigger than the current screen width
    angular.forEach(backgroundImages.images, function (image, key) {
      if (image.height > h && image.width > w) { //the image is big enough
        //if we have no matches, or the current match is bigger than necessary, replace
        if (!this.source || (this.height > image.height && this.width > image.width)) {
          this.height = image.height;
          this.width = image.width;
          this.source = image.source;
        } 
      }
    }, matchingImage);
    console.log('returning : ' + JSON.stringify(matchingImage));

    return matchingImage;
  };
  return {
    link: function (scope, elem, attrs) {
      attrs.$observe('fbBackImg', function (backgroundImages) {
        bgImages = scope.$eval(backgroundImages);
        element = elem;

        if (bgImages && bgImages.images && bgImages.images.length > 0) {
          //array of images loaded... safe to assign
          var image = findBackground($window.innerWidth, $window.innerHeight, bgImages);
          setBackgroundImage(element, image.source, image.width, image.height);
        }
      });

      var win = angular.element($window);
        win.bind("resize", function (e) {
          var image = findBackground($window.innerWidth, $window.innerHeight, bgImages);
          setBackgroundImage(element, image.source, image.width, image.height);
      });
    }
  };
}]);

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