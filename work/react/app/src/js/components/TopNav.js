/** @jsx React.DOM */
'use strict';
var React = require('react'),
    LogInButton = require('./LogInButton'),
    SignUpButton = require('./SignUpButton'),
    UsernameLabel = require('./UsernameLabel');


var BoardList = React.createClass({

  render: function() {
    var loggedIn = this.props.loggedIn ? 'block' : 'none';
    var loggedOut = !this.props.loggedIn ? 'block' : 'none';
    var usernameDisplay = {
      display : loggedIn
    };
    var loggedOutDisplay = {
      display : loggedOut
    }
    return (
      <ul className="nav nav-pills p-a-1">
        <SignUpButton display={loggedOutDisplay}/>
        <LogInButton display={loggedOutDisplay}/>
        <UsernameLabel username={this.props.username} display={usernameDisplay}/>
      </ul>
    );
  }

});

module.exports = BoardList;
