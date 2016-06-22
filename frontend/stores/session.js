var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var SessionConstants = require('../constants/sessionConstants.js');
var ApiUtil = require('../util/apiUtil.js');


var SessionStore = new Store(AppDispatcher);

var _session = {};

SessionStore.__onDispatch = function (payload) {
  console.log(payload);
  switch (payload.actionType) {

    case SessionConstants.USER_RECEIVED:
      ApiUtil.fetchSession();
      break;

    case SessionConstants.SESSION_RECEIVED:
      setSession(payload.session);
      SessionStore.__emitChange();
      break;

    case SessionConstants.SESSION_DESTROYED:
      clearSession();
      SessionStore.__emitChange();
      break;

    case SessionConstants.INVALID_ENTRY:
      invalidEntry(payload.error);
      SessionStore.__emitChange();
      break;

    case SessionConstants.FLAG_RECEIVED:
      flagProject(payload.flag, payload.projectIdx);
      SessionStore.__emitChange();
      break;

    case SessionConstants.COHORT_RECEIVED:
      addCohort(payload.cohort);
      SessionStore.__emitChange();
      break;

    case SessionConstants.GROUP_RECEIVED:
      updateCohort(payload.cohort);
      SessionStore.__emitChange();
      break;

    case SessionConstants.PROJECT_RECEIVED:
      addProject(payload.project);
      SessionStore.__emitChange();
      break;

    case SessionConstants.UPDATED_PROJECT_RECEIVED:
      updateProject(payload.project);
      SessionStore.__emitChange();
      break;
  }
};

var setUser = function (user) {
  _session.user = user;
};

var setSession = function (session) {
  if (session.user) { _session = session }
};

var flagProject = function(flag, projectIdx) {
  if (flag.message) { _session.user.news.push(flag.message) }
  _session.projects[projectIdx] = flag.project;
}

var addCohort = function(cohort) {
  cohort.groups = [];
  _session.cohorts.push(cohort);
}


var updateCohort = function(cohort) {
  var cohortIdx;

  _session.cohorts.forEach(function (oldCohort, idx) {
    if (cohort.id === oldCohort.id) { cohortIdx = idx }
  });

  _session.cohorts[cohortIdx] = cohort;
}

var addProject = function(project) {
  var user = _session.user;

  if (!user.projects) { return user.projects = [project] }
  user.projects.push(project);
}

var updateProject = function (project) {
  _session.projects[project.idx] = project;
}

var clearSession = function () {
  _session = {};
};

SessionStore.getSession = function () {
  return _session;
};

SessionStore.clearErrors = function () {
  _session.message = null;
}

var invalidEntry = function (error) {
  _session.message = error.responseJSON;
}


module.exports = SessionStore;
