/* global getJSONFixture */
'use strict';

describe('Service: fbApi', function() {
  var $httpBackend, service;

  beforeEach(module('fbPagesUiApp.services'));
  beforeEach(module('config'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector, fbApi) {
    service = fbApi;
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    jasmine.getJSONFixtures().fixturesPath='base/test/mock';

    // backend definition common for all tests
    $httpBackend.when('GET', 'http://localhost:5000/fb/posts').respond(getJSONFixture('posts.json'));
    $httpBackend.when('GET', 'http://localhost:5000/fb').respond(getJSONFixture('page.json'));
    $httpBackend.when('GET', 'http://localhost:5000/fb/photos/uploaded').respond(getJSONFixture('photos_uploaded.json'));
    $httpBackend.when('GET', 'http://localhost:5000/fb/albums').respond(getJSONFixture('albums.json'));
    $httpBackend.when('GET', 'http://localhost:5000/fb/123/photos').respond(getJSONFixture('album_123_photos.json'));
    $httpBackend.when('GET', 'http://localhost:5000/fb/123').respond(getJSONFixture('post_123.json'));
    $httpBackend.when('GET', 'http://localhost:5000/fb/234').respond(getJSONFixture('image_234.json'));
  }));

  // clean up
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch a list of posts', function() {
    var posts = service.posts.get();
    expect(posts.$resolved).toBeFalsy();
    $httpBackend.flush();
    expect(posts.data.length).toBe(25);
  });

  it('should fetch information about the page', function() {
    var page = service.page.get();
    expect(page.$resolved).toBeFalsy();
    $httpBackend.flush();
    expect(page.about).toBeTruthy();
    expect(typeof page.hours).toBe('object');
  });

  it('should fetch a list of uploaded posts', function () {
    var uploadedPhotos = service.photos.get();
    $httpBackend.flush();
    expect(uploadedPhotos.data.length).toBe(7);
  });

  it('should fetch a list of albums', function () {
    var albums = service.albums.get();
    $httpBackend.flush();
    expect(albums.data.length).toBe(6);
  });

  it('should fetch information about a specific album', function () {
    var album = service.album.get({ albumId: 123 });
    $httpBackend.flush();
    expect(album.data.length).toBe(2);
  });

  it('should fetch information about a specific post', function () {
    var post = service.post.get({ postId: 123 });
    $httpBackend.flush();
    expect(post.message).toBeTruthy();
  });

  it('should fetch information about a specific image', function () {
    var image = service.image.get({ imageId: 234 });
    $httpBackend.flush();
    expect(image.images.length > 0).toBeTruthy();
  });
});

describe('Service: fbApi', function() {
  var $httpBackend, service;

  beforeEach(module('fbPagesUiApp.services'));
  beforeEach(module('config'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector, appApi) {
    service = appApi;
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    jasmine.getJSONFixtures().fixturesPath='base/test/mock';

    $httpBackend.when('GET', 'http://localhost:5000/config').respond(getJSONFixture('config.json'));
  }));

  // clean up
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the app config and check for required values', function() {
    var config = service.config.get();
    
    expect(config.$resolved).toBeFalsy();
    
    $httpBackend.flush();
    
    expect(config.facebook.appId).toBeTruthy();
    expect(config.google.analytics.siteId).toBeTruthy();

    expect(config.facebook.pages.length).toBe(1);
  });
});
