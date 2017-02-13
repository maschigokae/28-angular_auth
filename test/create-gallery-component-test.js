'use strict';

describe('create gallery component', function() {
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });

  describe('createGalleryControl.createGallery()', () => {
    it('should call the createGallery method and POST a new gallery', () => {
      let url = `${__API_URL__}/api/gallery`;

      let newGalleryData = {
        name: 'new gallery name',
        desc: 'new gallery description'
      }

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-token'
      };

      this.$httpBackend.expectPOST(url, newGalleryData, headers).respond(200);

      let createGalleryControl = this.$componentController('createGallery', null);

      createGalleryControl.gallery.name = 'new gallery name';
      createGalleryControl.gallery.desc = 'new gallery description';
      createGalleryControl.createGallery();

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
