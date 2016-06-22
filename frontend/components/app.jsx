var React = require('react');
var Landing = require('./landing.jsx');
var NavBar = require('./navbar.jsx');
var ApiUtil = require('../util/apiUtil.js');
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;
var SessionStore = require('../stores/session.js');

var App = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function () {
    return { dashboardBackground: 'dashboard-white', session: {} }
  },

  getRandomBackground: function () {
    return [
    "dashboard1-background",
    "dashboard2-background",
    "dashboard3-background",
    "dashboard4-background",
    "dashboard5-background"
    ][Math.floor(Math.random() * 5)];
  },

  changeBackground: function (backgroundType) {
    if (backgroundType === "WHITE") {
      this.setState({dashboardBackground: 'dashboard-white'});

    } else {
      var newBackground = this.getRandomBackground();

      while (this.state.dashboardBackground === newBackground) {
        newBackground = this.getRandomBackground();
      }

      this.setState({dashboardBackground: newBackground});
    }
  },

  componentDidMount: function () {
    if (!this.state.session.user) { ApiUtil.fetchSession() }
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.sessionListener.remove()
  },

  _onChange: function () {
    var session = SessionStore.getSession();
    var user = session.user;

    this.setState({session: session});

    if (user) {
      switch (user.type) {
        case "customer":
          this.context.router.push('/dashboard');
          break;

        case "dev":
        // We're gonna wanna change this back to /dev.
          this.context.router.push('/project');
          break;

        case "admin":
          this.context.router.push('/admin');
          break;
      }
    }
  },

  renderChildrenWithProps: function () {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        changeBackground: this.changeBackground,
        session: this.state.session,
        
      })
    );

    return childrenWithProps;
  },

  render: function () {
    return (
      <div className={this.state.dashboardBackground}>
        <NavBar session={this.state.session}/>

        { this.renderChildrenWithProps() }
      </div>
    );
  }
});

module.exports = DragDropContext(HTML5Backend)(App);
