'use strict';

/**
 * @ngdoc overview
 * @name jmApp
 * @description
 * # jmApp
 *
 * Main module of the application.
 */
angular
  .module('jmApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'carCtrl'/*,
        controllerAs: 'main'*/
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
