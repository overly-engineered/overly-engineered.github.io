/** @jsx React.DOM */
'use strict';
var React = require('react');

var LogInForm = React.createClass({

  handleForm: function(e){
    e.preventDefault();

    var userLogin = {
      username : this.refs.username.getDOMNode().value,
      password : this.refs.password.getDOMNode().value
    };

    this.refs.Login.getDOMNode().reset();
    this.props.onLogin(userLogin);
  },

  render: function() {
    var LogInError;
    var errorStyle = { textAlign: 'left', marginTop: '1em' };
    if(this.props.LogInError) {
      LogInError = <div className="alert alert-danger" role="alert" style={errorStyle}><strong>Oh snap!</strong> Change a few things up and try logging in again.</div>
    } else {
      LogInError = '';
    };

    return (
      <div className="modal fade" id="LogInModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
              <h4 className="modal-title" id="myModalLabel">Login</h4>
            </div>
            <form ref="Login"  onSubmit={this.handleForm}>
                <div className="modal-body">
                  <div className="input-group">
                    <span className="input-group-addon" id="ExampleUsername">Username</span>
                    <input type="text" ref="username" className="form-control" aria-describedby="ExampleUsername"/>
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
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
                  <div>
                  {LogInError}
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
