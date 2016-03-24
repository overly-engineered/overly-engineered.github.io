/* use strict */
var mApp = angular.module('fBookApp', ['ngRoute', 'ngResource', 'firebase', 'ngCookies']);

mApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
        .when("/users/:id",
        {
            controller : 'profileController',
            templateUrl: '/work/angular/profile.html',
            controllerAs: 'profile',
            resolve: {
              // I will cause a 1 second delay
              delay: function($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 1000);
                return delay.promise;
              }
            }
        }).otherwise(
        {
            controller : 'profileController',
            templateUrl: '/work/angular/profile.html',
            controllerAs: 'profile',

        });
    //$locationProvider.html5Mode(true);

}]);
mApp.controller('profileController', ['$scope', '$firebaseObject', '$firebaseArray', '$routeParams', '$cookies', '$route', '$window', function($scope, $firebaseObject, $firebaseArray, $routeParams, $cookies, $route, $window) {

    $scope.id = 0;
    if (typeof $routeParams.id == 'undefined'){
        $scope.id = 0;
    }else {
        $scope.id = $routeParams.id;
    }

    var cookie = $cookies['angularUser'];

    if(cookie == null){
        $cookies['angularUser'] = 0;
        var cookie = $cookies['angularUser'];
    }
    console.log(cookie);
    var ref = new Firebase("https://fiery-inferno-6854.firebaseio.com/");
  // create a synchronized array
    var obj = $firebaseArray(ref);
    $scope.users = obj;
    $scope.currentUserId = cookie;
    $scope.currentUserref = ref.child($scope.currentUserId);
    $scope.currentUser = $firebaseObject(ref.child($scope.currentUserId));
    $scope.currentProfilePublic = $firebaseObject(ref.child($scope.id));
    $scope.currentProfile = $firebaseArray(ref.child($scope.id));
    var currentProfileFriendsID = $firebaseArray(ref.child($scope.id).child('contacts'));
    $scope.currentProfilePosts = $firebaseArray(ref.child($scope.id).child('posts'));
    
    $scope.addPost = function(){
        var date = new Date().toLocaleDateString('en-GB');
            $scope.currentProfilePosts.$add({
            message: $scope.newMessageText,
            date : date,
            posterName: $scope.currentUser.name
         });
            $scope.newMessageText = '';
    };
    $scope.updateStatus = function(){
        $scope.currentUserref.update({
            Status : $scope.newStatus
        });
        enterNewStatus();
    };
    obj.$loaded().then(function(){
        
   });
    currentProfileFriendsID.$loaded().then(function(){
        $scope.currentProfileFriends = [];
        angular.forEach(currentProfileFriendsID, function(value, key) {
            angular.forEach(obj, function(values, keys) {
                if(values.id == value.$value){
                    $scope.currentProfileFriends.push(values);
                }
            });
        });
   });

    $scope.switchUser = function(item){
        console.log(item);
        $cookies['angularUser'] = item;
    };

    $scope.redirect = function(item) {
    console.log('before phase');
    setTimeout(function(){
        if(!$scope.$$phase) {
            console.log('after phase');
            $scope.$apply( function() {
                var url = '/work/angular/#!users/'+item;
                $location.path(url);
                //$window.location.href = url;
            });
        }
    }, 100);
};

}]);

enterNewStatus = function(){
    document.getElementById("contact-info-status-new").classList.toggle('hidden');
    document.getElementById("contact-info-status-current").classList.toggle('hidden');
    document.getElementById("status").classList.toggle('hidden');
}