var React = require('react');

var DevIndexItem = React.createClass({
  getInitialState: function () {
    if (!this.props.devIsMember) { return {membershipButton: "Add to group"} }
    else { return {membershipButton: "Remove from group"} }
  },

  renderMembershipButton: function () {
    if (this.props.toggleMembership) {
      return (
        <td className="project-actions">
            <a className="btn btn-white btn-sm"
               onClick={this.handleClick}>
               <i className=" glyphicon glyphicon-ok-sign"/>
               {this.state.membershipButton}
            </a>
        </td>
      )
    }
  },

  handleClick: function (e) {
    e.preventDefault();
    this.props.toggleMembership(this.props.dev);
  },

  render: function () {
    return (
      <tr>
          <td className="project-title">
              <a>{this.props.dev.first_name + " " + this.props.dev.last_name}</a>
              <br />
          </td>
          { this.renderMembershipButton() }
      </tr>
    )
  }
})

module.exports = DevIndexItem;
