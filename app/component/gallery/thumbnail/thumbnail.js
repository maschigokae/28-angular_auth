'use strict';

require('./_thumbnail.scss');

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'photoService', ThumbnailController],
  controllerAs: 'thumbnailControl',
  bindings: {
    pic: '<'
  }
};

function ThumbnailController($log, photoService) {
  $log.debug('ThumbnailController');

  this.deletePhoto = function() {
    $log.debug('thumbnailControl.deletePhoto()');
    // TODO: BUILD OUT DELETE PHOTO FUNCTIONALITY
  };
};
