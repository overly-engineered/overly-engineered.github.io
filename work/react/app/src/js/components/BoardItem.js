/** @jsx React.DOM */
'use strict';
var React = require('react');


var BoardItem = React.createClass({

  render: function() {
    return (
      <li key={this.props.key} className="col-xs-12 col-sm-6 col-md-4">
        <div className="card">
          <div className="card-block">
            <div className="card-title">
              <h4>{this.props.title}</h4>
            </div>
          </div>
          <img src={this.props.image} className="card-img-top" alt="" />
          <div className="card-block">
            <p className="card-text">
              {this.props.desc}
            </p>
          </div>
          <div className="card-block">
            <a href="#" className="btn btn-primary">Button</a>
          </div>
        </div>
      </li>
    );
  }

});

module.exports = BoardItem;
