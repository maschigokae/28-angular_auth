'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', '$rootscope', 'authService', LandingController];

function LandingController($log, $location, authService) {
  $log.debug('LandingController');

  let url = $location.url();
  this.showSignup = url === '/join#signup' || url === '/join';
};
