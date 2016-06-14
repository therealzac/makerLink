var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var CohortForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {}
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({school_id: newProps.school_id});
  },

  resetStateCallback: function (cohort) {
    this.setState({name: "", project_completion_date: ""});
    this.props.setActiveCohortCallback(cohort);
  },

  createCohort: function (e) {
    e.preventDefault();
    ApiUtil.createCohort(this.state, this.resetStateCallback);
  },

  render: function () {
    return (
      <div className="form-group">
          <label>Cohort Name:</label>
          <input
            name="cohort[name]"
            valueLink={this.linkState("name")}
            type="text"
            className="form-control"
          />
            <input
              name="cohort[name]"
              valueLink={this.linkState("project_completion_date")}
              type="date"
              className="form-control"
            />
          <p style={{color: "red"}}>{this.props.message}</p>
          <p><a className="btn btn-lg btn-primary" onClick={this.createCohort} role="button">Make It Happen</a></p>
      </div>
    )
  },
});

module.exports = CohortForm;
