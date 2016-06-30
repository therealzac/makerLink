var React = require('react');

var Dashboard = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function () {
    var session = this.props.session;
    var user = session.user ? session.user : {};
    var projects = session.projects ? this.indexObjects(session.projects) : [];
    var cohorts = session.cohorts ? this.indexObjects(session.cohorts) : [];
    var slack = session.slack ? session.slack : {};

    return { user: user, projects: projects, cohorts: cohorts, slack: slack }
  },

  componentDidMount: function () {
    this.props.changeBackground("WHITE");
  },

  componentWillReceiveProps: function (newProps) {
    var session = newProps.session;
    var user = session.user ? session.user : {};
    var projects = session.projects ? this.indexObjects(session.projects) : [];
    var cohorts = session.cohorts ? this.indexObjects(session.cohorts) : [];
    var slack = session.slack ? session.slack : {};
    if (!user) { this.context.router.push('/login') }

    this.setState({ user: user, projects: projects, cohorts: cohorts });
  },

  indexObjects: function (objects) {
    objects.forEach(function (object, idx) { object.idx = idx });

    return objects;
  },

  renderChildrenWithProps: function (user, projects, cohorts) {
    var user = this.state.user;
    var projects = this.state.projects;
    var cohorts = this.state.cohorts;
    var slack = this.state.slack;
    
    var childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(
        child, {user: user, projects: projects, cohorts: cohorts, slack: slack})
      );

    return childrenWithProps;
  },

  render: function () {
    return (
      <div id="wrapper">
          { this.renderChildrenWithProps() }
      </div>
    )
  }
});

module.exports = Dashboard;
