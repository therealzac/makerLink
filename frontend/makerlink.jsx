var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    hashHistory = require('react-router').hashHistory;

var App = require('./components/app');
var Landing = require('./components/landing');
var Login = require('./components/login');
var Signup = require('./components/signup');
var SubmissionForm = require('./components/submissionForm');
var Dashboard = require('./components/dashboard');
var Inbox = require('./components/inbox');
var Settings = require('./components/settings');
var Admin = require('./components/admin/admin');
var Customer = require('./components/customer/customer');
var Dev = require('./components/dev/dev');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Landing}/>
    <Route path="/login" component={Login}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/submission" component={SubmissionForm}/>
    <Route path="/dashboard" component={Dashboard}>
      <IndexRoute component={Customer}/>
      <Route path = "/dev" component={Dev}/>
      <Route path = "/admin" component={Admin}/>
    </Route>
  </Route>
)

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('root')
  );
});
