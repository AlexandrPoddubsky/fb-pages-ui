'use strict';

var app = angular.module('fbPagesUiApp', [
  'fbPagesUiLoader',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'fbPagesUiApp.services',
  'config',
  'fbPagesUiApp.directives',
  'fbPagesUiApp.controllers',
  'ui.bootstrap',
  'ui.router'
]);

app.run([  '$rootScope', '$state', '$stateParams', '$window',
  function ($rootScope,   $state,   $stateParams,   $window) {

  // It's very handy to add references to $state and $stateParams to the $rootScope
  // so that you can access them from any scope within your applications.For example,
  // <li ui-sref-active="active }"> will set the <li> // to active whenever
  // 'contacts.list' or one of its decendents is active.
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  //make window available on root scope
  $rootScope.window = $window;
}]);

app.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      var albums = {}; //local cache
      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

      //   // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
      //   // Here we are just setting up some convenience urls.
      //   // .when('/c?id', '/contacts/:id')
      //   // .when('/user/:id', '/contacts/:id')

      //   // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state('home', {

          // Use a url of "/" to set a states as the "index".
          url: '/',

          // Example of an inline template string. By default, templates
          // will populate the ui-view within the parent state's template.
          // For top level states, like this one, the parent template is
          // the index.html file. So this template will be inserted into the
          // ui-view within index.html.
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'

        })

        ///////////
        // FB Deep Link //
        ///////////
        .state('post', {
          url: '/post/:pageId',
          templateUrl: 'views/post.html',
          controller: ['$scope', '$stateParams', '$state', 'fbApi', 'appApi',
            function (  $scope,   $stateParams,   $state,   fbApi,   appApi) {
              $scope.post = fbApi.post.get({ 'postId': $stateParams.pageId });
              $scope.preferences = {};

              //get the configuration object for this post (if any)
              var config = appApi.config.get({}, function () {
                angular.forEach(config.facebook.pages, function (value) {
                  if (value.postId === $stateParams.pageId) {
                    this.post = value.displayPreferences.post;
                  }
                }, $scope.preferences);
              });
            }
          ]
        })

        ///////////
        // Photos //
        ///////////
        .state('albums', {
          url: '/albums',
          templateUrl: 'views/albums.html',
          controller: ['$scope', '$stateParams', '$state', 'fbApi',
            function (  $scope,   $stateParams,   $state,   fbApi) {
              
              $scope.albums = fbApi.albums.get({}, function (albums) {
                var mostRecientlyUpdatedAlbum = { albumId: null, updated: null };

                //find the most reciently updated album and show it.
                angular.forEach(albums.data, function (album) {
                  /*jshint camelcase: false */
                  var updated = new Date(album.updated_time);
                  if (mostRecientlyUpdatedAlbum.updated === null || mostRecientlyUpdatedAlbum.updated_time < updated) {
                    mostRecientlyUpdatedAlbum.albumId = album.id;
                    mostRecientlyUpdatedAlbum.updated = updated;
                  }
                });

                if (mostRecientlyUpdatedAlbum.albumId) {
                  $state.go('albums.detail', { albumId: mostRecientlyUpdatedAlbum.albumId });
                }
              });
            }
          ]
        })

        .state('albums.detail', {
          url: '/album/:albumId',
          views: {
            'albumPhotos': {
              templateUrl: 'views/album-details.html',
              controller: ['$scope', '$stateParams', '$state', 'fbApi',
                function (  $scope,   $stateParams,   $state,   fbApi) {
                  $scope.carouselInterval = 5000;

                  //caching required to keep the last viewed item when switching between albums
                  $scope.album = albums[$stateParams.albumId] ? albums[$stateParams.albumId] : fbApi.album.list({ 'albumId': $stateParams.albumId }, (function () {  
                    var albumId = $stateParams.albumId; 
                    return function (album) {
                      albums[albumId] = album;
                    };
                  })());
                }
              ]
            }
          }
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
            }
          ]
        }
      );
    }
  ]
);