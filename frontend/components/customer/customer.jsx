var React = require('react');
var CustomerSideNav = require('./customerSideNav.jsx');
var PendingProjectShow = require('./PendingProjectShow.jsx');
var MainBackdrop = require('../mainBackdrop.jsx');
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

  render: function () {
    return(
      <div id='customer' className="main-customer-dashboard">
        <MainBackdrop
          user={this.state.user}>
        </MainBackdrop>

        <CustomerSideNav
          projects={this.state.projects}
          activeProject={this.state.activeProject}
          setActiveProjectCallback={this.setActiveProjectCallback}>
        </CustomerSideNav>

        <PendingProjectShow
          user={this.state.user}
          project={this.state.activeProject}>
        </PendingProjectShow>

        <Footer/>
      </div>
    )
  }
});

module.exports = Customer;
