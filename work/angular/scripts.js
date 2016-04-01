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
function escapeRegExp(string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
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
    $scope.currentUserId = null;
    $scope.currentProfileId = null;
    var userArray = $firebaseArray(ref);
    obj.$loaded().then(function(){
        angular.forEach(userArray, function(value, key){
            if(key == cookie){
                $scope.currentUserId = value.$id;
            }
            if(key == $scope.id){
                $scope.currentProfileId = value.$id;
            }
        });
        $scope.currentUserref = ref.child($scope.currentUserId);
        $scope.currentUser = $firebaseObject(ref.child($scope.currentUserId));
        $scope.currentUserContactsArray = $firebaseArray(ref.child($scope.currentUserId).child('contacts'));
        $scope.currentProfilePublic = $firebaseObject(ref.child($scope.currentProfileId));
        $scope.currentProfile = $firebaseArray(ref.child($scope.currentProfileId));
        $scope.currentProfileFriendsID = $firebaseArray(ref.child($scope.currentProfileId).child('contacts'));
        $scope.currentProfilePosts = $firebaseArray(ref.child($scope.currentProfileId).child('posts'));
        $scope.currentProfileFriends = [];

        $scope.currentProfileFriendsID.$loaded().then(function(){
            angular.forEach($scope.currentProfileFriendsID, function(value, key) {
                angular.forEach(obj, function(values, keys) {
                    if(values.id == value.$value){
                        $scope.currentProfileFriends.push(values);
                    }
                });
            });
        });

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


        $scope.switchUser = function(item){
            $cookies['angularUser'] = item;
            $scope.currentUserref.update({
                loggedIn : false
            });
            $scope.newUserrefitem = null;
            angular.forEach(userArray, function(value, key){
                if(key == item){
                    $scope.newUserrefitem = value.$id;
                }
            });
            $scope.newUserref = ref.child($scope.newUserrefitem);
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
            angular.forEach($scope.currentUserContactsArray, function(value, key){
                debugger;
                if(value.$value == $scope.id){
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

        $scope.addUser = function(){
            debugger;
            var birthdate = new Date($scope.addUserDOB).toLocaleDateString('en-GB');
            var usernumber = 0;
            angular.forEach($scope.users, function(value, key){
                usernumber++;
            });
            var joindate = new Date().toLocaleDateString('en-GB');
            $scope.users.$add({
                name: $scope.addUserName,
                DOB : birthdate,
                PM : $scope.addUserPM,
                loggedIn: 'false',
                image: 'https://cdn2.iconfinder.com/data/icons/website-icons/512/User_Avatar-512.png',
                Status: 'I am ' + $scope.addUserName + '',
                id : usernumber,
                contacts : ['0'],
                posts : [{"date" : joindate,
                        "message" : "My First Post.",
                        "posterName" : $scope.addUserName}],
                url: usernumber
            });
            $scope.myContacts = $firebaseArray(ref.child($scope.currentUserId).child('contacts'));
            $scope.myContacts.$add(usernumber);
        };

        $scope.userSearch = '';
        $scope.$watch('userSearch', function (value){
            regex = new RegExp('\\b' + escapeRegExp(value), 'i');
        });

        $scope.filterBySearch = function(user) {
            if(!$scope.userSearch) return true;
            return regex.test(user.name)
        }

    });

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