/*global ga:false */
'use strict';

//Isolate code for loading odd/hard to test libraries.
var loader = angular.module('fbPagesUiLoader', []);

//load facebook with configured appId
loader.run([  '$log', 'appApi',
  function ($log,      appApi) {
    if (window.innerWidth >= 480) {
      try {
        var config = appApi.config.get(function () {
          (function(d, s, id, appId) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
              return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = '//connect.facebook.net/en_US/all.js#xfbml=1&appId=' + appId;
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk', config.facebook.appId));
        });
      } catch (e) {
        $log.warn('Facebook loaded, but not properly...');
      }
    }
  }]);

//Load the page data into root scope
loader.run(['$rootScope', 'fbApi',
  function ( $rootScope,   fbApi) {
  $rootScope.page = fbApi.page.get();

  $rootScope.backgroundImage = {};
  $rootScope.hours = {};

  //fetch the background image
  $rootScope.page.$promise.then(function () {

      //tighten up hours - could see different hour directives each site could use 
      var days = [['mon', 'Monday'], ['tue', 'Tuesday'], ['wed', 'Wednesday'], ['thu', 'Thursday'], ['fri', 'Friday'], ['sat', 'Saturday'], ['sun', 'Sunday']],
          open,
          close;

      for (var i = 0; i < days.length; i++) {
        if ($rootScope.page.hours[days[i][0] + '_1_open'] === undefined || $rootScope.page.hours[days[i][0] + '_1_close'] === undefined) {
          continue;
        }
        open = $rootScope.page.hours[days[i][0] + '_1_open'].split(':');
        close = $rootScope.page.hours[days[i][0] + '_1_close'].split(':');
        
        open = open[0] > 12 ? open[0] - 12 + ':' + open[1] + ' pm' : open[0] + ':' + open[1] + ' am';
        close = close[0] > 12 ? close[0] - 12 + ':' + close[1] + ' pm' : close[0] + ':' + close[1] + ' am';
        
        if (!$rootScope.hours[open + ' - ' + close]) {
          $rootScope.hours[open + ' - ' + close] = [];
        }
        $rootScope.hours[open + ' - ' + close].push(days[i][1]);
      }
    // /*jshint camelcase: false */
    // $rootScope.backgroundImages = fbApi.image.get({ imageId: $rootScope.page.cover.cover_id}, function () {
    //   //reset bootstrap's background color...
    //   angular.element('body').css('background-color', 'transparent');
    // });
    });
}]);

//configure google analytics
loader.run(['$location', '$log', '$rootScope', 'appApi',
  function ( $location,   $log,   $rootScope,   appApi) {
  var config = appApi.config.get(function () {
    /* jshint ignore:start */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    /* jshint ignore:end */
    try {
      ga('create', config.google.analytics.siteId, {
        'cookieDomain': 'none'
      });
      ga('send', 'pageview');
      
      //state change event listener captures state changes and sends to Google.
      $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        ga('send', 'pageview', {
          'page': $location.path(),
          'title': toState.name
        });
      });
    } catch (e) {
      $log.error('could not load google analytics... ' + e.message);
    }
  });
}]);

//add the custom FB pages (if any)
loader.run(['$rootScope', '$log', 'appApi',
  function ( $rootScope,   $log,   appApi) {
  $rootScope.config = appApi.config.get();
}]);
