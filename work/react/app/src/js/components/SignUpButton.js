/** @jsx React.DOM */
'use strict';
var React = require('react');


var SignUpButton = React.createClass({

  render: function() {
    return (
      <button type="button" className="btn btn-success nav-item" name="Log in">Login</button>
    );
  }

});

module.exports = SignUpButton;
