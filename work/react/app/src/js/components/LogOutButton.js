/** @jsx React.DOM */
'use strict';
var React = require('react');

var LogOutButton = React.createClass({

  render: function() {
    return (
      <div>
        <button type="button" className="btn btn-success nav-item" data-toggle="modal" data-target="#LogInModal"  name="Log Out" onClick={this.props.onLogOut}>Logout</button>
      </div>
    );
  }

});

module.exports = LogOutButton;
