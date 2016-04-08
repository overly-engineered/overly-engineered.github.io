/** @jsx React.DOM */
'use strict';
var React = require('react'),
    BoardsList = require('./BoardsList'),
    BoardView = require('./BoardView');


var MainSection = React.createClass({

  render: function() {

    var html = '';

    if(this.props.view == 'main'){
      html = <BoardsList Boarditems={this.props.Boarditems} viewBoard={this.props.viewBoard}/>
    }else{
      html = <BoardView BoardItem={this.props.boardData}
                        boardPosts={this.props.boardPostData}
                        viewMain={this.props.viewMain}
                        newPost={this.props.newPost}
                        loggedIn={this.props.loggedIn}
                        postError={this.props.postError}
                        username={this.props.username}
                        deletePost={this.props.deletePost}/>
    }
    return (
      <ul className="list-group">
        {html}
      </ul>
    );
  }

});

module.exports = MainSection;
