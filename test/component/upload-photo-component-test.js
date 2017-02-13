'use strict';

describe('upload photo component', function() {
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
        _id: '1234567890',
        name: 'test name',
        desc: 'test description'
      }
    };

    let uploadPhotoControl = this.$componentController('uploadPhoto', null, mockBindings);

    expect(uploadPhotoControl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(uploadPhotoControl.gallery.desc).toEqual('test description');

    this.$rootScope.$apply();
  });

  describe('uploadPhotoControl.uploadPhoto()', () => {
    it('should call the uploadPhoto method and POST a new photo', () => {
      let mockBindings = {
        gallery: {
          _id: '1234567890',
          name: 'test name',
          desc: 'test description'
        }
      };

      let newPhotoData = {
        name: 'new gallery name',
        desc: 'new gallery description',
        file: 'test-file'
      };

      // nothing passed into expectPOST because ng-file-upload handles url, config, http method, and data
      this.$httpBackend.expectPOST().respond(200);

      let uploadPhotoControl = this.$componentController('uploadPhoto', null, mockBindings);
      uploadPhotoControl.uploadPhoto(mockBindings, newPhotoData);

      this.$rootScope.$apply();
    });
  });
});
