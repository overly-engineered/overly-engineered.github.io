/** @jsx React.DOM */
'use strict';
var React = require('react');


var UsernameLabel = React.createClass({

  render: function() {
    return (
      <p className="username">{this.props.username}</p>
    );
  }

});

module.exports = UsernameLabel;
