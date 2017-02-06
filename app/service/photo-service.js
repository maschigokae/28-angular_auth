'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', photoService];

function photoService($q, $log, $http, Upload, authService) {
  $log.debug('photoService()');

  let service = {};

  service.uploadGalleryPhoto = function(galleryData, picData) {
    $log.debug('photoService.uploadGalleryPhoto()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file
        }
      });
    })
    .then( response => {
      galleryData.pics.unshift(response.data);
      return response.data;
    })
    .catch( err => {
      $log.error('ERROR:', err.message);
      return $q.reject(err);
    });
  };

  service.deletePhoto = function(galleryData, picID) {
    $log.debug('photoService.deletePhoto()');

    return authService.getToken()
    .then( token => {
      $log.log('galleryData', galleryData);
      $log.log('picID', picID);
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( response => {
      for (let i = 0; i < galleryData.pics.length; i++) {
        let current = galleryData.pics[i];

        if (current._id === picID) {
          galleryData.pics.splice(i, 1);
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
