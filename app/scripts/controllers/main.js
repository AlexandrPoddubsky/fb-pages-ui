'use strict';

angular.module('fbPagesUiApp')
  .controller('MainCtrl', ['$scope', '$modal', 'fbPagesApi', function ($scope, $modal, fbPagesApi) {
    $scope.posts  = fbPagesApi.posts.get();
    $scope.page   = fbPagesApi.page.get();
    $scope.config = fbPagesApi.config.get();
    
    $scope.openCarousel = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/image-carousel.html',
        controller: 'ImageCarouselCtrl'
      });
    };
  }]);

angular.module('fbPagesUiApp')
  .controller('ImageCarouselCtrl', ['$scope', 'fbPagesApi', function ($scope, fbPagesApi) {
    $scope.images = fbPagesApi.photos.get();
  }]);
