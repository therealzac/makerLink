var React = require('react');
var DevSideNav = require('./devSideNav.jsx');
var ProjectIndex = require('../projectIndex.jsx');
var Footer = require('../footer.jsx');


var Dev = React.createClass({
  getInitialState: function() {
    var session = this.props.session;

    var dev = session.user ? session.user : null;
    var projects = session.projects ? session.projects : [];

    return {
      dev: dev,
      projects: projects
    }
  },

  componentWillReceiveProps: function (newProps) {
    var session = newProps.session;

    var dev = session.user ? session.user : null;
    var projects = session.projects ? session.projects : [];

    this.setState({
      dev: dev,
      projects: projects
    });
  },

  render: function () {
    var dev = this.state.dev;
    var projects = this.state.projects;

    return(
      <div id='dev'>
        <DevSideNav/>

        <div id="page-wrapper" className="gray-bg sidebar-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="wrapper wrapper-content animated fadeInUp">
                <div className="ibox">
                  <ProjectIndex
                    dev={dev}
                    projects={projects}>
                  </ProjectIndex>
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

module.exports = Dev;
