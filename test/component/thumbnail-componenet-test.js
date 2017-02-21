'use strict';

describe('thumbnail component', function() {
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

    let thumbnailControl = this.$componentController('thumbnail', null, mockBindings);

    expect(thumbnailControl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(thumbnailControl.gallery.desc).toEqual('test gallery description');
    expect(thumbnailControl.gallery.pics.length).toEqual(1);
    expect(thumbnailControl.pic.name).toEqual('test photo name');
    expect(thumbnailControl.pic.imageURI).toEqual(mockBindings.pic.imageURI);

    this.$rootScope.$apply();
  });

  describe('thumbnailControl.deletePhoto()', () => {
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

      let thumbnailControl = this.$componentController('thumbnail', null, mockBindings);

      thumbnailControl.gallery = {
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
      thumbnailControl.pic._id = '0987654321';
      thumbnailControl.deletePhoto();

      this.$rootScope.$apply();
    });
  });
});
