var React = require('react');

var ProjectIndexItem = React.createClass({
  getInitialState: function () {
    if (this.props.isActive) {
      return { className: "sidenav-item-active" }
    } else {
      return { className: "sidenav-item" }
    }

  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.isActive) {
      this.setState( {className: "sidenav-item-active"} );
    } else {
      this.setState( {className: "sidenav-item"} );
    }
  },

  handleClick: function (e) {
    e.preventDefault();
    this.props.onClick(this.props.project);
  },

  render: function () {
    return (
      <div className={this.state.className} onClick={this.handleClick}>
          { this.props.project.name }
          <div className="customer-sidenav-item-progress-bar"/>
      </div>
    )
  }
})

module.exports = ProjectIndexItem;
