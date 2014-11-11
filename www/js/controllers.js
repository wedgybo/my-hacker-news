angular.module('starter.controllers', [])
.controller('TabCtrl', function($scope, GroupNews) {

})
.controller('HackerNewsCtrl', function($scope, $ionicLoading, HackerNews, GroupNews, PostViewer) {

  $scope.loadPosts = function () {
    HackerNews.newest().then(function (posts) {
      $scope.posts = posts.data;
    });
  };

  $scope.viewPost = function (post) {
    PostViewer.viewPost(post);
  };

  $scope.loadPosts();
})

.controller('ChatsCtrl', function($scope, $ionicLoading, GroupNews) {

})

.controller('ChatDetailCtrl', function($scope, $stateParams, $firebase, User, GroupNews, PostViewer) {

})

.controller('AccountCtrl', function($scope, User, GroupNews) {
  $scope.saveUser = function (user) {
    User.save(user);
  };
});
