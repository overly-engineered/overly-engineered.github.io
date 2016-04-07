/** @jsx React.DOM */
'use strict';
var React = require('react');

var LogInForm = React.createClass({

  handleForm: function(e){
    e.preventDefault();
    var BoardDetails = {
      title : this.refs.BoardName.getDOMNode().value,
      description : this.refs.Description.getDOMNode().value,
      image : this.refs.Image.getDOMNode().value
    };
      this.refs.Login.getDOMNode().reset();
      this.props.onAddBoard(BoardDetails);
  },

  render: function() {
    var BoardCreatorError;
    var errorStyle = { textAlign: 'left', marginTop: '1em' }
    if(this.props.BoardCreateError) {
      BoardCreatorError = <div className="alert alert-danger" role="alert" style={errorStyle}><strong>Oh snap!</strong> Change a few things up and try making a new board again.</div>
    } else {
      BoardCreatorError = '';
    };

    return (
      <div className="modal fade" id="NewBoardModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
              <h4 className="modal-title" id="myModalLabel">Login</h4>
            </div>
            <form ref="Login"  onSubmit={this.handleForm}>
                <div className="modal-body">
                  <div className="input-group">
                    <span className="input-group-addon" id="BoardName">Board Name</span>
                    <input type="text" ref="BoardName" className="form-control" aria-describedby="BoardName"/>
                  </div>
                  <br />
                  <div className="input-group">
                    <span className="input-group-addon" id="DescriptionLabel">Description</span>
                    <textarea type="text" ref="Description" className="form-control" id="Description" aria-describedby="DescriptionLabel"></textarea>
                  </div>
                  <br />
                  <div className="input-group">
                    <span className="input-group-addon" id="ImageLabel">Image URL:</span>
                    <input type="text" ref="Image" className="form-control" id="Image" aria-describedby="ImageLabel"/>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="input-group">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="submit" className="btn btn-primary">Create Board</button>
                  </div>
                  <div>
                  {BoardCreatorError}
                  </div>
                </div>
              </form>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = LogInForm;
