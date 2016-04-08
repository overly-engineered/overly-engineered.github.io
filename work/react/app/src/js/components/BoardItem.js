/** @jsx React.DOM */
'use strict';
var React = require('react');


var BoardItem = React.createClass({

  handleBoard: function(){
    this.props.viewBoard(this.props.key);
  },

  render: function() {
    return (
      <li key={this.props.key} className="col-xs-12 col-sm-6 col-md-4 mainView">
        <div className="card" onClick={this.handleBoard}>
          <div className="card-block">
            <div className="card-title">
              <h4>{this.props.title}</h4>
            </div>
          </div>
          <div className="board-imageholder">
            <img src={this.props.image} className="card-img-top board-image" alt={this.props.title} />
          </div>
          <div className="card-block">
            <p className="card-text">
              {this.props.desc}
            </p>
          </div>
          <div className="card-block">
            <a className="btn btn-primary">View</a>
          </div>
        </div>
      </li>
    );
  }

});

module.exports = BoardItem;
