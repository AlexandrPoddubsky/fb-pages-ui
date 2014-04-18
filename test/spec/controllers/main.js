'use strict';

describe('Controller: MainCtrl', function() {
  var $httpBackend, MainCtrl, scope;

  // load the controller's module
  beforeEach(module('fbPagesUiApp.controllers'));
  beforeEach(module('fbPagesUiApp.services'));
  beforeEach(module('config'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $injector, _$httpBackend_) {
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
    $httpBackend.flush()
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
  })
});

// describe('Controller: MainCtrl', function () {

//   // load the controller's module
//   beforeEach(module('fbPagesUiApp'));

//   describe('MainCtrl', function(){
//     var $httpBackend, $rootScope, createController;
 
//     beforeEach(inject(function($injector) {
//       // Set up the mock http service responses
//       $httpBackend = $injector.get('$httpBackend');
//       // backend definition common for all tests
//       $httpBackend.when('GET', '/fb/posts').respond({userId: 'userX'}, {'A-Token': 'xxx'});
//       $httpBackend.when('GET', '/config').respond({"facebook":{"appId":123},"google":{"analytics":{"siteId":"abc"}}});

//       // Get hold of a scope (i.e. the root scope)
//       $rootScope = $injector.get('$rootScope');
//       // The $controller service is used to create instances of controllers
//       var $controller = $injector.get('$controller');

//       createController = function() {
//         return $controller('MainCtrl', {'$scope' : $rootScope });
//       };
//     }));

//     afterEach(function() {
//       $httpBackend.verifyNoOutstandingExpectation();
//       $httpBackend.verifyNoOutstandingRequest();
//     });
 
 
//     it('should pull required FB data from the back end on page load', function() {
//       expect($rootScope.posts).toBeUndefined();
//       var controller = createController();
//       console.log(controller);
//       expect($rootScope.posts.$resolved).toBeFalse();
//       $httpBackend.flush();
//       console.log($rootScope.posts);
//       expect($rootScope.page.$resolved).toBeTrue();
 
//       //expect(scope.page).toEqualData([{name: 'test'}, {name: 'a page'}]);
//     });
 
 
//     // it('should set the default value of orderProp model', function() {
//     //   expect(scope.orderProp).toBe('age');
//     // });
//   });

//   // var MainCtrl,
//   //   scope;

//   // // Initialize the controller and a mock scope
//   // beforeEach(inject(function ($controller, $rootScope) {
//   //   scope = $rootScope.$new();
//   //   MainCtrl = $controller('MainCtrl', {
//   //     $scope: scope
//   //   });
//   // }));

//   // it('should attach a list of awesomeThings to the scope', function () {
//   //   expect(scope.posts.length).toBeGreaterThan(3);
//   // });
// });
