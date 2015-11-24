// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter')


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'appController'
  })

  .state('app.signin', {
    url: '/signin',
    views: {
      'menuContent': {
        templateUrl: 'templates/signin.html',
        controller: 'signinController'
      }
    }
  })
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsController'
      }
    }
  })
  .state('app.feed', {
    url: '/feed',
    views: {
      'menuContent': {
        templateUrl: 'templates/feed.html',
        controller: 'feedController'//This is to show news feed - may be news about vehicles
      }
    }
  })
  .state('app.choose', {
    url: '/choose',
    views: {
      'menuContent': {
        templateUrl: 'templates/choose.html',
        controller: 'chooseController'//Choose whether you're looking for car or bike - much better way to ask some choices etc and then take inputs
      }
    }
  })
  .state('app.results', {
    url: '/results',
    views: {
      'menuContent': {
        templateUrl: 'templates/results.html',
        controller: 'resultsController'
      }
    }
  })
  .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'profileController'
        }
      }
    })
  .state('app.wishlist', {
      url: '/wishlist',
      views: {
        'menuContent': {
          templateUrl: 'templates/wishlist.html',
          controller: 'wishlistController'
        }
      }
    })
  .state('app.contact', {
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html',
        controller: 'contactController'
      }
    }
  })


    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/signin');
});
