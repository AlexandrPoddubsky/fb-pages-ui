'use strict';

var app = angular.module('fbPagesUiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'fbPagesUiApp.services',
  'config',
  'fbPagesUiApp.directives',
  'ui.bootstrap'
]);

//load facebook with configured appId
app.run(['fbPagesApi', function (fbPagesApi) {
  var config = fbPagesApi.config.get(function () {
    (function(d, s, id, appId) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=" + appId;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk', config.appId));
  });
}]);

//fetch the background image
app.run(['$rootScope', 'fbPagesApi', function ($rootScope, fbPagesApi) {
  $rootScope.page = fbPagesApi.page.get();
  //reset bootstrap's background color...
  angular.element('body').css('background-color', 'transparent');
}]);