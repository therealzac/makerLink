var React = require('react');
var ProjectIndex = require('../projectIndex.jsx');

var GroupIndexItem = React.createClass({
  getInitialState: function () {
    return this.props;
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(newProps);
  },

  handleClick: function (e) {
    e.preventDefault();
    this.props.setActiveGroupCallback(this.state.group);
  },

  getStyling: function () {
    return this.state.isActive ? "group active" : "group";
  },

  render: function () {
    return (
      <li className={this.getStyling()} onClick={this.handleClick}>
          <a><span className="nav-label">{this.state.group.name}</span></a>
          <ProjectIndex admin={admin} projects={this.state.projects}/>
      </li>
    )
  }
})

module.exports = GroupIndexItem;
