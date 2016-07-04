angular.module('starter.controllers', ['ionic', 'chart.js'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $window, $state, $ionicHistory) {
  $ionicHistory.nextViewOptions({
    disableBack: false,
    historyRoot: true
  });
  $scope.signInUser = function() {
    var pass = document.getElementById('pass').value;
    var email = document.getElementById('email').value;
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      $scope.error = true;
      $scope.errorMessage = errorCode + ' : ' + errorMessage;
      $scope.errorPopup();
    }).then( function() {
      $scope.closeLogin();
      var SuccessPopup = $ionicPopup.alert({
       title: 'Signed In',
       template: ''
      });
      $scope.loggedIn = true;
    });

  }
  $scope.registerUser = function() {
    var pass = document.getElementById('pass').value;
    var email = document.getElementById('email').value;
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      $scope.errorPopup();
    }).then( function() {
      $scope.closeLogin();
      $scope.updateUserModal();
    });
  }
  $scope.logout = function(){
    firebase.auth().signOut().then(function() {
      var SuccessPopup = $ionicPopup.alert({
       title: 'Successfully logged out',
       template: ''
      });
      $state.go("app.home");
    }, function(error) {
      $scope.errorPopup();
    });
  }
  $scope.updateUser = function(){
    var newname = document.getElementById('uname').value;
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: newname,
      photoURL: null
    }).then(function() {
      $scope.closeUserModal();
      $scope.name = newname;
      var SuccessPopup = $ionicPopup.alert({
       title: 'Name Updated',
       template: ''
     });
    }, function(error) {
      $scope.errorPopup();
    });
  }
  $ionicModal.fromTemplateUrl('templates/login.html', function(lgmodal) {
      $scope.loginModal = lgmodal;
    },
    {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }
  );
  $ionicModal.fromTemplateUrl('templates/createinfo.html', function(uimodal) {
      $scope.userModal = uimodal;
    },
    {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }
  );
  $ionicModal.fromTemplateUrl('templates/newspend.html', function(nsmodal) {
      $scope.newSpendModal = nsmodal;
    },
    {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }
  );
  $scope.$on('$destroy', function() {
    $scope.loginModal.remove();
  });
  $scope.$on('$destroy', function() {
    $scope.infoModal.remove();
  });
  $scope.login = function(){
    $scope.loginModal.show();
  }
  $scope.closeLogin = function(){
    $scope.loginModal.hide();
  }
  $scope.updateUserModal = function(){
    $scope.userModal.show();
  }
  $scope.closeUserModal = function(){
    $scope.userModal.hide();
  }
  $scope.newSpend = function(){
    $scope.newSpendModal.show();
  }
  $scope.closeNewSpend = function(){
    $scope.newSpendModal.hide();
  }
  $scope.errorPopup = function(){
    var errorPopup = $ionicPopup.alert({
     title: 'Oh no something went wrong',
     template: 'Try doing that again.'
   });
  }
  $scope.changeIncome = function(){
    var newIncome = document.getElementById('newIncomeValue').value;
    var usrdata = {
      income: parseInt(newIncome),
      outgoings: $scope.outgoings
    };
    firebase.database().ref($scope.uid).update(usrdata);
    $state.go("app.home");
  }
  $scope.AddNewSpend = function(){
    var newKey = firebase.database().ref($scope.uid + '/outgoings').push().key;
    var cost = document.getElementById('newSpendCost').value;
    var cat = document.getElementById('newSpendCatagorie').value;
    var dates = document.getElementById('newSpendDate').value;
    var notes = document.getElementById('newSpendNote').value;
    firebase.database().ref($scope.uid + '/outgoings/' + newKey).set({
      cost: parseInt(cost),
      name: cat,
      date: dates,
      note: notes
    });
    $scope.closeNewSpend();
  }
  $scope.deleteSpend = function(key){
    console.log(key);
    firebase.database().ref($scope.uid + '/outgoings/' + key).remove();
  }
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in
      $scope.loggedIn = true;
      var user = firebase.auth().currentUser;
      if (user != null) {
        $scope.providerId = user.providerId
        $scope.uid = user.uid
        $scope.displayName = user.displayName
        $scope.email = user.email
        $scope.photoURL = user.photoURL
        $scope.income = 0;
        $scope.outgoings = 0;
        $scope.totalOutgoings = 0;
        if(user.displayName == null){
          $scope.displayName = "anon";
        }
        var ledgerSnapshot = firebase.database().ref($scope.uid);
        var income = firebase.database().ref($scope.uid + '/income').on('value', function(snapshot) {
          $scope.income = parseInt(snapshot.val());
          var outgoings = firebase.database().ref($scope.uid + '/outgoings').orderByChild('date').on('value', function(snapshot) {
            $scope.outgoings = snapshot.val();

            for (var key in $scope.outgoings) {
                if (!$scope.outgoings.hasOwnProperty(key)) continue;

                var obj = $scope.outgoings[key];
                $scope.outgoings[key].uid = key;
                $scope.totalOutgoings += parseInt(obj.cost);
            }
            $scope.remainder = parseInt($scope.income) - parseInt($scope.totalOutgoings);
            //$scope.$apply();
            $scope.pieremaining = $scope.income - $scope.totalOutgoings;
            $scope.piedata = [$scope.pieremaining, $scope.totalOutgoings];
            $scope.pielabels = ['Remaining', 'Outgoings'];
          });
        });
      }
    } else {
      $scope.loggedIn = false;
    }
  });

});
