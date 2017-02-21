'use strict';

describe('thumbnail container component', function() {
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $window, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });

  it('should have proper component bindings', () => {
    let mockBindings = {
      gallery: {
        _id: '1234567890',
        name: 'test gallery name',
        desc: 'test gallery description',
        pics: [
          {
            _id: '0987654321',
            name: 'test photo name',
            desc: 'test photo description',
            imageURI: 'http://testURI.net/test.jpg'
          }
        ]
      },
      pic: {
        _id: '0987654321',
        name: 'test photo name',
        desc: 'test photo description',
        imageURI: 'http://testURI.net/test.jpg'
      }
    };

    let thumbnailContainerControl = this.$componentController('thumbnailContainer', null, mockBindings);

    expect(thumbnailContainerControl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(thumbnailContainerControl.gallery.desc).toEqual('test gallery description');
    expect(thumbnailContainerControl.gallery.pics.length).toEqual(1);
    expect(thumbnailContainerControl.pic.name).toEqual('test photo name');
    expect(thumbnailContainerControl.pic.imageURI).toEqual(mockBindings.pic.imageURI);

    this.$rootScope.$apply();
  });

  describe('thumbnailContainerControl.deletePhoto()', () => {
    it('should call the deletePhoto method and DELETE a photo', () => {

      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'test-token');

      let mockBindings = {
        gallery: {
          _id: '1234567890',
          name: 'test gallery name',
          desc: 'test gallery description',
          pics: [
            {
              _id: '0987654321',
              name: 'test photo name',
              desc: 'test photo description',
              imageURI: 'http://testURI.net/test.jpg'
            }
          ]
        },
        pic: {
          _id: '0987654321',
          name: 'test photo name',
          desc: 'test photo description',
          imageURI: 'http://testURI.net/test.jpg'
        }
      };

      let url = `${__API_URL__}/api/gallery/${mockBindings.gallery._id}/pic/${mockBindings.pic._id}`;

      let headers = {
        Authorization: 'Bearer test-token',
        Accept: 'application/json, text/plain, */*',
      };

      this.$httpBackend.expectDELETE(url, headers).respond(204);

      let thumbnailContainerControl = this.$componentController('thumbnailContainer', null, mockBindings);

      thumbnailContainerControl.gallery = {
        _id: '1234567890',
        name: 'test gallery name',
        desc: 'test gallery description',
        pics: [
          {
            _id: '0987654321',
            name: 'test photo name',
            desc: 'test photo description',
            imageURI: 'http://testURI.net/test.jpg'
          }
        ]
      };

      thumbnailContainerControl.deletePhoto(thumbnailContainerControl.gallery, '0987654321');

      this.$rootScope.$apply();
    });
  });
});
