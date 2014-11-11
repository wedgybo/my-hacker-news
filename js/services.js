angular.module('starter.services', [])

.factory('GroupNews', function ($q, $firebase, User) {

  var metadata = {
    newposts: 0
  };

  var ref = new Firebase("https://my-hacker-news.firebaseio.com/groups/" + User.get().group || '');

  return {
    metadata: metadata,
    posts: $firebase(ref).$asArray(),
    addComment: function (postId, comment) {
      console.log('Posting comment', comment, postId);
      $firebase(ref.child(postId + '/userComments')).$asArray().$add(comment);
    },
    getPosts: function () {
      var q = $q.defer();
      q.resolve(this.posts.$loaded());
      // Reset new posts once they've been fetched
      metadata.newposts = 0;
      return q.promise;
    },
    sharePost: function (post) {
      return this.posts.$add(post);
    },
    deletePost: function (post) {
      console.log('Deleting post', post);
      return this.posts.$remove(post);
    },
    get: function (postId) {
      var q = $q.defer();
      q.resolve($firebase(ref.child(postId)).$asObject().$loaded());

      return q.promise;
    }
  };
})

.factory('HackerNews', function ($http) {
  return {
    newest: function () {
      return $http.get('http://hn-api.ionic.io/new/1');
    }
  };
})

.factory('PostViewer', function ($rootScope, $sce, $ionicModal) {
  var $scope = $rootScope.$new();
  angular.extend($scope, {
    post: null,
    hideModal: function() {
      return modal.hide();
    },
    trustedUrl: function (url) {
      return $sce.trustAsResourceUrl(url);
    }
  });

  $ionicModal.fromTemplateUrl('templates/post-detail.html', {
    scope: $scope
  }).then(function (ionicModal) {
    modal = ionicModal;
  });

  return {
    viewPost: function (post) {
      $scope.post = post;
      modal.show();
    }
  };
})

.factory('User', function ($window) {
  var user = {
    name: '',
    group: ''
  };

  // Decode the user in local storage
  user = JSON.parse($window.localStorage.getItem('user')) || user;

  return {
    get: function () {
      return user;
    },
    save: function (updatedUser) {
      user = updatedUser;
      $window.localStorage.setItem('user', JSON.stringify(user));
    }
  };
});
