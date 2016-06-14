var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var SessionStore = require('../stores/session.js');


var NavBar = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function () {
    return {
      signup: "block",
      login: "block",
      logOut: "none",
      dashboardClass: 'none',
      notifications: 'none',
      news: []
    }
  },

  componentWillReceiveProps: function (newProps) {
    var user = newProps.session.user;
    var school = user ? user.school : null;
    var dashboardValue = school ? school.name : null;

    if (user) {
      switch (user.type) {
        case "customer":
          this.setState({
            signup: "none",
            login: "none",
            logOut: "block",
            dashboardValue: "Dashboard",
            dashboardClass: 'block',
            notifications: 'block',
            dashboardRoute: "/dashboard",
            user: user
          });
          break;

        case "dev":
          this.setState({
            signup: "none",
            login: "none",
            logOut: "block",
            dashboardValue: "Browse Projects",
            dashboardClass: 'block',
            notifications: 'block',
            dashboardRoute: "/dev",
            user: user
          });
          break;

        case "admin":
          this.setState({
             signup: "none",
             login: "none",
             logOut: "block",
             dashboardValue: dashboardValue,
             dashboardClass: 'block',
             notifications: 'block',
             dashboardRoute: "/admin",
             user: user
           });
           break;
      }
    } else {
      this.setState({
        signup: "block",
        login: "block",
        logOut: "none",
        notifications: 'none',
        dashboardClass: 'none'
      });
    }
  },

  goToLogin: function (e) {
    e.preventDefault();
    this.context.router.push('/login');
  },

  goToSignup: function (e) {
    e.preventDefault();
    this.context.router.push('/signup');
  },

  goToLanding: function (e) {
    this.context.router.push('/');
  },

  goToDashboard: function(e) {
    e.preventDefault();
    this.context.router.push(this.state.dashboardRoute);
  },

  logOut: function (e) {
    e.preventDefault();
    ApiUtil.logOut();
    this.context.router.push('/');
  },

  renderNotifications: function () {
    var user = this.state.user;

    if (!user) { return }

    var news = user.news ? user.news : [];
    var newsNumber = news.length > 0 ? news.length : null;

    return (
      <li style={{display: this.state.notifications}} className="dropdown">
          <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
              <i className="fa fa-envelope"></i>  <span className="label label-warning">{newsNumber}</span>
          </a>
            {
              <ul className="dropdown-menu dropdown-messages">
                {
                  news.map(function (newsItem, idx) {
                    return (
                      <li key={idx}>
                        <div className="dropdown-messages-box">
                            <a className="pull-left">
                                <img alt="image" className="img-circle"/>
                            </a>
                            <div>
                                <strong>{newsItem.subject}</strong><br/>
                            </div>
                        </div>
                      </li>
                    );
                  })
                }
                <li>
                  <div className="text-center link-block">
                    <a>
                      <strong onClick={this.approveProject}>All Notifications</strong>
                    </a>
                  </div>
                </li>
              </ul>
            }
      </li>
    )
  },

  approveProject: function () {

  },

  render: function () {
    return (
      <div className="navbar-wrapper" style={{marginBottom: "50px"}}>
          <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
              <div className="container">
                  <div className="navbar-header page-scroll">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                      </button>
                  </div>
                  <div id="navbar" className="navbar-collapse collapse">
                      <ul className="nav navbar-nav navbar-right">
                        <li style={{display: this.state.signup}}><a className="page-scroll" onClick={this.goToSignup}>Sign Up</a></li>
                        <li style={{display: this.state.login}}><a className="page-scroll" onClick={this.goToLogin}>Login</a></li>
                        <li style={{display: this.state.dashboardClass}}><a className="page-scroll" onClick={this.goToDashboard}>{this.state.dashboardValue}</a></li>
                        { this.renderNotifications() }
                        <li style={{display: this.state.logOut}}><a className="page-scroll" onClick={this.logOut}><i className="fa fa-gear"></i></a></li>
                      </ul>
                      <ul className="nav navbar-nav navbar-left">
                        <li><a className="page-scroll" onClick={this.goToLanding} >MAKERLINK</a></li>
                      </ul>

                  </div>
              </div>
          </nav>
      </div>
    )
  }
});

module.exports = NavBar;
