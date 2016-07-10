var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var SessionStore = require('../stores/session.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Login = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {email: "", password: "", message: ""}
  },

  componentDidMount: function () {
    this.props.changeBackground();
  },

  componentWillReceiveProps: function (newProps) {
    var message = newProps.session.message;
    if (message) { this.setState({message: message}) }
  },

  goToSignup: function (e) {
    e.preventDefault();
    SessionStore.clearErrors();
    this.context.router.push('/signup');
  },

  login: function (e) {
    e.preventDefault();

    SessionStore.clearErrors();
    ApiUtil.login(this.state);
  },

  render: function () {
    return (
      <div className="middle-box text-center loginscreen  animated fadeInDown">
          <div>
              <div>

                  <h1 className="logo-name">mL</h1>
              </div>
              <div className="makerlink-login">
                <h3>Welcome back.</h3>
                <p style={{color: "red"}}>{this.state.message}</p>
                <form className="m-t" role="form">
                    <div className="form-group">
                        <input type="email"
                          name="user[email]"
                          className="form-control"
                          placeholder="Email"
                          required=""
                          valueLink={this.linkState("email")}>
                        </input>
                    </div>
                    <div className="form-group">
                        <input
                          type="password"
                          name="user[password]"
                          className="form-control"
                          placeholder="Password"
                          required=""
                          valueLink={this.linkState("password")}>
                        </input>
                    </div>
                    <button className="btn btn-primary block full-width m-b" onClick={this.login}>Login</button>

                    <a href="#"><small>Forgot password?</small></a>
                    <p className="text-muted text-center"><small>Do not have an account?</small></p>
                    <a className="btn btn-sm btn-white btn-block" onClick={this.goToSignup}>Create an account</a>
                </form>
              </div>
          </div>
      </div>
    )
  }
});

module.exports = Login;
