/** @jsx React.DOM */
'use strict';
var React = require('react');

var LogOutButton = React.createClass({

  render: function() {
    var style = {marginTop:'1em'};
    return (
      <div>
        <button type="button" className="btn btn-success nav-item" data-toggle="modal" data-target="#LogInModal"  name="Log Out" onClick={this.props.onLogOut} style={style}>Logout</button>
      </div>
    );
  }

});

module.exports = LogOutButton;
