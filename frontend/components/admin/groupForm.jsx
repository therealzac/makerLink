var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../../util/apiUtil.js');
var DevIndex = require('./devIndex.jsx');

var GroupForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    var members = this.props.members ? this.props.memebers : [];

    return {
      cohort_id: this.props.cohort_id,
      soloDevs: this.props.soloDevs,
      members: members
    }
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(newProps);
  },

  resetStateCallback: function () {
    var group = {
      name: this.state.name,
      cohort_id: this.state.cohort.id,
      cohort_idx: this.state.cohort.idx
    }

    this.setState({name: ""});

    this.state.setActiveCohortCallback(this.state.cohort);
    this.state.setActiveGroupCallback(group);
  },

  toggleMembership: function (dev) {
    var updatedNewMembers = this.state.members;
    var updatedSoloDevs = this.state.soloDevs;

    var newMemberIndex = updatedNewMembers.indexOf(dev);
    var soloDevIndex = updatedSoloDevs.indexOf(dev);

    if (soloDevIndex !== -1) {
      updatedSoloDevs.splice(soloDevIndex, 1);
      updatedNewMembers.push(dev);
    } else {
      updatedNewMembers.splice(newMemberIndex, 1);
      updatedSoloDevs.push(dev);
    }

    this.setState({
      members: updatedNewMembers,
      soloDevs: updatedSoloDevs
    });
  },

  createGroup: function (e) {
    e.preventDefault();

    var newGroup = {
      name: this.state.name,
      cohort_id: this.state.cohort.id
    };

    ApiUtil.createGroup(newGroup, this.state.members, this.resetStateCallback);
  },

  render: function () {
    return (
      <div className="form-group">
          <label>Group Name:</label>
          <input name="group[name]" valueLink={this.linkState("name")} type="text" className="form-control"/>
          <h3>GROUP MEMBERS:</h3>
          <DevIndex
            devsAreMembers={true}
            devs={this.state.members}
            toggleMembership={this.toggleMembership}>
          </DevIndex>

          <h3>AVAILABLE DEVS:</h3>
          <DevIndex
            devs={this.state.soloDevs}
            toggleMembership={this.toggleMembership}>
          </DevIndex>
          <p style={{color: "red"}}>{this.props.message}</p>
          <p><a className="btn btn-lg btn-primary" onClick={this.createGroup} role="button">Make It Happen</a></p>
      </div>
    )
  }
});

module.exports = GroupForm;
