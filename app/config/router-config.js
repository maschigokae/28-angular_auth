'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/join#signup');
  $urlRouterProvider.when('/', '/join#signup');
  $urlRouterProvider.when('/signup', '/join#signup');
  $urlRouterProvider.when('/signin', '/join#signin');

  let states = [
    {
      name: 'home',
      url: '/home',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeControl'
    },
    {
      name: 'landing',
      url: '/join',
      template: require('../view/landing/landing.html'),
      controller: 'LandingController',
      controllerAs: 'landingControl'
    }
  ];

  states.forEach( eachState => {
    $stateProvider.state(eachState);
  });
};
