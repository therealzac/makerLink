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
                            </a>
                            <div>
                                <strong>{newsItem.body}</strong><br/>
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

  render: function () {
    return (
      <div style={{marginBottom: "50px"}}>
          <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
              <div className="container" style={{width: "100%"}}>
                  <div className="navbar-header page-scroll">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                      </button>
                        <img src='http://res.cloudinary.com/makerlink/image/upload/v1470282316/logo_xoqsyf.png' className="makerlink-logo-white" style={{position: "absolute", top: "2vmin", cursor: "pointer"}} onClick={this.goToLanding}/>
                  </div>
                  <div id="navbar" style={{border: "none"}} className="navbar-collapse collapse">
                      <ul className="nav navbar-nav navbar-right" style={{marginRight: "0", paddingRight: "1vw"}}>
                        <li style={{marginLeft: '20vw'}}>
                          <a className="temp-header">We build apps. Need one?</a>
                          <a className="temp-subheader">Give us your email, we'll hit you up when our platform's ready.</a>

                          <form style={{marginTop: "-5vh"}} action="//makerlink.us13.list-manage.com/subscribe/post?u=93a48221804b21d185ce1d9e2&amp;id=4dfccf38a8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                            <input type="submit" className="mailchimp-button" value="KEEP ME POSTED" name="subscribe" id="mc-embedded-subscribe"/>
                            <input className="mailchimp-input" type="text" id="mce-EMAIL" name="EMAIL" valueLink={this.linkState("email")}/>
                            <div className="hidden" aria-hidden="true"><input type="text" name="b_93a48221804b21d185ce1d9e2_4dfccf38a8" tabIndex="-1" value=""/></div>
                            <div className="clear"></div>
                          </form>
                        </li>

                      </ul>

                  </div>
              </div>
          </nav>
      </div>
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
