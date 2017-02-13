'use strict';

describe('edit gallery component', function() {
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });

  it('should have proper component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'test name',
        desc: 'test description'
      }
    };

    let editGalleryControl = this.$componentController('editGallery', null, mockBindings);

    expect(editGalleryControl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(editGalleryControl.gallery.desc).toEqual('test description');

    this.$rootScope.$apply();
  });

  describe('editGalleryControl.updateGallery()', () => {
    it('should make a valid PUT request', () => {
      let url = `${__API_URL__}/api/gallery/1234567890`;

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-token'
      };

      this.$httpBackend.expectPUT(url, {
        _id: '1234567890',
        name: 'updated gallery name',
        desc: 'updated gallery description'
      }, headers).respond(200);

      let mockBindings = {
        gallery: {
          _id: '1234567890',
          name: 'updated gallery name',
          desc: 'updated gallery description'
        }
      };

      let editGalleryControl = this.$componentController('editGallery', null, mockBindings);

      editGalleryControl.gallery.name = 'updated gallery name';
      editGalleryControl.gallery.desc = 'updated gallery description';
      editGalleryControl.updateGallery();

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
