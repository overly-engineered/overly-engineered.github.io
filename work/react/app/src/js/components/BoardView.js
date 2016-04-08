/** @jsx React.DOM */
'use strict';
var React = require('react'),
    BoardPost = require('./BoardPost'),
    NewPostForm = require('./NewPostForm');


var BoardView = React.createClass({

  handleBack: function(){
    this.props.viewMain();
  },

  deletePost:function(key){
    this.props.deletePost(key, this.props.BoardItem.name)
  },
  render: function() {
    var boardPosts = this.props.boardPosts.map(function(item) {
      return <BoardPost key={item.name}
                        date={item.date}
                        message={item.message}
                        poster={item.posterid}
                        username={this.props.username}
                        deletePost={this.deletePost}/>
    }.bind(this));
    var newPost;
    if(this.props.loggedIn) {
      newPost = <NewPostForm key={this.props.BoardItem.name} newPost={this.props.newPost} postError={this.props.postError}/>
    }
    return (
      <div key={this.props.BoardItem.name}>
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
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-8">
          {newPost}
          {boardPosts}
        </div>
      </div>
    );
  }

});

module.exports = BoardView;
