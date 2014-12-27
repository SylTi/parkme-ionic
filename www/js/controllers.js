angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('AroundCtrl', function($scope) {

})


.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MapCtrl', function ($scope, $http) {
  $scope.mapOptions = {
    center: new google.maps.LatLng(35.784, -78.670),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  $scope.aff = false;
  $scope.selectAround = 1000;
  $scope.autolibs = '';
  $scope.parkings = '';


  $scope.centerOnMe = function() 
  {
    console.log($scope.mapOptions);
    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.mapOptions.center = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      //google.maps.event.trigger(map,'resize');
      $scope.aff = true;
      getAroundAutolibs();
      getAroundParkings();

      $scope.$apply();
    }, function(error) {
      console.log('Unable to get location: ' + error.message);
    });
  };

  var getAroundAutolibs = function ()
  {
    $http.get('http://127.0.0.1:9292/192.168.3.9:9000/api/autolibs/find/'+$scope.mapOptions.center.k+'/'+$scope.mapOptions.center.D+'/'+$scope.selectAround)
    .success(function (res)
    {
      console.log('autolibs :');
      console.log(res);
      $scope.autolibs = res;
    }).error(function (err)
    {
      console.log('err : ', err);
    });
  }

  var getAroundParkings = function ()
  {
    $http.get('http://127.0.0.1:9292/192.168.3.9:9000/api/parkings/find/'+$scope.mapOptions.center.k+'/'+$scope.mapOptions.center.D+'/'+$scope.selectAround)
    .success(function (res)
    {
      console.log('parkings :');
      console.log(res);
      $scope.parkings = res;
      console.log('$scope: ', $scope.parkings);
    }).error(function (err)
    {
      console.log('err : ', err);
    });
  }
});
