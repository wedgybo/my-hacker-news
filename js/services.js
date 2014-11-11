angular.module('starter.services', [])

.factory('GroupNews', function ($q, $firebase, User) {

  var ref = new Firebase("https://my-hacker-news.firebaseio.com/groups/" + User.get().group || '');

  return {
    posts: $firebase(ref).$asArray(),
    addComment: function (postId, comment) {
      $firebase(ref.child(postId + '/userComments')).$asArray().$add(comment);
    },
    getPosts: function () {
      return this.posts.$loaded();
    },
    sharePost: function (post) {
      return this.posts.$add(post);
    },
    deletePost: function (post) {
      return this.posts.$remove(post);
    },
    get: function (postId) {
      return $firebase(ref.child(postId)).$asObject().$loaded();
    },
    refresh: function () {
      ref = new Firebase("https://my-hacker-news.firebaseio.com/groups/" + User.get().group || '');
      this.posts = $firebase(ref).$asArray();
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
