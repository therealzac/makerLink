var React = require('react')
var ApiUtil = require('../util/apiUtil.js');
var KanbanColumn = require('./KanbanColumn.jsx');
var ChannelStore = require('../stores/slackChannel.js');
var EventStore = require('../stores/calendarEvents.js');
var Inbox = require('./inbox.jsx');


var projectShow = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function () {
    var user = this.props.user;
    var project = this.props.project ? this.props.project : {};
    var tasks = project.tasks ? this.sortTasks(project.tasks) : {};

    return {
      user: user,
      project: project,
      todo: tasks.todo,
      completed: tasks.completed,
      inprogress: tasks.inprogress
    };
  },

  componentWillMount: function () {
    this.channelListener = ChannelStore.addListener(this._onChange);
    this.eventsListener = EventStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.channelListener.remove();
    this.eventsListener.remove();
  },

  _onChange: function () {
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', EventStore.getEvents());

    this.setState({
      channel: ChannelStore.getChannel(),
      events: EventStore.getEvents()
    });
  },

  componentWillReceiveProps: function (newProps) {
    var oldProject = this.state.project;
    var project = newProps.project ? newProps.project : {};
    var tasks = project.tasks ? this.sortTasks(project.tasks) : {};
    var channel = oldProject.id === project.id ? this.state.channel : null;
    var events = oldProject.id === project.id ? this.state.events : null;

    if (project.slack_id && !channel) { ApiUtil.fetchChannel(project.slack_id) }
    if (project.calendar_id && !events) {
      $('#calendar').fullCalendar('removeEvents');
      EventStore.clearEvents();
      ApiUtil.fetchEvents(project.calendar_id);
    }

    this.setState({
      user: newProps.user,
      project: project,
      channel: channel,
      events: events,
      todo: tasks.todo,
      completed: tasks.completed,
      inprogress: tasks.inprogress
    });
  },

  sortTasks: function (tasks) {
    var todo = [];
    var inprogress = [];
    var completed = [];

    tasks.forEach(function (task) {
      switch (task.status) {
        case 0:
          todo.push(task);
          break;
        case 1:
          inprogress.push(task);
          break;
        case 2:
          completed.push(task);
          break;
      }
    });

    return { todo: todo, completed: completed, inprogress: inprogress };
  },

  addTask: function (e) {
    e.preventDefault();
    var body = $('#new-task').val();

    var task = {
      author_id: this.state.user.id,
      project_id: this.state.project.id,
      body: body
    }

    ApiUtil.createTask(task, this.state.project.idx, this.resetEntry);
  },

  resetEntry: function () {
    $('#new-task').val("");
  },

  payForProject: function () {
    ApiUtil.payForProject(this.state.project);
  },

  renderPaymentButton: function () {
    var flag = this.state.project.flag;

    if (flag && !flag.customer_paid) {
      return (
        <p>
          <a
            className="btn btn-lg btn-primary"
            onClick={this.payForProject}
            role="button">
            Pay for that ish
          </a>
        </p>
      )
    }
  },

  renderSlack: function () {
    if (this.state.project.group) {
      return (
        <div className="tab-pane" id="tab-2">

          <Inbox
            user={this.state.user}
            project={this.state.project}
            channel={this.state.channel}>
          </Inbox>

        </div>
      )
    }
  },

  renderCalendar: function () {
    // Render Slack and render calendar might be joinable.
    if (this.state.project.group) {
      return (
        <div className="tab-pane" id="tab-3">
          <div id="calendar"></div>
        </div>
      )
    }
  },

  handleDayClick: function( startDate ) {
    var endDate = moment(startDate.format());
    endDate.add(30, 'minutes');

    // var attendees =
    var newEvent = {
      title: this.state.project.name,
      calendar_id: this.state.project.calendar_id,
      start: startDate.format(),
      end: endDate.format(),
    }

    ApiUtil.scheduleMeeting(newEvent, this.addEvent);
  },

  addEvent: function (calendar) {
    var newEvent = calendar.event;
    newEvent.title = newEvent.summary;

    $('#calendar').fullCalendar('renderEvent', newEvent);
  },

  fillCalendar: function () {
    var self = this;

    $('#calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyD9Cpy9fmidTbTK7sG6-oinFh9NE-yr6mg',
        dayClick: self.handleDayClick,
        events: self.state.events,
        defaultView: "agendaWeek",
        minTime: "10:00:00",
        maxTime: "18:00:00",
        allDaySlot: false,
        editable: true,
        height: 380,
    });
  },

  renderTabs: function () {
    if (this.state.project.group) {
      return (
        <ul className="nav nav-tabs">
          <li className="active"><a href="#tab-1" data-toggle="tab">Agile Board</a></li>
          <li className=""><a href="#tab-2" data-toggle="tab">Messenger</a></li>
          <li className=""><a href="#tab-3" data-toggle="tab" onClick={this.fillCalendar}>Project Calendar</a></li>
        </ul>
      )
    } else {
      return (
        <ul className="nav nav-tabs">
          <li className="active"><a href="#tab-1" data-toggle="tab">{this.state.project.name}</a></li>
        </ul>
      )
    }
  },

  render: function () {
    var projectIdx = this.state.project ? this.state.project.idx : null,
        name = this.state.project ? this.state.project.name : null,
        url = this.state.project ? this.state.project.url : null;

    return(
      <div>
      <div className="row">
          <div className="col-lg-12">
              <div className="wrapper wrapper-content animated fadeInUp">
                  <div className="ibox">
                      <div className="ibox-content">
                          <div className="row m-t-sm">
                              <div className="col-lg-12">
                              <div className="panel blank-panel">
                              <div className="panel-heading">
                                  <div className="panel-options">
                                    { this.renderTabs() }
                                  </div>
                              </div>

                              <div className="panel-body">

                              <div className="tab-content">
                              <div className="tab-pane active" id="tab-1">
                            <div className="ibox-content">
                                  <div>
                                      <h1 className="m-b-xs">{name}</h1>

                                      { this.renderPaymentButton() }

                                      <h3 className="font-bold no-margins">
                                          {url}
                                      </h3>
                                  </div>

                              <div>
                                  <canvas id="lineChart" height="70"></canvas>
                              </div>

                              <div className="m-t-md">
                                  <small className="pull-right">
                                      <i className="fa fa-clock-o"> </i>
                                      Update on 02.24.2016
                                  </small>
                                 <small>

                                 </small>
                              </div>

                          </div>
             <div className="agile-custom  animated fadeInRight">
                  <div className="row">
                      <div className="col-lg-4">
                          <div className="ibox">
                              <div className="ibox-content">
                                  <h3>To-do</h3>
                                  <p className="small"><i className="fa fa-hand-o-up"></i> Drag task between list</p>

                                  <div className="input-group">

                                      <input
                                        id="new-task"
                                        type="text"
                                        className="input input-sm form-control">
                                      </input>

                                      <span className="input-group-btn">
                                              <button onClick={this.addTask} type="button" className="btn btn-sm btn-white"> <i className="fa fa-plus"></i> Add task</button>
                                      </span>
                                  </div>

                                  <KanbanColumn
                                    projectIdx={projectIdx}
                                    statusCode={0}
                                    statusWord={"todo"}
                                    tasks={this.state.todo}>
                                  </KanbanColumn>

                              </div>
                          </div>
                      </div>

                      <div className="col-lg-4">
                          <div className="ibox">
                              <div className="ibox-content">
                                  <h3>In Progress</h3>
                                  <p className="small"><i className="fa fa-hand-o-up"></i> Drag task between list</p>

                                    <KanbanColumn
                                      projectIdx={projectIdx}
                                      statusCode={1}
                                      statusWord={"inprogress"}
                                      tasks={this.state.inprogress}>
                                    </KanbanColumn>

                              </div>
                          </div>
                      </div>
                      <div className="col-lg-4">
                          <div className="ibox">
                              <div className="ibox-content">
                                  <h3>Completed</h3>
                                  <p className="small"><i className="fa fa-hand-o-up"></i> Drag task between list</p>

                                    <KanbanColumn
                                      projectIdx={projectIdx}
                                      statusCode={2}
                                      statusWord={"completed"}
                                      tasks={this.state.completed}>
                                    </KanbanColumn>

                              </div>
                          </div>
                      </div>

                  </div>
                  </div>
                </div>

                      { this.renderSlack() }

                      { this.renderCalendar() }

                              </div>

                              </div>

                              </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </div>
    )
  }
});

module.exports = projectShow;
