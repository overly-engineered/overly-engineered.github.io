/** @jsx React.DOM */
'use strict';
var React = require('react'),
    LogInForm = require('./LogInForm');

var LogInButton = React.createClass({

  render: function() {
    return (
      <div>
        <button type="button" className="btn btn-success nav-item" data-toggle="modal" data-target="#LogInModal"  name="Log in">Login</button>
        <LogInForm  onLogin={this.props.onLogin}/>
      </div>
    );
  }

});

module.exports = LogInButton;
