'use strict';

describe('gallery service', function() {
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, authService, galleryService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('galleryService.createGallery()', () => {
    it('should create a new gallery', () => {
      let galleryData = {
        name: 'example gallery',
        desc: 'example description',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer test-token'
      };

      this.$httpBackend.expectPOST(`${__API_URL__}/api/gallery`, galleryData, headers)
      .respond(200, {
        _id: '1234567890',
        username: 'testuser',
        name: galleryData.name,
        desc: galleryData.desc,
        pics: []
      });

      this.galleryService.createGallery(galleryData)
      .then( gallery => {
        expect(gallery.name).toEqual('example gallery');
        expect(gallery.pics).toEqual([]);
      })
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('galleryService.fetchGalleries()', () => {
    it('should return all galleries', () => {

      let headers = {
        Authorization: 'Bearer test-token',
        Accept: 'application/json'
      };

      this.$httpBackend.expectGET(`${__API_URL__}/api/gallery`, headers)
      .respond(200);

      this.galleryService.fetchGalleries();
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('galleryService.updateGallery()', () => {
    it('should return an updated gallery', () => {
      let updatedGalleryData = {
        name: 'updated gallery',
        desc: 'updated description',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer test-token'
      };

      this.$httpBackend.expectPUT(`${__API_URL__}/api/gallery/testid`, updatedGalleryData, headers)
      .respond(200);

      this.galleryService.updateGallery('testid', updatedGalleryData);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('galleryService.deleteGallery()', () => {
    it('should delete a gallery', () => {
      let galleryID = 'testid';
      let headers = {
        Authorization: 'Bearer test-token',
        Accept: 'application/json, text/plain, */*'
      };

      this.$httpBackend.expectDELETE(`${__API_URL__}/api/gallery/testid`, headers)
      .respond(204);

      this.galleryService.deleteGallery(galleryID);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
