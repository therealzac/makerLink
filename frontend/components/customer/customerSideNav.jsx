var React = require('react');
var CustomerSideNavItem = require('./customerSideNavItem.jsx');

var AdminSideNav = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function () {
    return this.props;
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(newProps);
  },

  goToProjectSubmission: function () {
    this.context.router.push('/submission');
  },

  renderProjects: function () {
    var self = this;
    var activeProject = this.props.activeProject;

    if (this.props.projects) {
      return this.props.projects.map(function(project, idx) {
        var isActive = (activeProject === project ? true : false);

        return(
          <CustomerSideNavItem
            project={project}
            key={idx}
            isActive={isActive}
            onClick={self.props.setActiveProjectCallback}>
          </CustomerSideNavItem>
        )
      });
    }
  },

  render: function () {
    return (
        <nav className="customer-sidenav">
          <div className="sidenav-header">All Projects</div>

          { this.renderProjects() }

          <div className="customer-sidenav-new-project">
            <img src="http://res.cloudinary.com/makerlink/image/upload/v1471225399/symbol_add_bccrff.png" className="customer-sidenav-new-project-plus"/>
            New Project
          </div>

        </nav>
      )
  }
});

module.exports = AdminSideNav;
