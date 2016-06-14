var React = require('react');
var DevIndexItem = require('./devIndexItem.jsx');

var DevIndex = React.createClass({
  getInitialState: function () {
    return { devs: this.props.devs }
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({devs: newProps.devs});
  },

  render: function () {
    if (!this.state.devs) {
      return(<div></div>);

    } else {
      var toggleMembership = this.props.toggleMembership;
      var devIsMember = this.props.devsAreMembers ? true : false;

      return (
          <table>
            <tbody>
            {
              this.state.devs.map(function (dev, idx) {
                return (
                  <DevIndexItem
                    dev={dev}
                    key={idx}
                    devIsMember={devIsMember}
                    toggleMembership={toggleMembership}>
                  </DevIndexItem>
                )
              })
            }
            </tbody>
          </table>
      )
    }
  }
});

module.exports = DevIndex;
