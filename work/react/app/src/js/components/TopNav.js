/** @jsx React.DOM */
'use strict';
var React = require('react'),
    LogInButton = require('./LogInButton'),
    SignUpButton = require('./SignUpButton'),
    UsernameLabel = require('./UsernameLabel'),
    LogOutButton = require('./LogOutButton'),
    NewBoardButton = require('./NewBoardButton');


var BoardList = React.createClass({

  render: function() {
    var loginSignIn;
    if(!this.props.loggedIn){
      loginSignIn = <div><SignUpButton onNewUser={this.props.onNewUser}/><LogInButton onLogin={this.props.onLogin} LogInError={this.props.LogInError}/></div>;
    }else{
      loginSignIn = <div>
      <UsernameLabel username={this.props.username} postAmount={this.props.postAmount}/>
      <LogOutButton onLogOut={this.props.onLogOut}/>
      <NewBoardButton onAddBoard={this.props.onAddBoard}
                      BoardCreateError={this.props.BoardCreateError}
                      validateForm={this.props.validateForm}
                      BoardCreateError={this.props.BoardCreateError}/></div>;
    }

    return (
      <ul className="nav nav-pills p-a-1">
        {loginSignIn}
      </ul>
    );
  }

});

module.exports = BoardList;
