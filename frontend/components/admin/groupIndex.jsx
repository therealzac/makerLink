var React = require('react');
var GroupIndexItem = require('./groupIndexItem.jsx');

var groupIndex = React.createClass({
  getInitialState: function () {
    return { className: "group", groups: [] }
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(newProps);
  },

  renderGroups: function () {
    var admin = this.state.admin,
        projects = this.state.projects,
        activeGroup = this.state.activeGroup,
        setActiveGroupCallback = this.props.setActiveGroupCallback;

    return this.state.groups.map(function (group, idx) {
      var isActive = ( group === activeGroup ? true : false );

      return (
        <GroupIndexItem
          key={idx}
          admin={admin}
          group={group}
          projects={projects}
          isActive={isActive}
          setActiveGroupCallback={setActiveGroupCallback}>
        </GroupIndexItem>
      )
    });
  },

  render: function () {
    if (!this.props.groups) {
      return (<div></div>);
    } else {
      return (
        <div>
          <h4>Groups</h4>
          <ul>
            { this.renderGroups() }
          </ul>
        </div>
      )
    }
  }
});

module.exports = groupIndex;
