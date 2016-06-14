var React = require('react'),
    AdminSideNav = require('./adminSideNav.jsx'),
    GroupIndex = require('./groupIndex.jsx'),
    DevIndex = require('./devIndex.jsx'),
    CohortForm = require('./cohortForm.jsx'),
    GroupForm = require('./groupForm.jsx'),
    Footer = require('../footer.jsx');


var Admin = React.createClass({
  getInitialState: function() {
    return { cohortForm: "hidden", groupForm: "hidden", cohortShow: "hidden" }
  },

  componentWillReceiveProps: function (newProps) {
    var user = newProps.session.user,
        projects = newProps.session.projects,
        message = newProps.session.message,
        newCohorts = newProps.session.cohorts,
        oldCohort = this.state.activeCohort,
        activeCohort;

    if (oldCohort) {
      newCohorts.forEach(function (cohort) {
        if (cohort.id === oldCohort.id) { activeCohort = cohort }
      });

    } else if (newCohorts) {
      activeCohort = newCohorts[0];
    }

    var cohortShow = activeCohort ? "ibox-content" : "hidden";
    var school_id = user ? user.school_id : null;

    this.setState({
      cohorts: newCohorts,
      activeCohort: activeCohort,
      school_id: school_id,
      cohortForm: "hidden",
      groupForm: "hidden",
      cohortShow: cohortShow,
      message: message,
      user: user,
      projects: projects
    });
  },

  showCohortFormCallback: function () {
    this.setState({
      activeCohort: null,
      cohort_id: null,
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

  setActiveCohortCallback: function(cohort) {
    this.setState({
      activeCohort: cohort,
      cohort_id:  cohort.id,
      cohortForm: "hidden",
      cohortShow: "ibox-content",
      groupForm: "hidden"
    });
  },

  setActiveGroupCallback: function (group) {
    this.setState({
      activeGroup: group,
      group_id: group.id
    });
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
    var user = this.state.user;
    var projects = this.state.projects;
    var activeCohort = this.state.activeCohort;
    var activeGroup = this.state.activeGroup;
    var cohorts = this.state.cohorts;
    var school_id = this.state.school_id;
    var message = this.state.message;

    var devs = activeCohort ? activeCohort.devs : [];
    var soloDevs = activeCohort ? activeCohort.solo_devs : [];
    var cohort_id = activeCohort ? activeCohort.id : null;
    var groups = activeCohort ? activeCohort.groups : [];
    var activeCohortName = activeCohort ? activeCohort.name : "";

    return(
      <div id="admin">
        <AdminSideNav
          cohorts={cohorts}
          activeCohort={activeCohort}
          showCohortFormCallback={this.showCohortFormCallback}
          setActiveCohortCallback={this.setActiveCohortCallback}>
        </AdminSideNav>

        <div id="page-wrapper" className="gray-bg sidebar-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="wrapper wrapper-content animated fadeInUp">
                <div className="ibox">

                  <div className={this.state.cohortForm}>
                    <CohortForm
                      message={message}
                      school_id={school_id}
                      setActiveCohortCallback={this.setActiveCohortCallback}>
                    </CohortForm>
                  </div>

                  <div className={this.state.groupForm}>
                    <GroupForm
                      message={message}
                      soloDevs={soloDevs}
                      cohort_id={cohort_id}>
                    </GroupForm>
                  </div>

                  <div className={this.state.cohortShow}>
                    <h3>{activeCohortName}</h3>
                    <h3>COHORT CODE: {cohort_id}</h3>
                    <GroupIndex
                      admin={user}
                      projects={projects}
                      groups={groups}
                      activeGroup={activeGroup}
                      setActiveGroupCallback={this.setActiveGroupCallback}>
                    </GroupIndex>

                    <a>
                      { this.renderNewGroupButton() }
                    </a>

                    <h3>DEVS:</h3>
                    <DevIndex devs={devs}/>
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
