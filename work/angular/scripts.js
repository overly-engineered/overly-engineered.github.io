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
mApp.controller('profileController', ['$scope', '$firebaseObject', '$firebaseArray', '$routeParams', '$cookies', '$route', '$window', '$location', function($scope, $firebaseObject, $firebaseArray, $routeParams, $cookies, $route, $window, $location) {

    $scope.id = 0;

    var cookie = $cookies['angularUser'];

    if(cookie == null){
        $cookies['angularUser'] = 0;
        var cookie = $cookies['angularUser'];
    }
    if (typeof $routeParams.id == 'undefined'){
        $scope.id = cookie;
    }else {
        $scope.id = $routeParams.id;
    }
    var ref = new Firebase("https://fiery-inferno-6854.firebaseio.com/");
  // create a synchronized array
    var obj = $firebaseArray(ref);
    $scope.users = obj;
    $scope.currentUserId = cookie;
    $scope.currentUserref = ref.child($scope.currentUserId);
    $scope.currentUser = $firebaseObject(ref.child($scope.currentUserId));
    $scope.currentUserContactsArray = $firebaseArray(ref.child($scope.currentUserId).child('contacts'));
    $scope.currentProfilePublic = $firebaseObject(ref.child($scope.id));
    $scope.currentProfile = $firebaseArray(ref.child($scope.id));
    $scope.currentProfileFriendsID = $firebaseArray(ref.child($scope.id).child('contacts'));
    $scope.currentProfilePosts = $firebaseArray(ref.child($scope.id).child('posts'));
    $scope.currentProfileFriends = [];
    
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
    $scope.updatePm = function(){
        $scope.currentUserref.update({
            PM : $scope.newPM
        });
        enterNewPM();
    };
    obj.$loaded().then(function(){
        
   });
    $scope.currentProfileFriendsID.$loaded().then(function(){
        angular.forEach($scope.currentProfileFriendsID, function(value, key) {
            angular.forEach(obj, function(values, keys) {
                if(values.id == value.$value){
                    $scope.currentProfileFriends.push(values);
                }
            });
        });
   });

    $scope.switchUser = function(item){
        $cookies['angularUser'] = item;
        $scope.currentUserref.update({
            loggedIn : false
        });
        $scope.newUserref = ref.child(item);
        $scope.newUserref.update({
            loggedIn : true
        });
    };

    $scope.redirect = function(item) {
        setTimeout(function(){
            if(!$scope.$$phase) {
                $scope.$apply( function() {
                    var url = '/work/angular/#!users/' +item;
                    var urlfin = decodeURIComponent(url)
                    $window.location.href = url;
                });
            }
        }, 1000);
    };
    $scope.currentUserFriends = function(){
        var bool = false;
        angular.forEach($scope.currentProfileFriendsID, function(value, key){
            if(value.$value == $scope.currentUserId){
                bool = true;
            }
        });
        return bool;
    }
    $scope.postRights = function(){
        if($scope.currentUserFriends() || $scope.currentUser.id == $scope.currentProfilePublic.id){
            return true;
        } else {
            return false;
        }
    };
    $scope.friendRights = function(){
        if($scope.currentUserFriends()){
            return "1";
        } else if($scope.currentUser.id == $scope.currentProfilePublic.id){
            return "3"
        } else {
            return "2";
        }
    }


    $scope.addFriend = function(){
        $scope.currentProfileFriendsID.$add($scope.currentUser.id);
        $scope.currentUserContactsArray.$add($scope.currentProfilePublic.id);
    };
    $scope.removeFriend = function(){    
        var cur = null;
        var pur = null;
        angular.forEach($scope.currentUserContactsArray, function(value, key){
            if(value.$value == $scope.currentProfilePublic.id){
                cur = $scope.currentUserContactsArray.$getRecord(value.$id);
            }
        });
        angular.forEach($scope.currentProfileFriendsID, function(value, key){
            if(value.$value == $scope.currentUser.id){
                pur = $scope.currentProfileFriendsID.$getRecord(value.$id);
            }
        });
        $scope.currentUserContactsArray.$remove(cur);
        $scope.currentProfileFriendsID.$remove(pur);
    };

}]);

enterNewStatus = function(){
    document.getElementById("contact-info-status-new").classList.toggle('hidden');
    document.getElementById("status").classList.toggle('hidden');
}
enterNewPM = function(){
    document.getElementById("contact-info-PM-new").classList.toggle('hidden');
    document.getElementById("PM").classList.toggle('hidden');
}

showFriends = function(){
    $('#contactsToggle').slideToggle("400");
}
$(document).ready(function(){
    $('.modal-trigger').leanModal();
    $(".button-collapse").sideNav();
  });