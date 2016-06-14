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
    var admin = this.state.admin,
        styling = this.getStyling(),
        projects = this.state.projects,
        groupName = this.state.group.name,
        setActiveGroup = this.props.handleClick;

    return (
      <li className={styling} onClick={setActiveGroup}>
          <a><span className="nav-label">{groupName}</span></a>
          <ProjectIndex
            admin={admin}
            projects={projects}>
          </ProjectIndex>
      </li>
    )
  }
})

module.exports = GroupIndexItem;
