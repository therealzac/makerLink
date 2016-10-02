var ApiActions = require('../actions/apiActions.js');

var ApiUtil = {
  createUser: function (newUser, card) {
    var apiUtil = this;
    $.ajax({
      url: "api/users",
      method: "POST",
      data: {user: newUser, card: card},
      success: function (user) {
        // Login with newUser because it has password prop.
        apiUtil.login(newUser);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  fetchSession: function () {
    $.ajax({
      url: "session",
      method: "GET",
      success: function (session) {
        ApiActions.receiveSession(session);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  login: function (user) {
    $.ajax({
      url: "session",
      method: "POST",
      data: {user: user},
      success: function(session){
        ApiActions.receiveSession(session);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  logOut: function () {
    $.ajax({
      url: "session",
      method: "DELETE",
      success: function () {
        ApiActions.logOut();
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  getMessages: function (id) {
    $.ajax({
      url: "api/messages",
      data: {id: id},
      success: function (messages) {
        ApiActions.receiveMessages(messages);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  createGroup: function(group, members, successCallback) {
    $.ajax({
        url: "api/groups",
        data: {group: group, members: members},
        method: "POST",
        success: function(cohort) {
          successCallback();

          cohort.idx = group.cohort_idx;
          ApiActions.updateCohort(cohort);
        },
        error: function(error) {
          ApiActions.invalidEntry(error);
        }
    });
  },

  createCohort: function(cohort, successCallback) {
   $.ajax({
      url: "api/cohorts",
      data: {cohort: cohort},
      method: "POST",
      success: function(cohort) {
        successCallback(cohort);
        ApiActions.receiveCohort(cohort);
      },
      error: function(error){
        ApiActions.invalidEntry(error);
      }
   });
  },

  flagProject: function(project) {
    $.ajax({
      url: "api/flags",
      data: {flag: project.flag},
      method: "POST",
      success: function(flag){
        ApiActions.receiveFlag(flag, project.idx);
      },
      error: function(error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  approveProject: function (project) {
    var flag = project.flag;
    flag.instructor_approved = true;

    $.ajax({
      url: "api/flags/" + flag.id,
      data: {flag: flag},
      method: "PATCH",
      success: function (flag) {
        ApiActions.receiveFlag(flag, project.idx);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  payForProject: function (project) {
    var flag = project.flag;
    var channel = "#" + project.name.toLowerCase();
    flag.customer_paid = true;

    $.ajax({
      url: "api/flags/" + project.flag.id,
      data: {flag: project.flag},
      method: "PATCH",
      success: function (flag) {
        ApiActions.receiveFlag(flag, project.idx);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  createProject: function(project) {
    $.ajax({
      url: "api/projects",
      data: {project: project},
      method: 'POST',
      success: function(project) {
        ApiActions.receiveProject(project);
      },
      error: function(error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  updateProject: function (project) {
    $.ajax({
      url: "api/projects/" + project.id + "/",
      data: {project: project},
      method: "PATCH",
      success: function (updatedProject) {
        updatedProject.idx = project.idx;
        ApiActions.receiveUpdatedProject(updatedProject);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    })
  },

  createTask: function (task, projectIdx, successCallback) {
    $.ajax({
      url: "api/tasks",
      data: {task: task},
      method: "POST",
      success: function (project) {
        successCallback();

        project.idx = projectIdx;
        ApiActions.receiveUpdatedProject(project);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  updateTask: function (task, projectIdx) {
    var now = new Date;
    task.updated_at = now.toUTCString();

    $.ajax({
      url: 'api/tasks/' + task.id + '/',
      data: {task: task},
      method: "PATCH",
      success: function (project) {
        project.idx = projectIdx;
        ApiActions.receiveUpdatedProject(project);
      },
    });
  },

  fetchChannel: function (channel) {
    $.ajax({
      url: 'api/slack/',
      data: {channel: channel, count: 6},
      method: "GET",
      success: function (slack) {
        ApiActions.receiveSlack(slack);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    })
  },

  postMessageToChannel: function (message, successCallback) {
    $.ajax({
      url: 'api/slack/',
      method: "POST",
      data: message,
      success: function (slack) {
        successCallback();
        ApiActions.receiveSlackMessage(slack.channel.message);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    })
  },

  scheduleMeeting: function (newEvent, successCallback) {
    $.ajax({
      url: 'api/calendars/',
      method: "POST",
      data: newEvent,
      success: function (calendar) {
        successCallback(calendar);
        ApiActions.receiveEvent(calendar);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    })
  },

  fetchEvents: function (calendar_id) {
    $.ajax({
      url: 'api/calendars/',
      method: "GET",
      data: { calendar_id: calendar_id },
      success: function (calendar) {
        ApiActions.receiveEvents(calendar);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    })
  },

  saveEmail: function (email, successCallback) {
    $.ajax({
      url: 'http://eepurl.com/b-5RLz',
      method: "PUT",
      data: { "email_address": email, "status": "subscribed" },
      success: function () {
        console.log("Seems legit!");
      }
    })
  }
}

module.exports = ApiUtil;
