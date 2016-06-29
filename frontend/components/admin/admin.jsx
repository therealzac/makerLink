var React = require('react'),
    AdminSideNav = require('./adminSideNav.jsx'),
    GroupIndex = require('./groupIndex.jsx'),
    DevIndex = require('./devIndex.jsx'),
    CohortForm = require('./cohortForm.jsx'),
    GroupForm = require('./groupForm.jsx'),
    Footer = require('../footer.jsx');


var Admin = React.createClass({
  getInitialState: function() {
    return {
      cohorts: this.props.cohorts,
      activeCohort: this.props.cohorts[0],
      cohortShow: this.props.cohorts[0] ? "ibox-content" : "hidden",
      cohortForm: "hidden",
      groupForm: "hidden",
      message: this.props.message,
      user: this.props.user,
      projects: this.props.projects
    };
  },

  componentWillReceiveProps: function (newProps) {
    var activeCohort = this.state.activeCohort,
        cohortShow = this.state.cohortShow;

    if (this.state.activeCohort) {
      newProps.cohorts.forEach(function (cohort) {
        if (cohort.id === activeCohort.id) { activeCohort = cohort };
      });
    } else {
      if (newProps.cohorts[0]) { activeCohort = newProps.cohorts[0] };
      cohortShow = "ibox-content";
    }

    this.setState({
      cohorts: newProps.cohorts,
      activeCohort: activeCohort,
      cohortForm: "hidden",
      cohortShow: cohortShow,
      groupForm: "hidden",
      message: newProps.message,
      user: newProps.user,
      projects: newProps.projects
    });
  },

  showCohortForm: function () {
    this.setState({
      activeCohort: null,
      cohortShow: "hidden",
      cohortForm: "ibox-content",
      groupForm: "hidden"
    });
  },

  showGroupForm: function () {
    this.setState({
      cohortShow: "hidden",
      cohortForm: "hidden",
      groupForm: "ibox-content"
    });
  },

  setActiveCohort: function(cohort) {
    this.setState({
      activeCohort: cohort,
      cohortForm: "hidden",
      cohortShow: "ibox-content",
      groupForm: "hidden"
    });
  },

  setActiveGroup: function (group) {
    this.setState({ activeGroup: group });
  },

  renderNewGroupButton: function () {
    var activeCohort = this.state.activeCohort;
    var soloDevs = activeCohort ? activeCohort.solo_devs : [];

    if (soloDevs[0]) {
      return (
        <span
          className="label label-primary"
          onClick={this.showGroupForm}>
          NEW GROUP
        </span>
      );
    }
  },

  render: function () {
    var activeCohort = this.state.activeCohort,

        activeCohortDevs = activeCohort ? activeCohort.devs : [],
        soloDevs = activeCohort ? activeCohort.solo_devs : [],
        cohort_id = activeCohort ? activeCohort.id : null,
        groups = activeCohort ? activeCohort.groups : [],
        activeCohortName = activeCohort ? activeCohort.name : "";

    return(
      <div id="admin">
        <AdminSideNav
          cohorts={this.state.cohorts}
          activeCohort={activeCohort}
          showCohortFormCallback={this.showCohortForm}
          setActiveCohortCallback={this.setActiveCohort}>
        </AdminSideNav>

        <div id="page-wrapper" className="gray-bg sidebar-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="wrapper wrapper-content animated fadeInUp">
                <div className="ibox">

                  <div className={this.state.cohortForm}>
                    <CohortForm
                      message={this.state.message}
                      school_id={this.state.user.school_id}
                      setActiveCohortCallback={this.setActiveCohort}>
                    </CohortForm>
                  </div>

                  <div className={this.state.groupForm}>
                    <GroupForm
                      message={this.state.message}
                      soloDevs={soloDevs}
                      cohort_id={cohort_id}
                      setActiveGroupCallback={this.setActiveGroup}>
                    </GroupForm>
                  </div>

                  <div className={this.state.cohortShow}>
                    <h3>{activeCohortName}</h3>
                    <h3>COHORT CODE: {cohort_id}</h3>
                    <GroupIndex
                      admin={this.state.user}
                      projects={this.state.projects}
                      groups={groups}
                      activeGroup={this.state.activeGroup}
                      setActiveGroupCallback={this.setActiveGroup}>
                    </GroupIndex>

                    <a>
                      { this.renderNewGroupButton() }
                    </a>

                    <h3>DEVS:</h3>
                    <DevIndex devs={activeCohortDevs}/>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
});

module.exports = Admin;
