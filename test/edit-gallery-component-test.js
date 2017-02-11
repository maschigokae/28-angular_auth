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
});
