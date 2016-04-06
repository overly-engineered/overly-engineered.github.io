/** @jsx React.DOM */
'use strict';
var React = require('react'),
    SignUpForm = require('./SignUpForm');

var SignUpButton = React.createClass({

  render: function() {
    return (
      <div>
        <button type="button" className="btn btn-primary nav-item" data-toggle="modal" data-target="#SignUpModal" name="Sign up">Sign up</button>
        <SignUpForm onNewUser={this.props.onNewUser}/>
      </div>
    );
  }

});

module.exports = SignUpButton;
