'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupControl'
};

function SignupController($log, $location, authService) {
  $log.debug('SignupController');

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.signup = function(user) {
    $log.debug('signupControl.signup()');

    authService.signup(user)
    .then( () => {
      $location.url('/home');
    });
  };
};
