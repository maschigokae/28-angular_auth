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

  service.deletePhoto = function(galleryID, picID) {
    $log.debug('photoService.deletePhoto()');

    return authService.getToken()
    .then( token => {
      $log.log('galleryID', galleryID);
      $log.log('picID', picID);
      let url = `${__API_URL__}/api/gallery/${galleryID}/pic/${picID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .catch( err => {
      $log.error('ERROR:', err.message);
      return $q.reject(err);
    });
  };

  return service;
};
