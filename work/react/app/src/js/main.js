/** @jsx React.DOM */
var React = require('react'),
    Boards = require('./components/Boards');

React.renderComponent(
  <Boards />,
  document.getElementById('app')
);
