var React = require('react');
var Inbox = require('./inbox.jsx');
var SessionStore = require('../stores/session.js');
var MessageStore = require('../stores/message.js');
var apiUtil = require('../util/apiUtil.js');

var Dashboard = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function () {
    var session = this.props.session;
    return { session: session }
  },

  componentDidMount: function () {
    this.props.changeBackground("WHITE");
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({session: newProps.session});
  },

  renderChildrenWithProps: function () {
    var childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {session: this.state.session}));

    return childrenWithProps;
  },

  render: function () {
    return (
      <div id="wrapper">
          { this.renderChildrenWithProps() }
      </div>
    )
  }
});

module.exports = Dashboard;
