'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService) {
  $log.debug('galleryService()');

  let service = {};
  service.galleries = [];

  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.post(url, gallery, config);
    })
    .then( response => {
      $log.log('sucess: gallery created');

      let gallery = response.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch( err => {
      $log.error('ERROR:', err.message);
      return $q.reject(err);
    });
  };

  service.deleteGalleries = function(galleryID, galleryData) {
    $log.debug('galleryService.deleteGalleries()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
    });
    // TODO: BUILD OUT DELETE FUNCTIONALITY
  };

  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( response => {
      $log.log('success: galleries retrieved');
      service.galleries = response.data;
      return service.galleries;
    })
    .catch( err => {
      $log.error('ERROR:', err.message);
      return $q.reject(err);
    });
  };

  service.updateGallery = function(galleryID, galleryData) {
    $log.debug('galleryService.updateGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, galleryData, config);
    })
    .then( response => {
      for (let i = 0; i < service.galleries.length; i++) {
        let current = service.galleries[i];

        if (current._id === galleryID) {
          service.galleries[i] = response.data;
          break;
        }
      }

      return response.data;
    })
    .catch( err => {
      $log.error('ERROR:', err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function(galleryID) {
    $log.debug('galleryService.deleteGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( response => {
      for (let i = 0; i < service.galleries.length; i++) {
        let current = service.galleries[i];

        if (current._id === galleryID) {
          service.galleries[i] = response.data;
          break;
        }
      }
    })
    .catch( err => {
      $log.error('ERROR:', err.message);
      return $q.reject(err);
    });
  };

  return service;
};
