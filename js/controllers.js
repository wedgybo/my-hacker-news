angular.module('starter.controllers', [])
.controller('TabCtrl', function($scope, GroupNews) {
  $scope.badges = {
    newposts: GroupNews.posts.$loaded(function(posts) { return posts.length; })
  };
})
.controller('HackerNewsCtrl', function($scope, $ionicLoading, HackerNews, GroupNews, PostViewer) {

  $scope.posts = [];

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

  // Load the posts when this controller is loaded
  $scope.loadPosts();
})

.controller('ChatsCtrl', function($scope, $ionicLoading, GroupNews) {
  GroupNews.getPosts().then(function (posts) {
    $scope.posts = posts;
  });

  $scope.deletePost = function (post) {
    $ionicLoading.show({
      template: 'Deleting post ' + post.title
    });
    GroupNews.deletePost(post).then($ionicLoading.hide);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, $firebase, User, GroupNews, PostViewer) {

  $scope.comment = {
    user: User.get().name
  };

  GroupNews.get($stateParams.postId).then(function (post) {
      $scope.post = post;
      $scope.comments = post.userComments;
  });

  $scope.addComment = function (postId, comment) {
    GroupNews.addComment(postId, comment);
  };

  $scope.viewPost = function (post) {
    PostViewer.viewPost(post);
  };
})

.controller('AccountCtrl', function($scope, User) {
  $scope.user = User.get();

  $scope.saveUser = function (user) {
    User.save(user);
  };
})

.filter('isMine', ['User', function (User) {
  return function (input) {
    return User.get().name === input;
  };
}]);
