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
    var project = this.state.project,
        dev = this.state.dev;

    var flag = {
      dev_id: dev.id,
      project_id: project.id,
      group_id: dev.group_id,
      school_id: dev.school_id
    }

    ApiUtil.flagProject(flag, project.projectIdx);
  },

  approveProject: function () {
    var project = this.state.project,
        flag = project.flag;

    flag.instructor_approved = true;

    ApiUtil.approveProject(flag, project.projectIdx);
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
        pitch = project ? project.pitch : null,
        url = project ? project.url : null,
        description = project ? project.description : null;

    return (
      <div className="grow">
          <img src="https://unsplash.it/g/200/300/?random" alt="ALT"/>
          <p style={{fontSize: "18px"}}> {name} </p>
          <p>{pitch}</p>
          <p>{url}</p>
          <p>{description}</p>
          <p>{ this.renderActionButton() }</p>
      </div>
    )
  }
});

module.exports = ProjectIndexItem;
