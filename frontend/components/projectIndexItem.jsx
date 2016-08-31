var React = require('react');
var ApiUtil = require('../util/apiUtil');

var ProjectIndexItem = React.createClass({
  getInitialState: function () {
    return this.props;
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(newProps);
  },

  flagProject: function() {
    var project = this.state.project;
    var flag = {
      dev_id: this.state.dev.id,
      project_id: project.id,
      group_id: this.state.dev.group_id,
      school_id: this.state.dev.school_id
    }

    project.flag = flag;
    ApiUtil.flagProject(project);
  },

  approveProject: function () {
    ApiUtil.approveProject(this.state.project);
  },

  renderActionButton: function () {
    var dev = this.state.dev,
        admin = this.state.admin,
        project = this.state.project,
        flag = project ? project.flag : null;

    if (dev && !dev.group_id) {
      return (
        <a><span
          className="label">
          CANT FLAG PROJECTS YET...
        </span></a>
      )
    } else if (dev && dev.group_id && !project.flagged) {
      return (
        <a><span
          className="label label-primary"
          onClick={this.flagProject}>
          FLAG PROJECT
        </span></a>
      )
    } else if (admin && flag && !flag.instructor_approved) {
      return (
        <a><span
          className="label label-primary"
          onClick={this.approveProject}>
          APPROVE PROJECT
        </span></a>
      )
    }
  },

  render: function(){
    var project = this.state.project,
        name = project ? project.name : null,
        url = project ? project.url : null,
        description = project ? project.description : null;

    return (
      <div className="grow">
          <img src="https://unsplash.it/g/200/300/?random" alt="ALT"/>
          <p style={{fontSize: "18px"}}> {name} </p>
          <p>{url}</p>
          <p>{description}</p>
          <p>{ this.renderActionButton() }</p>
      </div>
    )
  }
});

module.exports = ProjectIndexItem;
