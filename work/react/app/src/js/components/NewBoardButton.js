/** @jsx React.DOM */
'use strict';
var React = require('react'),
    NewBoardForm = require('./NewBoardForm');

var NewBoardButton = React.createClass({

  render: function() {
    var style = { float:'right', marginTop:'1em'};
    return (
      <div>
        <button type="button" className="btn btn-info nav-item" data-toggle="modal" data-target="#NewBoardModal"  name="New Board" style={style}>+ New Board</button>
        <NewBoardForm onAddBoard={this.props.onAddBoard}
                      BoardCreateError={this.props.BoardCreateError}
                      validateForm={this.props.validateForm}
                      BoardCreateError={this.props.BoardCreateError}/>
      </div>
    );
  }

});

module.exports = NewBoardButton;
