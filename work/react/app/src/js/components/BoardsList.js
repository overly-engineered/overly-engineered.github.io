/** @jsx React.DOM */
'use strict';
var React = require('react'),
    BoardItem = require('./BoardItem');


var BoardsList = React.createClass({

  render: function() {
    var boardItems = this.props.Boarditems.map(function(item) {
      return <BoardItem key={item.name}
                        title={item.title}
                        desc={item.description}
                        image={item.image}
                        viewBoard={this.props.viewBoard} />
    }.bind(this))
    return (
      <ul className="list-group">
        {boardItems}
      </ul>
    );
  }

});

module.exports = BoardsList;
