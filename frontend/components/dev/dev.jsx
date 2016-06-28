var React = require('react');
var DevSideNav = require('./devSideNav.jsx');
var ProjectIndex = require('../projectIndex.jsx');
var Footer = require('../footer.jsx');


var Dev = React.createClass({
  getInitialState: function() {
    var dev = this.props.user;
    var projects = this.props.projects;

    return {
      dev: dev,
      projects: projects
    }
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ dev: newProps.user, projects: newProps.projects });
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
                    dev={this.state.dev}
                    projects={this.state.projects}>
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
