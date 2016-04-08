/** @jsx React.DOM */
'use strict';
var React = require('react');


var NewPostForm = React.createClass({

  handleForm: function(e){
    e.preventDefault();
    var message = this.refs.PostMessage.getDOMNode().value;
    this.props.newPost(this.props.key, message);
  },

  render: function() {
    var html = '';
    var errorStyle = { textAlign: 'left', marginTop: '1em' };
    if(this.props.postError){
      html = <div className="alert alert-danger" role="alert" style={errorStyle}><strong>Call that a comment!?!?!</strong> Add some more and try again.</div>
    }

    return (
      <form ref="Login" className="m-b-1 postForm" onSubmit={this.handleForm}>
        <div className="input-group m-b-1">
          <span className="input-group-addon" id="PostMessage"><label htmlFor="postMessageid" className="m-b-0">Comment</label></span>
          <textarea type="text" id="postMessageid" ref="PostMessage" className="form-control" aria-describedby="PostMessage"></textarea>
        </div>
        <div className="input-group">
          <button type="submit" className="btn btn-primary">Comment</button>
        </div>
        <div>
          {html}
        </div>
      </form>
    );
  }

});

module.exports = NewPostForm;
