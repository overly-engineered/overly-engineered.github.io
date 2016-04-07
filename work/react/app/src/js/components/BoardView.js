/** @jsx React.DOM */
'use strict';
var React = require('react'),
    BoardPost = require('./BoardPost')


var BoardView = React.createClass({

  handleBack: function(){
    this.props.viewMain();
  },

  render: function() {
    var boardPosts = this.props.boardPosts.map(function(item) {
      return <BoardPost date={item.date}
                        message={item.message}
                        poster={item.posterid}/>
    }.bind(this))
    return (
      <div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <div className="card">
            <div className="card-block">
              <a className="btn btn-warning" onClick={this.handleBack}>Main</a>
            </div>
            <div className="card-block">
              <div className="card-title">
                <h4>{this.props.BoardItem.title}</h4>
              </div>
            </div>
            <div className="board-imageholder">
              <img src={this.props.BoardItem.image} className="card-img-top board-image" alt={this.props.BoardItem.title} />
            </div>
            <div className="card-block">
              <p className="card-text">
                {this.props.BoardItem.description}
              </p>
            </div>
            <div className="card-block">
              <a className="btn btn-primary">View</a>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-8">
          {boardPosts}
        </div>
      </div>
    );
  }

});

module.exports = BoardView;
