'use strict';

//Isolate code for loading odd/hard to test libraries.
var loader = angular.module('fbPagesUiLoader', []);

//load facebook with configured appId
loader.run([  '$log', 'appApi',
  function ($log,      appApi) {
    try {
      var config = appApi.config.get(function (a, b, c, d) {
        (function(d, s, id, appId) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s); js.id = id;
          js.src = '//connect.facebook.net/en_US/all.js#xfbml=1&appId=' + appId;
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk', config.facebook.appId));
      });
    } catch (e) {
      $log.warn('Facebook loaded, but not properly...');
    }
  }]);

//Load the page data into root scope
loader.run(['$rootScope', 'fbApi', '$window', '$log',
  function ( $rootScope,   fbApi,   $window,   $log) {
  $rootScope.page = fbApi.page.get();

  $rootScope.backgroundImage = {};

  //fetch the background image
  $rootScope.page.$promise.then(function () {
    $rootScope.backgroundImages = fbApi.image.get({ imageId: $rootScope.page.cover.cover_id}, function () {
      //reset bootstrap's background color...
      angular.element('body').css('background-color', 'transparent');
    });
  });
}]);

//configure google analytics
loader.run([  '$log', 'appApi', 
  function ($log,      appApi) {
  var config = appApi.config.get(function () {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    try {
      ga('create', config.google.analytics);
      ga('send', 'pageview');
    } catch (e) {
      $log.error('could not load google analytics... ' + e.message);
    }
  });
}]);

//add the custom FB pages (if any)
//configure google analytics
loader.run(['$rootScope', '$log', 'appApi', 
  function ( $rootScope,   $log,   appApi) {
  $rootScope.config = appApi.config.get();
}]);

