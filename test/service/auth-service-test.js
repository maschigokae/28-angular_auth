'use strict';

describe('auth service', function() {
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, authService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('authService.getToken()', () => {
    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'preliminary-test-token');

      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('preliminary-test-token');
      })
      .catch( err => {
        expect(err).toEqual(null);
      });

      this.$rootScope.$apply();
    });
  });

  describe('authService.login()', () => {
    it('should log in a user and return a token', () => {
      let testUser = {
        username: 'test-turtle',
        password: 'turtle12345'
      };

      let base64 = this.$window.btoa(`${testUser.username}:${testUser.password}`);

      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`
      };

      this.$httpBackend.expectGET('http://localhost:8000/api/login', headers)
      .respond(200, base64);

      this.authService.login(testUser)
      .then( encryptedToken => {
        expect(encryptedToken).toEqual(base64);
      });
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('authService.signup()', () => {
    it('should sign up a user and return a token', () => {
      let testUser = {
        username: 'test-turtle',
        email: 'test@turtle.net',
        password: 'turtle12345'
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      };

      this.$httpBackend.expectPOST('http://localhost:8000/api/signup', testUser, headers)
      .respond(200, 'test-token');
      // TOKEN RETURNED IN LAST AUTH SERVICE DESCRIBE BLOCK CASCADES TO GALLERY SERVICE TESTS

      this.authService.signup(testUser)
      .then( newToken => {
        expect(newToken).toEqual('test-token');
      });

      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
