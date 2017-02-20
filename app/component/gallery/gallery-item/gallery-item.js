'use strict';

require('./_gallery-item.scss');

module.exports = {
  template: require('./gallery-item.html'),
  controller: ['$log', 'galleryService', GalleryItemController],
  controllerAs: 'galleryItemControl',
  bindings: {
    gallery: '<'
  }
};

function GalleryItemController($log, galleryService) {
  $log.debug('GalleryItemController');

  this.showEditGallery = false;
  this.limitFullDesc = 35;
  this.limitedDesc = true;

  this.expandGalleryDesc = function() {
    this.limitFullDesc = 1000;
    this.limitedDesc = false;
  }

  this.deleteGallery = function() {
    galleryService.deleteGallery(this.gallery._id);
  };
};
