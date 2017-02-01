'use strict';

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', LoginController],
  controllerAs: 'loginControl'
};

function LoginController($log, $location, authService) {
  $log.debug('LoginController');

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.login = function() {
    $log.debug('loginControl.login()');

    authService.login(this.user)
    .then( () => {
      $location.url('/home');
    });
  };
};
