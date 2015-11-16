angular.module('copayApp')
  .controller('OverviewCtrl', function($scope, $cordovaFileTransfer, $cordovaFile) {
    // With Ionic view caching, controllers are only run on app start
    $scope.appendScriptTag = function (src){
      var tag = document.createElement('script');
      tag.src = src || 'lib/ionic/js/ionic.bundle.min.js';
      document.body.appendChild(tag);
    }

    $scope.downloadFile = function() {
      console.log('$scope.downloadFile called');
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
        fs.root.getDirectory(
            "ExampleProject",
            {
                create: true
            },
            function(dirEntry) {
                dirEntry.getFile(
                    "jquery.js",
                    {
                        create: true,
                        exclusive: false
                    },
                    function gotFileEntry(fe) {
                        var p = fe.toURL();
                        fe.remove();
                        ft = new FileTransfer();
                        ft.download(
                            //encodeURI("https://bitpay.com/images/bitcoin.19154c52.svg"),
                            encodeURI("https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"),
                            p,
                            function(entry) {
                                console.log('entry', entry);
                                //$ionicLoading.hide();
                                $scope.imgFile = entry.toURL();
                                console.log('$scope.imgFile', $scope.imgFile);
                            },
                            function(error) {
                                //$ionicLoading.hide();
                                console.log('error', JSON.stringify(error));
                                alert("Download Error Source -> " + error.source);
                            },
                            false,
                            null
                        );
                    },
                    function() {
                        //$ionicLoading.hide();
                        console.log("Get file failed");
                    }
                );
            }
        );
    },
    function() {
        //$ionicLoading.hide();
        console.log("Request for filesystem failed");
    });
      // var url = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";
      // var filename = url.split("/").pop();
      // alert(filename);
      // var targetPath = cordova.file.externalRootDirectory + filename;
      // var trustHosts = true
      // var options = {};
      // alert(cordova.file.externalRootDirectory);
      // console.log('targetPath', targetPath);
      // $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      //   .then(function(result) {
      //     // Success!
      //     alert(JSON.stringify(result));
      //   }, function(error) {
      //     // Error
      //     alert(JSON.stringify(error));
      //   }, function (progress) {
      //     $timeout(function () {
      //       $scope.downloadProgress = (progress.loaded / progress.total) * 100;
      //     })
      //   });
    };

    var filePath;
    $scope.loadFile = function(){
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
          fs.root.getDirectory(
              "ExampleProject",
              {
                  create: false
              },
              function(dirEntry) {
                  dirEntry.getFile(
                      "jquery.js",
                      {
                          create: false,
                          exclusive: false
                      },
                      function gotFileEntry(fe) {
                          console.log('loaded file', fe);
                          console.log('loaded file.toString()', fe.toString());
                          //$ionicLoading.hide();
                          $scope.imgFile = fe.toURL();
                          console.log('loaded file: ', $scope.imgFile);
                          filePath = $scope.imgFile;

                          fe.file(function(file) {
                            var reader = new FileReader();

                            reader.onloadend = function(e) {
                              console.log("Text is: "+this.result);
                              // document.querySelector("#textArea").innerHTML = this.result;
                            }

                            reader.readAsText(file);
                          });
                      },
                      function(error) {
                          //$ionicLoading.hide();
                          console.log("Error getting file");
                      }
                  );
              }
          );
      },
      function() {
          $ionicLoading.hide();
          console.log("Error requesting filesystem");
      });
    };

    $scope.deleteFile = function(){
      var filepath = filePath;

      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
          fs.root.getDirectory(
              "ExampleProject",
              {
                  create: false
              },
              function(dirEntry) {
                  dirEntry.getFile(
                      "jquery.js",
                      {
                          create: false,
                          exclusive: false
                      },
                      function gotFileEntry(fe) {
                          //$ionicLoading.hide();
                          $scope.imgFile = fe.toURL();
                          console.log('loaded file: ', $scope.imgFile);
                          filePath = $scope.imgFile;

                          console.log('deleting file');
                          fe.remove(function(file){
                            console.log('file removed!')
                          }, function(error){
                            console.log('error deleting file: ', error);
                          }, function(){
                            console.log('file does not exist')
                          })
                      },
                      function(error) {
                          //$ionicLoading.hide();
                          console.log("Error getting file");
                      }
                  );
              }
          );
      },
      function() {
          $ionicLoading.hide();
          console.log("Error requesting filesystem");
      });

      // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
      //     fileSystem.root.getFile(relativeFilePath, {create:false}, function(fileEntry){
      //         fileEntry.remove(function(file){
      //             console.log("File removed!");
      //         },function(){
      //             console.log("error deleting the file " + error.code);
      //             });
      //         },function(){
      //             console.log("file does not exist");
      //         });
      //     },function(evt){
      //         console.log(evt.target.error.code);
      // });



      // $cordovaFile.removeFile(filepath)
      //   .then(function(result) {
      //           alert("success");
      //           // Success!
      //   }, function(err) {
      //           alert(JSON.stringify(err));
      //           // Error
      //   });
    };

    $scope.$on('$ionicView.enter', function(e) {

    });
  });
