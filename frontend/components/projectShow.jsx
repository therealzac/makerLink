var React = require('react')
var ApiUtil = require('../util/apiUtil.js');
var KanbanColumn = require('./KanbanColumn.jsx');


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

  componentWillReceiveProps: function (newProps) {
    var project = newProps.project ? newProps.project : {};
    var tasks = project.tasks ? this.sortTasks(project.tasks) : {};

    this.setState({
      user: newProps.user,
      project: project,
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

    return {
      todo: todo,
      completed: completed,
      inprogress: inprogress
    };
  },

  addTask: function (e) {
    e.preventDefault();
    var body = $('#new-task').val();

    var task = {
      author_id: this.state.user.id,
      project_id: this.state.project.id,
      body: body
    }

    ApiUtil.createTask(task, this.state.project.idx);
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
                                      <ul className="nav nav-tabs">
                                          <li className="active"><a href="#tab-1" data-toggle="tab">Dashboard</a></li>
                                          <li className=""><a href="#tab-2" data-toggle="tab">Planner Thing</a></li>
                                      </ul>
                                  </div>
                              </div>

                              <div className="panel-body">

                              <div className="tab-content">
                              <div className="tab-pane active" id="tab-1">
                            <div className="ibox-content">
                                  <div>
                                      <h1 className="m-b-xs">{name}</h1>
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
                                      <input id="new-task" type="text" placeholder="Add new task. " className="input input-sm form-control"/>
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

                              <div className="tab-pane" id="tab-2">

                                  <table className="table table-striped">
                                      <thead>
                                      <tr>
                                          <th>Status</th>
                                          <th>Title</th>
                                          <th>Start Time</th>
                                          <th>End Time</th>
                                          <th>Comments</th>
                                      </tr>
                                      </thead>
                                  </table>

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
      </div>
    )
  }
});

module.exports = projectShow;
