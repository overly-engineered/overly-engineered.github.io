'use strict';
var firebase = require("firebase/app");
  require("firebase/auth");
  require("firebase/database");
var config = {
  apiKey: "AIzaSyBRaAZBvW0yWHliFsqmLnF2vIB_gdnUIo0",
  authDomain: "malum-terrra.firebaseapp.com",
  databaseURL: "https://malum-terrra.firebaseio.com",
  storageBucket: "",
};
firebase.initializeApp(config);
var auth = require('./auth.js');
var display = require('./display.js');
var engine = require('./engine.js');
var data = require('./data.js');
//var typist = require('./typist.js');
var state = {};

window.onload = function() {
  setListeners();
}

function setListeners(){
  document.getElementById('loginbutton').addEventListener("click", function(){
    auth.login();
  }, false);
  document.getElementById('signupbutton').addEventListener("click", function(){
    auth.signup();
  }, false);
  document.getElementById('signout').addEventListener("click", function(){
    auth.signout();
  }, false);
  document.getElementById('newUserbutton').addEventListener("click", function(){
    data.createUserName();
  }, false);
}
