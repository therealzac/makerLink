var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var SessionStore = require('../stores/session.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var NavBar = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      signup: "block",
      login: "block",
      logOut: "none",
      dashboardClass: 'none',
      notifications: 'none',
      news: [],
      email: ""
    }
  },

  getRandomLogo: function () {
  //   return [
  //   "makerlink-logo-red",
  //   "makerlink-logo-white",
  //   "makerlink-logo-blue",
  //   "makerlink-logo-green",
  //   "makerlink-logo-purple",
  //   "makerlink-logo-yellow",
  //   "makerlink-logo-brown"
  // ][Math.floor(Math.random() * 7)];
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
      <div style={{display: this.state.notifications}} className="topnav-option">
        <i className="fa fa-envelope"></i>  <span className="label label-warning">{newsNumber}</span>

            {
              news.map(function (newsItem, idx) {
                return (
                  <div key={idx}>
                  </div>
                );
              })
            }
      </div>
    )
  },

  render: function () {
    return (
          <nav className="topnav">
            <svg className="topnav-svg" xmlns="http://www.w3.org/2000/svg"
             width="55.000000pt" height="61.000000pt" viewBox="0 0 55.000000 140.000000"
             preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
            fill="#fff" stroke="none">
            <path d="M389 840 c-40 -21 -73 -64 -65 -85 2 -7 21 -18 41 -25 33 -11 39 -10
            59 9 28 26 76 27 107 2 38 -30 30 -74 -31 -173 -52 -84 -79 -108 -121 -108
            -26 0 -69 43 -69 69 0 40 -39 37 -59 -5 -16 -35 -14 -76 5 -103 21 -30 89 -61
            134 -61 41 0 108 29 131 56 36 42 127 206 133 239 13 70 -30 157 -95 190 -39
            21 -126 18 -170 -5z"/>
            <path d="M215 681 c-22 -10 -47 -27 -56 -37 -36 -41 -127 -205 -133 -238 -14
            -74 33 -164 101 -192 76 -32 189 -2 222 59 17 31 10 42 -35 57 -32 11 -38 10
            -58 -9 -48 -45 -130 -14 -130 50 0 38 102 212 130 223 48 18 114 -18 114 -63
            0 -40 39 -37 59 5 28 61 5 114 -63 145 -52 23 -100 24 -151 0z"/>
            </g>
            </svg>
            <div className="topnav-brand"><strong>MAKER</strong>LINK</div>
            <div className="topnav-option" onClick={this.logOut}>Log Out</div>

            { this.renderNotifications() }
          </nav>
    )
  }
});

// <p style={{fontSize: "1vmax", color: "black", }}>Have a Software Project?</p>
// <p style={{fontSize: "0.618034vmax", color: "black"}}>Give us your email, we'll hit you up when our app's ready.</p>


// ORIGINAL nav
// <div className="navbar-wrapper" style={{marginBottom: "50px"}}>
//     <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
//         <div className="container">
//             <div className="navbar-header page-scroll">
//                 <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
//                     <span className="sr-only">Toggle navigation</span>
//                     <span className="icon-bar"></span>
//                     <span className="icon-bar"></span>
//                     <span className="icon-bar"></span>
//                 </button>
//             </div>
//             <div id="navbar" className="navbar-collapse collapse">
//                 <ul className="nav navbar-nav navbar-right">
//                   <li style={{display: this.state.signup}}><a className="page-scroll" onClick={this.goToSignup}>Sign Up</a></li>
//                   <li style={{display: this.state.login}}><a className="page-scroll" onClick={this.goToLogin}>Login</a></li>
//                   <li style={{display: this.state.dashboardClass}}><a className="page-scroll" onClick={this.goToDashboard}>{this.state.dashboardValue}</a></li>
//                   { this.renderNotifications() }
//                   <li style={{display: this.state.logOut}}><a className="page-scroll" onClick={this.logOut}><i className="fa fa-gear"></i></a></li>
//                 </ul>
//                 <ul className="nav navbar-nav navbar-left">
//                   <li>
//                     <div className={this.state.logo} onClick={this.goToLanding}>
//                     </div>
//                   </li>
//                 </ul>
//
//             </div>
//         </div>
//     </nav>
//



// <div className="navbar-wrapper" style={{marginBottom: "50px"}}>
//     <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
//         <div className="container">
//             <div className="navbar-header page-scroll">
//                 <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
//                     <span className="sr-only">Toggle navigation</span>
//                     <span className="icon-bar"></span>
//                     <span className="icon-bar"></span>
//                     <span className="icon-bar"></span>
//                 </button>
//             </div>
//             <div id="navbar" className="navbar-collapse collapse">
//                 <ul className="nav navbar-nav navbar-right">
//                   <li>
//                     <a style={{fontSize: "14px", bottom: "12px"}}>HAVE A SOFTWARE PROJECT?</a>
//                     <a style={{bottom: "50px", fontSize: "12px", fontWeight: "200"}}>Give us your email, we'll hit you up when our app's ready.</a>
//
//                     <form action="//makerlink.us13.list-manage.com/subscribe/post?u=93a48221804b21d185ce1d9e2&amp;id=4dfccf38a8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
//                       <input type="text" id="mce-EMAIL" name="EMAIL" valueLink={this.linkState("email")} style={{position: "absolute", bottom: "35px", left: "10px", width: "300px"}}/>
//                       <div className="hidden" aria-hidden="true"><input type="text" name="b_93a48221804b21d185ce1d9e2_4dfccf38a8" tabIndex="-1" value=""/></div>
//                       <div className="clear"><input type="submit" className="mailchimp-button" value="KEEP ME POSTED" name="subscribe" id="mc-embedded-subscribe"/></div>
//                     </form>
//                   </li>
//
//                 </ul>
//                 <ul className="nav navbar-nav navbar-left">
//                   <li>
//                     <div className="makerlink-logo-white" style={{position: "absolute", top: "25px", cursor: "pointer"}} onClick={this.goToLanding}>
//                     </div>
//                     <a style={{top: "10px", left: "35px"}}>MAKERLINK</a>
//                   </li>
//                 </ul>
//
//             </div>
//         </div>
//     </nav>
// </div>

module.exports = NavBar;
