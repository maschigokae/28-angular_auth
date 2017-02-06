'use strict';

require('./_upload-photo.scss');

module.exports = {
  template: require('./upload-photo.html'),
  controller: ['$log', 'photoService', UploadPhotoController],
  controllerAs: 'uploadPhotoControl',
  bindings: {
    gallery: '<'
  }
};

function UploadPhotoController($log, photoService) {
  $log.debug('UploadPhotoController');

  this.photo = {};

  this.uploadPhoto = function() {
    photoService.uploadGalleryPhoto(this.gallery, this.photo)
    .then( () => {
      this.photo.name = null;
      this.photo.desc = null;
      this.photo.file = null;
    });
  };
};
