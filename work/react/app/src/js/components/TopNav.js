/** @jsx React.DOM */
'use strict';
var React = require('react'),
    LogInButton = require('./LogInButton'),
    SignUpButton = require('./SignUpButton'),
    UsernameLabel = require('./UsernameLabel'),
    LogOutButton = require('./LogOutButton');


var BoardList = React.createClass({

  render: function() {
    var loginSignIn;
    if(!this.props.loggedIn){
      loginSignIn = <div><SignUpButton onNewUser={this.props.onNewUser}/><LogInButton onLogin={this.props.onLogin}/></div>;
    }else{
      loginSignIn = <div><UsernameLabel username={this.props.username}/><LogOutButton onLogOut={this.props.onLogOut}/></div>;
    }

    return (
      <ul className="nav nav-pills p-a-1">
        {loginSignIn}
      </ul>
    );
  }

});

module.exports = BoardList;
