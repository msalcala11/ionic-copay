angular.module('copayApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'components/tabs/tabs.html'
    })
    // Each tab has its own nav history stack:
    .state('app.overview', {
      url: '/overview',
      views: {
        'app-overview': {
          templateUrl: 'views/overview/overview.html',
          controller: 'OverviewCtrl'
        }
      }
    })
    .state('app.action', {
      url: '/action',
      views: {
        'app-action': {
          templateUrl: 'views/action/action.html',
          controller: 'ActionCtrl'
        }
      }
    })
    .state('app.wallets', {
      url: '/wallets',
      views: {
        'app-wallets': {
          templateUrl: 'views/wallets/wallets.html',
          controller: 'WalletsCtrl'
        }
      }
    })
    .state('app.wallet', {
      url: '/wallets/:walletId',
      views: {
        'app-wallets': {
          templateUrl: 'views/wallets/wallet/wallet.html',
          controller: 'WalletCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/overview');
});
