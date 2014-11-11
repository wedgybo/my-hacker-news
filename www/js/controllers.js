angular.module('starter.controllers', [])
.filter('isMine', function (User) {
  return function (input) {
    return User.get().name === input;
  };
})
.controller('TabCtrl', function($scope, GroupNews) {

})
.controller('HackerNewsCtrl', function($scope, $ionicLoading, HackerNews, GroupNews, PostViewer) {

  $scope.loadPosts = function () {
    HackerNews.newest().then(function (posts) {
      $scope.posts = posts.data;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.sharePost = function (post) {
    $ionicLoading.show({
      template: 'Sharing post ' + post.title
    });
    GroupNews.sharePost(post).then($ionicLoading.hide);
  };

  $scope.viewPost = function (post) {
    PostViewer.viewPost(post);
  };

  $scope.loadPosts();
})

.controller('ChatsCtrl', function($scope, $ionicLoading, GroupNews) {
  GroupNews.getPosts().then(function (posts) {
    $scope.posts = posts;
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, $firebase, User, GroupNews, PostViewer) {

  GroupNews.get($stateParams.postId).then(function (post) {
    $scope.post = post;
  });

  $scope.comment = {
    user: User.get().name
  };

  $scope.viewPost = function (post) {
    PostViewer.viewPost(post);
  };

  $scope.addComment = function (postId, comment) {
    GroupNews.addComment(postId, comment);
  };

  $scope.viewPost = function (post) {
    PostViewer.viewPost(post);
  };
})

.controller('AccountCtrl', function($scope, User, GroupNews) {

  $scope.user = User.get();

  $scope.saveUser = function (user) {
    User.save(user);
    GroupNews.refresh(user.group);
  };
});
