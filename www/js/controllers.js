angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
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

.controller('MapCtrl', function ($scope) {
  $scope.mapOptions = {
    center: new google.maps.LatLng(35.784, -78.670),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  $scope.aff = false;

  $scope.centerOnMe = function() {

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.mapOptions.center = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      //google.maps.event.trigger(map,'resize');
      $scope.aff = true;
      $scope.$apply();
    }, function(error) {
      console.log('Unable to get location: ' + error.message);
    });
  };
});
