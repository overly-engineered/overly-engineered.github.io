/** @jsx React.DOM */
'use strict';
var React = require('react');
var BoardsList = require('./BoardsList');
var TopNav = require('./TopNav');
var Firebase = require('firebase');

var Boards = React.createClass({

  loadData: function(){
    var ref = new Firebase('https://pettmanioreactjs.firebaseio.com/boards');
    ref.on('value' ,function(snap){
      var items = [];
      snap.forEach(function(itemSnap){
        var item = itemSnap.val();
        item.name = itemSnap.key();
        items.push(item);
      });
      this.setState({
        items: items
      });
    }.bind(this));
  },

  componentDidMount: function(){
    this.loadData();
  },

  getInitialState: function(){

    var USERNAME = 'Jamie'
    return {
      items: [],
      username: USERNAME,
      loggedIn :false
    }
  },

  render: function() {
    return (
      <div className="container-fluid">
        <TopNav username={this.state.username} loggedIn={this.state.loggedIn}/>
        <BoardsList items={this.state.items}/>
      </div>
    );
  }

});
module.exports = Boards;
