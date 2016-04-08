/** @jsx React.DOM */
'use strict';
var React = require('react');
var MainSection = require('./MainSection');
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
        Boarditems: items
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
        var userURL = USERS_LOCATION + '/' + username.toString(CryptoJS.enc.Utf8);
        var usersRef = new Firebase(userURL);
        usersRef.once('value', function(snapshot){
          var Val = snapshot.val();
          if(Val.loggedIn == "true"){
            this.setState({
              loggedIn:true,
              username: Val.username,
              userKey: snapshot.key(),
              postAmount: Val.posts
            });
          }
        }.bind(this));
      }
    }.bind(this));
  },

  viewing: function(){
    if(document.cookie.indexOf("boardsView") >= 0 ){
      var enc = new Firebase(ENC_LOCATION);
      var passphrase;
      enc.once('value', function(snapshot){
        passphrase = snapshot.val();
        var boardsView = document.cookie.replace(/(?:(?:^|.*;\s*)boardsView\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var boardViewingKey = CryptoJS.AES.decrypt(boardsView, passphrase);
        this.setState({
          boardKey: boardViewingKey.toString(CryptoJS.enc.Utf8)
        })
        this.viewBoard(boardViewingKey.toString(CryptoJS.enc.Utf8));
      }.bind(this));
    }
  },

  componentDidMount: function(){
    this.loadData();
    this.login();
    this.viewing();
  },

  getInitialState: function(){
    return {
      Boarditems: [],
      username:'',
      loggedIn :false,
      LogInError: false,
      BoardCreateError: false,
      view: 'main',
      boardData: null,
      userKey: '',
      postError : false
    }
  },

  validateForm: function(fields){
    var Anyerrors = true;
    for(var propertyName in fields){
      if(fields[propertyName].length < 3){
        Anyerrors = false;
      }
    }
    return Anyerrors;
  },

  addUser : function(newUser) {
    if(this.validateForm(newUser)){
      var ref = new Firebase(USERS_LOCATION);
      var newUserref = ref.push(newUser);
      var enc = new Firebase(ENC_LOCATION);
      var passphrase;
      var expires = new Date();
      expires.setDate(expires.getDate() + 2);
      enc.once('value', function(snapshot){
        passphrase = snapshot.val();
        document.cookie="boardsUsername="+CryptoJS.AES.encrypt(newUser.username, passphrase)+"; expires="+expires+"";
        newUserref.update({loggedIn : 'true'}, function(){
          location.reload();
        });
      });
    } else {
      this.setState({
        SignUpError:true
      });
    }
  },

  checkIfUserExists: function(newUser) {
    var usersRef = new Firebase(USERS_LOCATION);
    var addUserBool = false;
    usersRef.once('value', function(snapshot) {
      var exists;
      snapshot.forEach(function(childSnapshot) {
        var value = childSnapshot.val();
        if(value.username !== newUser.username){
          addUserBool = true;
        } else {
          this.setState({
            SignUpError: true
          })
        }
      }.bind(this));
      if(addUserBool == true){
        this.addUser(newUser);
      }
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
            $('#LogInModal').modal('toggle');
            document.cookie="boardsUsername="+CryptoJS.AES.encrypt(key, passphrase)+"; expires="+expires+"";
            var userRef = new Firebase('https://pettmanioreactjs.firebaseio.com/users/'+key);
            userRef.update({loggedIn : 'true'}, function(){
              location.reload();
            });
          } else {
            this.setState({
              LogInError:true
            });
          }
        } else {
          this.setState({
            LogInError:true
          });
        }
      }.bind(this));
    }.bind(this));
  },

  onLogOut: function(){
    document.cookie = 'boardsUsername=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    var username = this.state.username;
    var userURL = 'https://pettmanioreactjs.firebaseio.com/users/'+this.state.userKey;
    var usersRef = new Firebase(userURL);
    usersRef.update({loggedIn : 'false'}, function(){
      location.reload();
    });
  },

  onAddBoard: function(form){
    if(this.validateForm(form)){
      var boardsRef = new Firebase(BOARDS_LOCATION);
      boardsRef.push(form, function(){
        $('#NewBoardModal').modal('hide');
      });
    } else {
      this.setState({
        BoardCreateError:true
      });
    }
  },

  viewBoard: function(key){
    var boardURL = BOARDS_LOCATION + "/" + key;
    var boardRef = new Firebase(boardURL);
    var BoardData = [];
    var boardPostURL = BOARDS_LOCATION + "/" + key + "/posts";
    var boardPostRef = new Firebase(boardPostURL);
    boardRef.on('value' ,function(snapshot){
      BoardData = snapshot.val();
      BoardData.name = snapshot.key();
      var BoardPostData = [];
      var SortedPostData = [];
      boardPostRef.on('value' ,function(childsnapshot){
        childsnapshot.forEach(function(itemSnap){
          var item = itemSnap.val();
          item.name = itemSnap.key();
          BoardPostData.push(item);
        });
        SortedPostData = _.sortBy(BoardPostData, function(item){
          item.date = new Date(item.date);
          return -item.date
        });
        this.setState({
          view:'board',
          boardData : BoardData,
          boardPostData : SortedPostData,
          boardKey : key
        });
        var enc = new Firebase(ENC_LOCATION);
        var passphrase;
        var expires = new Date();
        expires.setDate(expires.getDate() + 2);
        enc.once('value', function(snapshot){
          passphrase = snapshot.val();
          document.cookie="boardsView="+CryptoJS.AES.encrypt(key, passphrase)+"; expires="+expires+"";
        });
      }.bind(this));
    }.bind(this));

  },
  viewMain: function(){
    document.cookie = 'boardsView=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.setState({
      view:'main',
      boardData: '',
      boardPostData: '',
      boardkey: ''
    });
  },
  newPost:function(boardkey,newMessage){
    if(newMessage.length > 10){
      var boardPostURL = BOARDS_LOCATION + "/" + boardkey + "/posts";
      var newPostref = new Firebase(boardPostURL);
      var postDate = new Date().toString();
      var newPost = {
        message: newMessage,
        date: postDate,
        posterid: this.state.username
      };
      newPostref.push(newPost);
      var userURL = USERS_LOCATION + "/" + this.state.userKey;
      var userRef = new Firebase(userURL);
      var userPosts;
      userRef.once('value', function(snapshot){
        var user = snapshot.val();
        userPosts = user.posts;
        userPosts++;
        userRef.update({posts : userPosts});
        this.setState({
          postAmount: userPosts,
          postError: false
        });
      }.bind(this));
    } else {
      this.setState({
        postError: true
      });
    }
  },
  deletePost:function(postID, key){
    var postURL = BOARDS_LOCATION + "/" + key + "/posts/" + postID;
    var RemovePost = new Firebase(postURL);
    RemovePost.remove();
    var userURL = USERS_LOCATION + "/" + this.state.userKey;
    var userRef = new Firebase(userURL);
    var userPosts;
    userRef.once('value', function(snapshot){
      var user = snapshot.val();
      userPosts = user.posts;
      userPosts--;
      userRef.update({posts : userPosts});
      this.setState({
        postAmount: userPosts,
        postError: false
      });
      console.log(key);
      this.viewBoard(key);
    }.bind(this));
  },
  render: function() {
    return (
      <div className="container-fluid">
        <TopNav username={this.state.username}
                loggedIn={this.state.loggedIn}
                onNewUser={this.onNewUser}
                onLogin={this.userLogin}
                onLogOut={this.onLogOut}
                onAddBoard={this.onAddBoard}
                LogInError={this.state.LogInError}
                SignUpError={this.state.SignUpError}
                BoardCreateError={this.state.BoardCreateError}
                validateForm={this.validateForm}
                BoardCreateError={this.state.BoardCreateError}
                postAmount={this.state.postAmount}/>
        <MainSection Boarditems={this.state.Boarditems}
                     view={this.state.view}
                     viewBoard={this.viewBoard}
                     boardData={this.state.boardData}
                     boardPostData={this.state.boardPostData}
                     viewMain={this.viewMain}
                     newPost={this.newPost}
                     username={this.state.username}
                     postError={this.state.postError}
                     loggedIn={this.state.loggedIn}
                     deletePost={this.deletePost}/>
      </div>
    );
  }

});
module.exports = Boards;
