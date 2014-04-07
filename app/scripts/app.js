'use strict';

var app = angular.module('fbPagesUiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'fbPagesUiApp.services',
  'config',
  'fbPagesUiApp.directives',
  'ui.bootstrap',
  'ui.router'
]);

app.run([        '$rootScope', '$state', '$stateParams', 
        function ($rootScope,   $state,   $stateParams) {

  // It's very handy to add references to $state and $stateParams to the $rootScope
  // so that you can access them from any scope within your applications.For example,
  // <li ui-sref-active="active }"> will set the <li> // to active whenever
  // 'contacts.list' or one of its decendents is active.
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

//load facebook with configured appId
app.run([        'fbPagesApi', 
        function (fbPagesApi) {
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
app.run([  '$rootScope', 'fbPagesApi', 
  function ($rootScope,   fbPagesApi) {
  $rootScope.page = fbPagesApi.page.get();
  //reset bootstrap's background color...
  angular.element('body').css('background-color', 'transparent');
}]);

app.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
        // .when('/c?id', '/contacts/:id')
        // .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("home", {

          // Use a url of "/" to set a states as the "index".
          url: "/",

          // Example of an inline template string. By default, templates
          // will populate the ui-view within the parent state's template.
          // For top level states, like this one, the parent template is
          // the index.html file. So this template will be inserted into the
          // ui-view within index.html.
          templateUrl: '/views/main.html',
          controller: 'MainCtrl'

        })

        ///////////
        // Photos //
        ///////////
        .state('albums', {
          url: '/albums',
          templateUrl: 'views/albums.html', 
          controller: ['$scope', '$stateParams', '$state',
                  function (  $scope,   $stateParams,   $state) {
                    $scope.albums = { 'name': 'bla bla!'};
                    // $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);

                    // $scope.edit = function () {
                    //   // Here we show off go's ability to navigate to a relative state. Using '^' to go upwards
                    //   // and '.' to go down, you can navigate to any relative state (ancestor or descendant).
                    //   // Here we are going down to the child state 'edit' (full name of 'contacts.detail.item.edit')
                    //   $state.go('.edit', $stateParams);
                    // };
                  }]
        })

        ///////////
        // About //
        ///////////

        .state('about', {
          url: '/about',

          // Showing off how you could return a promise from templateProvider
          templateProvider: ['$timeout',
            function (        $timeout) {
              return $timeout(function () {
                return '<p class="lead">UI-Router Resources</p><ul>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                       '</ul>';
              }, 100);
            }]
        })
    }
  ]
);