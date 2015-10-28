angular.module('copayApp')
  .controller('OverviewCtrl', function($scope, $cordovaFileTransfer){//, $cordovaFile) {
    // With Ionic view caching, controllers are only run on app start
    $scope.downloadFile = function() {
      console.log('$scope.downloadFile called');
      var url = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";
      var filename = url.split("/").pop();
      alert(filename);
      var targetPath = cordova.file.externalRootDirectory + filename;
      var trustHosts = true
      var options = {};
      alert(cordova.file.externalRootDirectory);
      console.log('targetPath', targetPath);
      $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
        .then(function(result) {
          // Success!
          alert(JSON.stringify(result));
        }, function(error) {
          // Error
          alert(JSON.stringify(error));
        }, function (progress) {
          $timeout(function () {
            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
          })
        });
    };

    // $cordovaFile.removeFile(filepath)
    //   .then(function(result) {
    //           alert("success");
    //           // Success!
    //   }, function(err) {
    //           alert(JSON.stringify(err));
    //           // Error
    //   });


    $scope.$on('$ionicView.enter', function(e) {
      $scope.downloadFile();
    });
  });
