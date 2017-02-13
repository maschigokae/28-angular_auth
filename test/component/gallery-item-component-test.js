'use strict';

describe('gallery item component', function() {
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });

  describe('galleryItemControl.deleteDone()', () => {
    it('should call the deleteDone method', () => {
      let mockBindings = {
        gallery: {
          _id: '1234567890',
          name: 'test gallery name',
          desc: 'test gallery description',
          pics: []
        },
        deleteDone: function(data) {
          expect(data.galleryData._id).toEqual('1234567890');
        }
      };

      let galleryItemControl = this.$componentController('galleryItem', null, mockBindings);
      galleryItemControl.deleteDone({ galleryData: galleryItemControl.gallery });

      this.$rootScope.$apply();
    });

    it('should call the deleteDone method on a gallery after galleryDelete', () => {
      let url = `${__API_URL__}/api/gallery/1234567890`;

      let headers = {
        Authorization: 'Bearer test-token',
        Accept: 'application/json, text/plain, */*',
      };

      let mockBindings = {
        gallery: {
          _id: '1234567890',
          name: 'test gallery name',
          desc: 'test gallery description',
          pics: []
        },
        deleteDone: function(data) {
          expect(data.galleryData._id).toEqual('1234567890');
        }
      };

      this.$httpBackend.expectDELETE(url, headers).respond(204);

      let galleryItemControl = this.$componentController('galleryItem', null, mockBindings);
      galleryItemControl.deleteGallery();

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
