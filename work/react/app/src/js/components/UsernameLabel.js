/** @jsx React.DOM */
'use strict';
var React = require('react');


var UsernameLabel = React.createClass({

  render: function() {
    var badgeStyle;

    if(this.props.postAmount >= 10) {
      badgeStyle = { backgroundColor: '#4AAF46'}
    } else if(this.props.postAmount >= 5){
      badgeStyle = { backgroundColor: '#48B2D8'}
    } else if(this.props.postAmount > 0){
      badgeStyle = { backgroundColor: '#0275d8'}
    } else {
      badgeStyle = { backgroundColor: '#D03B3B'}
    }
    return (
      <div><span className="username">{this.props.username}</span><span className="label label-pill label-primary" style={badgeStyle}>Posts: {this.props.postAmount}</span></div>
    );
  }

});

module.exports = UsernameLabel;
