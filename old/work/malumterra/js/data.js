var display = require('./display.js');
var auth = require('./auth.js');
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

// Get a reference to the database service
var database = firebase.database();

function returnUser(){
  return firebase.auth().currentUser;
}

function returnUserDisplayName() {
  var user = returnUser();
  if(user != null){
    return user.displayName;
  }
}

function returnUserUID() {
  var user = returnUser();
  if(user != null){
    return user.uid;
  }
}

function currentPage() {
  var uid = returnUserUID();
  if(uid != null){
    firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
      if(snapshot.val().level == 0 || snapshot.val().purity == 0){
        getText(snapshot, 0);
      } else if(snapshot.val().purity > 0){
        getText(snapshot, 1);
      } else if(snapshot.val().purity < 0){
        getText(snapshot, 2);
      }
    });
  }
}

function getText(snapshot, val) {
  firebase.database().ref('/levels/' + snapshot.val().level).once('value').then(function(snapshot) {
    display.addContent(snapshot.val().text[val]);
    currentResponses();
  });
}

function currentResponses() {
  var uid = returnUserUID();
  if(uid != null){
    firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
      if(snapshot.val().level == 0 || snapshot.val().purity == 0){
        getAnswers(snapshot, 0);
      } else if(snapshot.val().purity > 0){
        getAnswers(snapshot, 1);
      } else if(snapshot.val().purity < 0){
        getAnswers(snapshot, 2);
      }
    });
  }
}

function getAnswers(snapshot, val) {
  firebase.database().ref('/levels/' + snapshot.val().level).once('value').then(function(snapshot) {
    display.addChoices(snapshot.val().ans);
  });
}

function createUserName(){
  var user = returnUser();
  var newUserName = document.getElementById('newUserName').value;
  if(newUserName != ''){
    user.updateProfile({
      displayName : newUserName
    }).then(function(){
      initUser();
      display.newUser(false);
    }, function(error) {
      console.log(error);
    });
  } else {
    alert('Enter a name');
  }

}

function initUser() {
  var uid = returnUserUID();
  firebase.database().ref('users/' + uid).set({
    level: 0,
    health: 100,
    purity: 0,
    coin: 50.00
  });
  displayStatsData();
}

function displayStatsData() {
  var uid = returnUserUID();
  firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
    display.setStats(snapshot);
  });
}

function responseID(response){
  var uid = returnUserUID();
  firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
    var level = snapshot.val().level;
    var beforeCoin = snapshot.val().coin;
    var beforeHealth = snapshot.val().health;
    var beforePurity = snapshot.val().purity;
    firebase.database().ref('/levels/' + level + '/ans/' + response).once('value').then(function(snapshot) {
      level += 1;
      var coin = snapshot.val().coin;
      beforeCoin += coin;
      var health = snapshot.val().health;
      beforeHealth += health;
      var purity = snapshot.val().purity;
      beforePurity += purity;
      firebase.database().ref('/users/' + uid).update({
        level : level,
        coin : beforeCoin,
        health : beforeHealth,
        purity : beforePurity
      }).then(function(){
        location.reload();
      });
    });
  });
}

module.exports = {
	returnUser : returnUser,
  returnUserDisplayName : returnUserDisplayName,
  createUserName : createUserName,
  displayStatsData : displayStatsData,
  currentPage : currentPage,
  currentResponses : currentResponses,
  inputResponse : responseID
};
