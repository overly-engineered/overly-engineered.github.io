/** @jsx React.DOM */
'use strict';
var React = require('react');


var LogInButton = React.createClass({

  render: function() {
    return (
      <button type="button" className="btn btn-primary nav-item" name="Sign up" style={this.props.display}>Sign up</button>
    );
  }

});

module.exports = LogInButton;
