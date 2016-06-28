const React = require('react'),
      ReactDOM = require('react-dom'),
      Router = require('react-router').Router,
      Route = require('react-router').Route,
      IndexRoute = require('react-router').IndexRoute,
      hashHistory = require('react-router').hashHistory,

      App = require('./components/app'),
      Landing = require('./components/landing'),
      Login = require('./components/login'),
      Signup = require('./components/signup'),
      SubmissionForm = require('./components/submissionForm'),
      Dashboard = require('./components/dashboard'),
      Settings = require('./components/settings'),
      Admin = require('./components/admin/admin'),
      Customer = require('./components/customer/customer'),
      Dev = require('./components/dev/dev'),
      Project = require('./components/projectShow.jsx'),

      routes = (
        <Route path="/" component={App}>
          <IndexRoute component={Landing}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/submission" component={SubmissionForm}/>
          <Route path="/dashboard" component={Dashboard}>
            <IndexRoute component={Customer}/>
            <Route path="/dev" component={Dev}/>
            <Route path="/admin" component={Admin}/>
            // Bullshit project path.
            <Route path="/project" component={Project}/>
          </Route>
        </Route>
      )

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('root')
  );
});
