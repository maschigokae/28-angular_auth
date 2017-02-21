'use strict';

require('./_thumbnail-container.scss');

module.exports = {
  template: require('./thumbnail-container.html'),
  controller: ['$log', 'photoService', ThumbnailContainerController],
  controllerAs: 'thumbnailContainerControl',
  bindings: {
    gallery: '<',
    pic: '<'
  }
};

function ThumbnailContainerController($log, photoService) {
  $log.debug('ThumbnailContainerController');

  this.deletePhoto = function(gallery, photo) {
    $log.debug('thumbnailContainerControl.deletePhoto()');

    photoService.deletePhoto(gallery, photo);
  };
};
