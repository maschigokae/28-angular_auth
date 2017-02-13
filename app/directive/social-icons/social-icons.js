'use strict';

module.exports = function() {
  return {
    restrict: 'EAC',
    template: require('./social-icons.html'),
    controller: ['$log', SocialIconsController],
    bindToController: true,
    controllerAs: 'socialIconsControl',
    scope: {
      title: '@'
    }
  };
};

function SocialIconsController() {
  this.icons = ['facebook', 'twitter', 'instagram'];
};
