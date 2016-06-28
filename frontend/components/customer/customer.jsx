var React = require('react');
var CustomerSideNav = require('./customerSideNav.jsx');
var ProjectShow = require('../projectShow.jsx');
var ApiUtil = require('../../util/apiUtil.js');
var Footer = require('../footer.jsx');

var Customer = React.createClass({
  getInitialState: function() {
    return {
      user: this.props.user,
      projects: this.props.projects,
      activeProject: this.props.projects[0]
    }
  },

  componentWillReceiveProps: function (newProps) {
    var activeProject = this.state.activeProject;

    if (activeProject) {
      newProps.projects.forEach(function (project) {
        if (project.id === activeProject.id) { activeProject = project };
      });
    } else {
      if (newProps.projects[0]) { activeProject = newProps.projects[0] };
    }

    this.setState({
      user: newProps.user,
      projects: newProps.projects,
      activeProject: activeProject
    });
  },

  setActiveProjectCallback: function (project) {
    this.setState({activeProject: project});
  },

  slackButton: function () {
    return (
      <p><a className="btn btn-lg btn-primary" onClick={this.slackIt} role="button">Slack!</a></p>
    )
  },

  slackIt: function (e) {
    e.preventDefault();
    ApiUtil.hitSlack();
  },

  render: function () {
    return(
      <div id='customer'>
        <CustomerSideNav
          projects={this.state.projects}
          activeProject={this.state.activeProject}
          setActiveProjectCallback={this.setActiveProjectCallback}>
        </CustomerSideNav>

        <div id="page-wrapper" className="gray-bg sidebar-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="wrapper wrapper-content animated fadeInUp">
                <div className="ibox">

                  <ProjectShow
                    user={this.state.user}
                    project={this.state.activeProject}>
                  </ProjectShow>

                  { this.slackButton() }

                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
});

module.exports = Customer;
