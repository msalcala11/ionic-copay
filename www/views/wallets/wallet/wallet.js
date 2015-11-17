angular.module('app')
  .controller('WalletCtrl', function($scope) {
    // With Ionic view caching, controllers are only run on app start
    $scope.$on('$ionicView.enter', function(e) {
      // refresh view data
    });
  });
