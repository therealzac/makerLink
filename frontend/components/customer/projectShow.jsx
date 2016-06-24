var React = require('react')
var ApiUtil = require('../../util/apiUtil.js');
var KanbanColumn = require('./KanbanColumn.jsx');


var projectShow = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function () {
    return {}
  },

  componentWillReceiveProps: function (newProps) {
    var projects = newProps.session.projects;
    var user = newProps.session.user;

    // just take first project for now.
    var project = projects ? projects[0] : {};

    // This is important for 0(1) update.
    project.idx = 0;

    var self = this;
    var tasks = project.tasks ? project.tasks : [];
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

    this.setState({
      user: user,
      todo: todo,
      project: project,
      completed: completed,
      inprogress: inprogress
    });
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
    var projectIdx = this.state.project ? this.state.project.idx : null;
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
                                      <h1 className="m-b-xs">{this.state.name}</h1>
                                      <h3 className="font-bold no-margins">
                                          {this.state.url}
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
                                      <tbody>
                                      <tr>
                                          <td>
                                              <span className="label label-primary"><i className="fa fa-check"></i> Completed</span>
                                          </td>
                                          <td>
                                             Create project in webapp
                                          </td>
                                          <td>
                                             12.07.2014 10:10:1
                                          </td>
                                          <td>
                                              14.07.2014 10:16:36
                                          </td>
                                          <td>
                                          <p className="small">
                                              Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable.
                                          </p>
                                          </td>

                                      </tr>
                                      <tr>
                                          <td>
                                              <span className="label label-primary"><i className="fa fa-check"></i> Accepted</span>
                                          </td>
                                          <td>
                                              Various versions
                                          </td>
                                          <td>
                                              12.07.2014 10:10:1
                                          </td>
                                          <td>
                                              14.07.2014 10:16:36
                                          </td>
                                          <td>
                                              <p className="small">
                                                  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                              </p>
                                          </td>

                                      </tr>
                                      <tr>
                                          <td>
                                              <span className="label label-primary"><i className="fa fa-check"></i> Sent</span>
                                          </td>
                                          <td>
                                              There are many variations
                                          </td>
                                          <td>
                                              12.07.2014 10:10:1
                                          </td>
                                          <td>
                                              14.07.2014 10:16:36
                                          </td>
                                          <td>
                                              <p className="small">
                                                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which
                                              </p>
                                          </td>

                                      </tr>
                                      <tr>
                                          <td>
                                              <span className="label label-primary"><i className="fa fa-check"></i> Reported</span>
                                          </td>
                                          <td>
                                              Latin words
                                          </td>
                                          <td>
                                              12.07.2014 10:10:1
                                          </td>
                                          <td>
                                              14.07.2014 10:16:36
                                          </td>
                                          <td>
                                              <p className="small">
                                                  Latin words, combined with a handful of model sentence structures
                                              </p>
                                          </td>

                                      </tr>
                                      <tr>
                                          <td>
                                              <span className="label label-primary"><i className="fa fa-check"></i> Accepted</span>
                                          </td>
                                          <td>
                                              The generated Lorem
                                          </td>
                                          <td>
                                              12.07.2014 10:10:1
                                          </td>
                                          <td>
                                              14.07.2014 10:16:36
                                          </td>
                                          <td>
                                              <p className="small">
                                                  The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                              </p>
                                          </td>

                                      </tr>
                                      <tr>
                                          <td>
                                              <span className="label label-primary"><i className="fa fa-check"></i> Sent</span>
                                          </td>
                                          <td>
                                              The first line
                                          </td>
                                          <td>
                                              12.07.2014 10:10:1
                                          </td>
                                          <td>
                                              14.07.2014 10:16:36
                                          </td>
                                          <td>
                                              <p className="small">
                                                  The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                              </p>
                                          </td>

                                      </tr>
                                      <tr>
                                          <td>
                                              <span className="label label-primary"><i className="fa fa-check"></i> Reported</span>
                                          </td>
                                          <td>
                                              The standard chunk
                                          </td>
                                          <td>
                                              12.07.2014 10:10:1
                                          </td>
                                          <td>
                                              14.07.2014 10:16:36
                                          </td>
                                          <td>
                                              <p className="small">
                                                  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                                              </p>
                                          </td>

                                      </tr>
                                      <tr>
                                          <td>
                                              <span className="label label-primary"><i className="fa fa-check"></i> Completed</span>
                                          </td>
                                          <td>
                                              Lorem Ipsum is that
                                          </td>
                                          <td>
                                              12.07.2014 10:10:1
                                          </td>
                                          <td>
                                              14.07.2014 10:16:36
                                          </td>
                                          <td>
                                              <p className="small">
                                                  Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable.
                                              </p>
                                          </td>

                                      </tr>
                                      <tr>
                                          <td>
                                              <span className="label label-primary"><i className="fa fa-check"></i> Sent</span>
                                          </td>
                                          <td>
                                              Contrary to popular
                                          </td>
                                          <td>
                                              12.07.2014 10:10:1
                                          </td>
                                          <td>
                                              14.07.2014 10:16:36
                                          </td>
                                          <td>
                                              <p className="small">
                                                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical
                                              </p>
                                          </td>

                                      </tr>

                                      </tbody>
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
