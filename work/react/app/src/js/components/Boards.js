/** @jsx React.DOM */
'use strict';
var React = require('react');
var BoardsList = require('./BoardsList');
var TopNav = require('./TopNav');
var Firebase = require('firebase');
var USERS_LOCATION = 'https://pettmanioreactjs.firebaseio.com/users';
var BOARDS_LOCATION = 'https://pettmanioreactjs.firebaseio.com/boards';
var ENC_LOCATION = 'https://pettmanioreactjs.firebaseio.com/encrypt';




var Boards = React.createClass({

  loadData: function(){
    var ref = new Firebase(BOARDS_LOCATION);
    ref.on('value' ,function(snapshot){
      var items = [];
      snapshot.forEach(function(itemSnap){
        var item = itemSnap.val();
        item.name = itemSnap.key();
        items.push(item);
      });
      this.setState({
        items: items
      });
    }.bind(this));
  },

  login: function(){
    var enc = new Firebase(ENC_LOCATION);
    var passphrase;
    var loggedIn;
    enc.once('value', function(snapshot){
      passphrase = snapshot.val();
      if(document.cookie.indexOf('boardsUsername') >= 0){
        var usernameEncrypted = document.cookie.replace(/(?:(?:^|.*;\s*)boardsUsername\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var username = CryptoJS.AES.decrypt(usernameEncrypted, passphrase);
        var usersRef = new Firebase(USERS_LOCATION);
        usersRef.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key();
            var userRef = new Firebase('https://pettmanioreactjs.firebaseio.com/users/'+key);
            userRef.once('value', function(userSnapshot){
              var Val = userSnapshot.val();
              if(Val.loggedIn == "true"){
                loggedIn = true;
                if(loggedIn){
                  this.setState({
                    loggedIn:true
                  });
                }
              }
            }.bind(this));
          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  },

  componentDidMount: function(){
    this.loadData();
    this.login();
  },

  getInitialState: function(){
    return {
      items: [],
      username:'BOB',
      loggedIn :false
    }
  },
  addUser : function(newUser) {
        var ref = new Firebase(USERS_LOCATION);
        ref.push(newUser);
        location.reload();
    },
  checkIfUserExists: function(newUser) {
    var usersRef = new Firebase(USERS_LOCATION);
    usersRef.once('value', function(snapshot) {
      var exists;
      snapshot.forEach(function(childSnapshot) {
        var value = childSnapshot.val();
        if(value.username !== newUser.username){
          this.addUser(newUser);
        } else {
          alert('Username: ' + newUser.username + 'is already taken. \nPlease pick a different Username');
        }
      }.bind(this));

    }.bind(this));

  },

  onNewUser: function(newUser) {
    this.checkIfUserExists(newUser);
  },

  userLogin: function(LoginUser){
    var expires = new Date();
    expires.setDate(expires.getDate() + 2);
    var usersRef = new Firebase(USERS_LOCATION);
    var enc = new Firebase(ENC_LOCATION);
    var passphrase;
    enc.once('value', function(snapshot){
      passphrase = snapshot.val();
    });
    usersRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var value = childSnapshot.val();
        var key = childSnapshot.key();
        if(LoginUser.username === value.username){
          if(LoginUser.password === value.pass){
            document.cookie="boardsUsername="+CryptoJS.AES.encrypt('LoginUser.username', passphrase)+"; expires="+expires+"";
            var userRef = new Firebase('https://pettmanioreactjs.firebaseio.com/users/'+key);
            userRef.update({loggedIn : 'true'});
          } else {
            alert('Incorrect Password');
          }
        } else {
          alert('Username not found');
        }
      });
    });
  },
  onLogOut: function(){
    alert('logout');
  },
  render: function() {
    return (
      <div className="container-fluid">
        <TopNav username={this.state.username} loggedIn={this.state.loggedIn} onNewUser={this.onNewUser} onLogin={this.userLogin} onLogOut={this.onLogOut}/>
        <BoardsList items={this.state.items}/>
      </div>
    );
  }

});
module.exports = Boards;
