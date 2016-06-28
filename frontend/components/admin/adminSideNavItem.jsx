var React = require('react');

var AdminSideNavItem = React.createClass({
  getInitialState: function () {
    var cohort = this.props.cohort ? this.props.cohort : {};
    var isActive = this.props.isActive;

    return { isActive: isActive, cohort: cohort };
  },

  componentWillReceiveProps: function (newProps) {
    var isActive = newProps.isActive;
    var cohort = newProps.cohort;

    return { isActive: isActive, cohort: cohort };
  },

  handleClick: function (e) {
    e.preventDefault();
    this.props.onClick(this.props.cohort);
  },

  render: function () {
    return (
      <li className={this.state.isActive} onClick={this.handleClick}>
          <a> <i className="fa fa-th-large"></i> <span className="nav-label">{this.state.cohort.name}</span></a>
      </li>
    )
  }
})

module.exports = AdminSideNavItem;
