var React = require('react');
var CustomerSideNav = require('./customerSideNav.jsx');
var Footer = require('../footer.jsx');

var Customer = React.createClass({
  getInitialState: function() {
    var customer = this.props.session.user;

    if (customer) {
      customer.currentProject = customer.projects[0];
      return customer;
    }

    return { projects: [], currentProject: null }
  },

  componentWillReceiveProps: function (newProps) {
    var customer = this.props.session.user;

    if (customer) {
      customer.currentProject = customer.projects[0];
      this.setState(customer);
    }

    return { projects: [], currentProject: null }
  },

  projectShow: function () {
    if (this.state.currentProject) {
      return (
        <div className="ibox-content">
          <h1>{this.state.currentProject.name}</h1>
        </div>
      )
    }
  },

  setActiveProjectCallback: function (project) {

    this.setState({currentProject: project});
  },

  render: function () {
    return(
      <div id='customer'>
        <CustomerSideNav
          projects={this.state.projects}
          currentProject={this.state.currentProject}
          setActiveProjectCallback={this.setActiveProjectCallback}>
        </CustomerSideNav>

        <div id="page-wrapper" className="gray-bg sidebar-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="wrapper wrapper-content animated fadeInUp">
                <div className="ibox">
                  { this.projectShow() }
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
