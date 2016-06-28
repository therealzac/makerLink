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
        <nav className="navbar-default navbar-static-side sidebar-content" role="navigation">
          <div className="sidebar-collapse">
              <ul className="nav metismenu" id="side-menu">
                  <li className="nav-header">
                      <div className="logo-element">
                          mL
                      </div>
                  </li>
                  <li><a><span className="label label-primary" onClick={this.goToProjectSubmission}>NEW Project</span></a></li>

                  { this.renderProjects() }

              </ul>
          </div>
        </nav>
      )
  }
});

module.exports = AdminSideNav;
