angular.module('starter.controllers', [])
.controller('TabCtrl', function($scope, GroupNews) {

})
.controller('HackerNewsCtrl', function($scope, $ionicLoading, HackerNews, GroupNews, PostViewer) {

})

.controller('ChatsCtrl', function($scope, $ionicLoading, GroupNews) {

})

.controller('ChatDetailCtrl', function($scope, $stateParams, $firebase, User, GroupNews, PostViewer) {

})

.controller('AccountCtrl', function($scope, User, GroupNews) {

});
