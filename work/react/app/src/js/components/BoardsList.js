/** @jsx React.DOM */
'use strict';
var React = require('react'),
    BoardItem = require('./BoardItem');


var BoardList = React.createClass({

  render: function() {

    var boardItems = this.props.items.map(function(item) {
      return <BoardItem key={item.name}
                        title={item.title}
                        desc={item.description}
                        image={item.image} />
    })
    return (
      <ul className="list-group">
        {boardItems}
      </ul>
    );
  }

});

module.exports = BoardList;
