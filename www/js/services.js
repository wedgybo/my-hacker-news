angular.module('starter.services', [])

.factory('GroupNews', function ($q, $firebase, User) {


})

.factory('HackerNews', function ($http) {
  return {
    newest: function () {
      return $http.get('http://hn-api.ionic.io/new/1');
    }
  };
})

.factory('PostViewer', function ($rootScope, $sce, $ionicModal) {

})

.factory('User', function ($window) {

});
