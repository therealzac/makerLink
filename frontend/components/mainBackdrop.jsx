var React = require('react');

var MainBackdrop = React.createClass({
  getInitialState: function () {
      return this.props;
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(newProps);
  },

  render: function () {
    return (
      <div className="main-backdrop">
        <img src="https://unsplash.it/g/200/300/?random" className="main-backdrop-profile-pic"/>
        <p className="main-backdrop-user-greeting">Hey, {this.state.user.first_name}.</p>
        <p className="main-backdrop-edit-profile">Edit Profile</p>
      </div>
    )
  }
});

module.exports = MainBackdrop;
