/* global getJSONFixture */
'use strict';

describe('Controller: MainCtrl', function() {
  var $httpBackend, MainCtrl, scope;

  // load the controller's module
  beforeEach(module('fbPagesUiApp.controllers'));
  beforeEach(module('fbPagesUiApp.services'));
  beforeEach(module('config'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    jasmine.getJSONFixtures().fixturesPath='base/test/mock';

    // backend definition common for all tests
    $httpBackend.expect('GET', 'http://localhost:5000/fb/posts').respond(getJSONFixture('posts.json'));
    $httpBackend.expect('GET', 'http://localhost:5000/fb').respond(getJSONFixture('page.json'));
    $httpBackend.when('GET', 'http://localhost:5000/config').respond(getJSONFixture('config.json'));
    
    scope = {};
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  // clean up
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  //ok, let;s not spend time testing angular with the $resolved tests...
  it('should attach a list of posts to the scope', function() {
    expect(scope.posts.$resolved).toBeFalsy();
    expect(scope.page.$resolved).toBeFalsy();
    $httpBackend.flush();
    expect(scope.posts.$resolved).toBeTruthy();
    expect(scope.page.$resolved).toBeTruthy();
  });

  //is the default object set up correctly?
  it('should create a high and low priority object for posts to resolve into', function () {
    expect(scope.orderedPosts.high.length).toBe(0);
    expect(scope.orderedPosts.low.length).toBe(0);
    $httpBackend.flush();
  });

  //is the FB data pushing posts into the right buckets?
  it('should sort posts into high and low priority', function () {
    expect(scope.orderedPosts.high.length).toBe(0);
    expect(scope.orderedPosts.low.length).toBe(0);

    //custom posts instead of the posts.json
    scope.posts = {
      'data': [{ //high
        'type': 'status'
      },
      { //high
        'status_type': 'added_photos'
      },
      { //high
        'status_type': 'mobile_status_update'
      },
      { //high
        'type': 'status',
        'status_type': 'added_photos'
      },
      { //high
        'type': 'something else',
        'status_type': 'added_photos'
      },
      { //low
        'type': '',
        'status_type': ''
      },
      { //low
        //...
      }
      ]
    };
    
    $httpBackend.flush();
    
    expect(scope.orderedPosts.high.length).toBe(5);
    expect(scope.orderedPosts.low.length).toBe(2);
  });

  it('should sort a real FB feed into high and low priority', function () {
    $httpBackend.flush();
    
    expect(scope.orderedPosts.high.length).toBe(4); //note that two are not displayed on the page due to the ng-if in the HTML
    expect(scope.orderedPosts.low.length).toBe(21);

  });
});
