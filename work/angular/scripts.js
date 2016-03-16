/* use strict */
var mApp = angular.module('fBookApp', ['ngRoute', 'ngResource']);

mApp.factory('myService', function($http){
    return {
        getdata: function(callback){
            $http.get('data.json').success(callback);
        }
    }
});
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
mApp.controller('profileController', [ '$scope', '$filter', '$http', '$routeParams', 'myService', function ($scope, $filter, $http, $routeParams, myService) {
    var profile = this;
    profile.id = 0;
      profile.interArray = function(arrToGet){
          var arrToFill = [];
            angular.forEach(arrToGet, function (value, key) {
                this.push(value);
            }, arrToFill);
          return arrToFill;
        };
    profile.addPost = function () {
            var date = new Date();
            profile.postdate = date.toLocaleDateString();
            profile.posts.push({
                 posterId: profile.currentUser.name,
                 message: profile.postText,
                 date: profile.postdate,
                 posterImage: profile.currentUser.image
            });
            profile.postText = '';
      };
    profile.getFriends = function(arrToGet, arrToFilter){
        var arrToFill = [];
        angular.forEach(arrToGet, function (value, key) {
            var currentUserFriends = $filter('filter')(profile.users, { id: value })[0];
            this.push(currentUserFriends);
        }, arrToFill);
        return arrToFill;
    };
    profile.getPosts = function(arrToGet){
        var arrToFill = [];
        angular.forEach(arrToGet, function (value, key) {
            var id = value.posterId;
            var poster = $filter('filter')(profile.users, { id: id })[0];
            // value.posterId = poster.name;
            // value.posterImage = poster.image;
            arrToFill.push({
                posterId: poster.name,
                posterImage: poster.image,
                message: value.message,
                date: value.date
            })
        }, arrToFill); 
        return arrToFill;
    };
    
    if (typeof $routeParams.id == 'undefined'){
        console.log('not set');
        profile.id = "";
    }else {
        console.log('set');
        profile.id = $routeParams.id;
        console.log(profile.id);
    }
    
    myService.getdata(function(data){
        profile.userData = data;
        profile.users = profile.interArray(profile.userData.users);
        var currentUser = $filter('filter')(profile.users, { loggedIn: true })[0];
        profile.currentUser = currentUser;
        var currentProfileid = profile.id;
        var currentProfile = $filter('filter')(profile.users, { url: currentProfileid })[0];
        profile.currentProfile = currentProfile;     
        profile.currentProfileFriends = profile.getFriends(profile.currentProfile.contacts, profile.users);
        console.log(profile.currentProfile.posts);
        profile.posts = profile.getPosts(profile.currentProfile.posts);
        console.log(profile.posts);
        
    });

}]);