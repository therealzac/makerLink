var AppDispatcher = require('../dispatcher/dispatcher.js');
var SessionConstants = require('../constants/sessionConstants.js');
var MessageConstants = require('../constants/messageConstants.js');

var ApiActions = {

  receiveSession: function (session) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.SESSION_RECIEVED,
      session: session
    });
  },

  logOut: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.SESSION_DESTROYED,
    });
  },

  invalidEntry: function (error) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.INVALID_ENTRY,
      error: error
    });
  },

  receiveCohort: function(cohort) {
    AppDispatcher.dispatch({
        actionType: SessionConstants.COHORT_RECIEVED,
        cohort: cohort
    })
  },

  updateCohort: function(cohort) {
    AppDispatcher.dispatch({
        actionType: SessionConstants.GROUP_RECIEVED,
        cohort: cohort
    })
  },

  receiveFlag: function(flag, projectIdx){
    AppDispatcher.dispatch({
      actionType: SessionConstants.FLAG_RECIEVED,
      flag: flag,
      projectIdx: projectIdx
    });
  },

  receiveProject: function(project) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.PROJECT_RECIEVED,
      project: project
    });
  }
}

module.exports = ApiActions;
