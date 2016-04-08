/** @jsx React.DOM */
'use strict';
var React = require('react');


var BoardPost = React.createClass({

  handleDelete: function(){
    this.props.deletePost(this.props.key)
  },


  render: function() {
    var html;
    if(this.props.poster == this.props.username){
      html = <a className="btn btn-primary" onClick={this.handleDelete}>Delete Post</a>;
    }
    return (
        <div key={this.props.key} className="card">
          <div className="card-block p-b-0">
            <div className="card-title">
              <h5 className="m-b-0"><u>{this.props.poster}</u></h5>
            </div>
          </div>
          <div className="card-block p-t-0">
            <p className="card-text">
              {this.props.date.toLocaleString()}
            </p>
            <p className="card-text">
              {this.props.message}
            </p>
          </div>
          <div className="card-block">
            {html}
          </div>
        </div>
    );
  }

});

module.exports = BoardPost;
