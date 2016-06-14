var React = require('react');

var CohortIndexItem = React.createClass({
  getInitialState: function () {
    if (this.props.isActive) {
      return { className: "active" }
    } else {
      return { className: "" }
    }

  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.isActive) {
      this.setState( {className: "active"} );
    } else {
      this.setState( {className: ""} );
    }
  },

  handleClick: function (e) {
    e.preventDefault();
    this.props.onClick(this.props.cohort);
  },

  render: function () {
    return (
      <li className={this.state.className} onClick={this.handleClick}>
          <a> <i className="fa fa-th-large"></i> <span className="nav-label">{this.props.cohort.name}</span></a>
      </li>
    )
  }
})

module.exports = CohortIndexItem;
