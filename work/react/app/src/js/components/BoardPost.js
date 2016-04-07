/** @jsx React.DOM */
'use strict';
var React = require('react');


var BoardPost = React.createClass({

  render: function() {
    return (
        <div key={this.props.key} className="card">
          <div className="card-block">
            <div className="card-title">
              <h4>{this.props.postedid}</h4>
            </div>
          </div>
          <div className="card-block">
            <p className="card-text">
              {this.props.date}
            </p>
            <p className="card-text">
              {this.props.message}
            </p>
          </div>
        </div>
    );
  }

});

module.exports = BoardPost;
