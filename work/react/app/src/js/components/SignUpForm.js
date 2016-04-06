/** @jsx React.DOM */
'use strict';
var React = require('react');

var SignUpForm = React.createClass({

  handleForm: function(e){
    e.preventDefault();
    
    var newUser = {
      pass: this.refs.password.getDOMNode().value,
      username: this.refs.username.getDOMNode().value
    };

    this.refs.SignUp.getDOMNode().reset();
    this.props.onNewUser(newUser);
  },

  render: function() {
    return (
      <div className="modal fade" id="SignUpModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
              <h4 className="modal-title" id="myModalLabel">Sign Up</h4>
            </div>
            <form ref="SignUp" onSubmit={this.handleForm}>
              <div className="modal-body">
                  <label htmlFor="username">Pick a Username</label>
                  <div className="input-group">
                    <span className="input-group-addon" id="ExampleUsername">eg: JebSmash</span>
                    <input type="text" ref="username" className="form-control" id="username" aria-describedby="ExampleUsername"/>
                  </div>
                  <br />
                  <div className="input-group">
                    <span className="input-group-addon" id="PasswordLabel">Password</span>
                    <input type="password" ref="password" className="form-control" id="Password" aria-describedby="PasswordLabel"/>
                  </div>
              </div>
              <div className="modal-footer">
                <div className="input-group">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-primary">Sign up</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = SignUpForm;
