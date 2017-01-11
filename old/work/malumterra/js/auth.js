var display = require('./display.js');
var engine = require('./engine.js');
var firebase = require('firebase/app');
require('firebase/auth');
var config = {
apiKey: "AIzaSyBRaAZBvW0yWHliFsqmLnF2vIB_gdnUIo0",
authDomain: "malum-terrra.firebaseapp.com",
databaseURL: "https://malum-terrra.firebaseio.com",
storageBucket: "",
};
//firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
		display.init(true);
    engine.start();
  } else {
		display.init(false);
  }
});

function signup(){
	var email = document.getElementById('emailField').value;
	var pass = document.getElementById('passwordField').value;
	firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
		if(errorCode.indexOf('email-already-in-use') > -1){
			document.getElementById('errorMessage').innerHTML = 'Try signing in';
		} else if(errorCode.indexOf('invalid-email') > -1){
			document.getElementById('errorMessage').innerHTML = 'Invalid Email';
		} else if(errorCode.indexOf('operation-not-allowed') > -1){
			document.getElementById('errorMessage').innerHTML = 'Not allowed';
		} else if(errorCode.indexOf('weak-password') > -1){
			document.getElementById('errorMessage').innerHTML = 'Try a stronger password';
		}
	});
}

function login(){
	var email = document.getElementById('emailField').value;
	var pass = document.getElementById('passwordField').value;
	firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		if(errorCode.indexOf('invalid-email') > -1){
			document.getElementById('errorMessage').innerHTML = 'Invalid Email';
		} else if(errorCode.indexOf('user-not-found') > -1){
			document.getElementById('errorMessage').innerHTML = 'You need to sign up first';
		} else if(errorCode.indexOf('user-disabled') > -1){
			document.getElementById('errorMessage').innerHTML = 'Your account has been disabled';
		} else if(errorCode.indexOf('wrong-password') > -1){
			document.getElementById('errorMessage').innerHTML = 'Incorrect password';
		}
		setTimeout(function(){
			document.getElementById('errorMessage').innerHTML = '';
		}, 5000);
	});
}

function signout(){
	firebase.auth().signOut().then(function() {
		document.getElementById('errorMessage').innerHTML = 'Signed Out';
		display.init(false);
		setTimeout(function(){
			document.getElementById('errorMessage').innerHTML = '';
		}, 5000);
	}, function(error) {
	  document.getElementById('errorMessage').innerHTML = 'Error try again later';
		setTimeout(function(){
			document.getElementById('errorMessage').innerHTML = '';
		}, 5000);
	});
}

module.exports = {
	login : login,
	signup : signup,
	signout : signout
};
