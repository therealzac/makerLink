var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var SessionStore = require('../stores/session.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var Signup = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  mixins: [LinkedStateMixin],

  getInitialState: function () {
      return {}
  },

  componentDidMount: function () {
    this.props.changeBackground();
  },

  componentWillReceiveProps: function (newProps) {
    var message = newProps.session.message;
    if (message) { this.setState({message: message}) }
  },

  goToLogin: function () {
    SessionStore.clearErrors();
    this.context.router.push('/login');
  },

  signup: function (e) {
    e.preventDefault();
    SessionStore.clearErrors();

    var user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      mobile: this.state.mobile
    }

    var card = {
      number: this.state.number,
      exp_year: this.state.exp_year,
      exp_month: this.state.exp_month,
      cvc: this.state.cvc
    }

    ApiUtil.createUser(user, card);
  },

  render: function () {
    return (
      <div className="signup-middle-box text-center loginscreen  animated fadeInDown">
          <div className="makerlink-signup">
            <h3>Let's get started!</h3>
            <p style={{color: "red"}}>{this.state.message}</p>

            <form className="m-t" role="form">
                <div className="form-group" style={{float: "left"}}>
                    <input type="text"
                      name="user[first_name]"
                      className="form-control"
                      placeholder="First Name"
                      required=""
                      valueLink={this.linkState("first_name")}/>
                </div>

                <div className="form-group" style={{float: "right"}}>
                    <input type="text"
                      name="user[last_name]"
                      className="form-control"
                      placeholder="Last Name"
                      required=""
                      valueLink={this.linkState("last_name")}/>
                </div>

                <div className="form-group">
                    <input type="email"
                      name="user[email]"
                      className="form-control"
                      placeholder="Email"
                      required=""
                      valueLink={this.linkState("email")}/>
                </div>

                <div className="form-group">
                    <input type="password"
                      name="user[password]"
                      className="form-control"
                      placeholder="Password"
                      required=""
                      valueLink={this.linkState("password")}/>
                </div>

                <div className="form-group">
                  <input type="mobile"
                    name="user[mobile]"
                    className="form-control"
                    placeholder="(505) 050-5050"
                    required=""
                    valueLink={this.linkState("mobile")}/>
                </div>

                <div className="form-group">
                  <label>Payment Information</label>
                  <input type="text"
                    name="stripe[number]"
                    className="form-control"
                    size="20"
                    placeholder="Card Number"
                    valueLink={this.linkState("number")}/>
                </div>

                <div className="form-group" style={{float: "left"}}>
                  <input type="text"
                    name="stripe[exp_month]"
                    className="form-control"
                    placeholder="MM"
                    valueLink={this.linkState("exp_month")}/>
                </div>

                <div className="form-group" style={{float: "right"}}>
                  <input type="text"
                    name="stripe[exp_year]"
                    className="form-control"
                    placeholder="YYYY"
                    valueLink={this.linkState("exp_year")}/>
                </div>

                <div className="form-group">
                  <input type="text"
                    name="stripe[cvc]"
                    className="form-control"
                    placeholder="Security Code"
                    valueLink={this.linkState("cvc")}/>
                </div>


                <div className="form-group" style={{float: "left"}}>
                    <label>Developer?</label>
                    <input type="text"
                      name="user[cohort]"
                      className="form-control"
                      placeholder="Dev Code"
                      required=""
                      valueLink={this.linkState("cohort_id")}/>
                </div>

                <div className="form-group" style={{float: "right"}}>
                    <label>Admin?</label>
                    <input type="text"
                      name="user[school]"
                      className="form-control"
                      placeholder="Admin Code"
                      required=""
                      valueLink={this.linkState("school_id")}/>
                </div>


                <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox"/>
                        <i></i>
                        I agree to the terms and policy.
                      </label>
                    </div>
                </div>

                <button
                  onClick={this.signup}
                  className="btn btn-primary block full-width m-b">
                  Register
                </button>

                <p className="text-muted text-center">
                  <small>Already have an account?</small>
                </p>

                <a onClick={this.goToLogin}>
                  Log In
                </a>
            </form>
          </div>
      </div>
    )
  }
});

module.exports = Signup;
