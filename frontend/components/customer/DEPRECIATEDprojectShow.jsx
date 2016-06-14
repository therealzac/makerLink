var React = require('react');


var projectShow = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function () {
    var project = this.props.session.proje
    return { name: "whateva", author: "whoeva", url: "blah" }
  },

  componentDidMount: function() {
      var lineData = {
          labels: ["2/18", "2/19", "2/20", "2/21", "2/22", "2/23", "2/24"],
          datasets: [
              {
                  label: "Example dataset",
                  fillColor: "rgba(220,220,220,0.5)",
                  strokeColor: "rgba(220,220,220,1)",
                  pointColor: "rgba(220,220,220,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(220,220,220,1)",
                  data: [65, 59, 80, 81, 56, 55, 40]
              },
              {
                  label: "Example dataset",
                  fillColor: "rgba(26,179,148,0.5)",
                  strokeColor: "rgba(26,179,148,0.7)",
                  pointColor: "rgba(26,179,148,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(26,179,148,1)",
                  data: [28, 48, 40, 19, 86, 27, 90]
              }
          ]
      };

      var lineOptions = {
          scaleShowGridLines: true,
          scaleGridLineColor: "rgba(0,0,0,.05)",
          scaleGridLineWidth: 1,
          bezierCurve: true,
          bezierCurveTension: 0.4,
          pointDot: true,
          pointDotRadius: 4,
          pointDotStrokeWidth: 1,
          pointHitDetectionRadius: 20,
          datasetStroke: true,
          datasetStrokeWidth: 2,
          datasetFill: true,
          responsive: true,
      };


      var ctx = document.getElementById("lineChart").getContext("2d");
      var myNewChart = new Chart(ctx).Line(lineData, lineOptions);

      $("#todo, #inprogress, #completed").sortable({
          connectWith: ".connectList",
          update: function( event, ui ) {

              var todo = $( "#todo" ).sortable( "toArray" );
              var inprogress = $( "#inprogress" ).sortable( "toArray" );
              var completed = $( "#completed" ).sortable( "toArray" );
              $('.output').html("ToDo: " + window.JSON.stringify(todo) + "<br/>" + "In Progress: " + window.JSON.stringify(inprogress) + "<br/>" + "Completed: " + window.JSON.stringify(completed));
          }
      }).disableSelection();

  },


  goToProjectSubmission: function () {
    this.context.router.push("/submission");
  },


  makeActive: function (e) {
   e.preventDefault();
   if (e.currentTarget.className === "active"){return}
   else {
    var clickedProject = e.currentTarget.className;
    this.setState(this.props.session.projects[clickedProject]);
   }
  },

  projectList: function () {
    var self = this;

    if (this.props.session.projects) {
      this.props.session.projects.map(function(project, idx) {
        if (self.state.name === project.name){
          var thisClass = "active";
        } else {
          var thisClass = idx.toString();
        }
        return(
          <li id="projects" key={idx} className={thisClass} onClick={self.makeActive}>
            <a><span className="nav-label">{project.name}</span></a>
          </li>
        )
      });
    }
  },

  render: function () {
    var self = this;
    return(

      <div>
        <nav className="navbar-default navbar-static-side sidebar-content" role="navigation" style={{zIndex: "0"}}>
            <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                    <li className="nav-header">
                        <div className="logo-element">
                            mL
                        </div>
                    </li>
                    <li><a><span className="label label-primary" onClick={this.goToProjectSubmission}>NEW PROJECT</span></a></li>
                    { this.projectList() }




                </ul>
            </div>
        </nav>



      <div className="row">
          <div className="col-lg-12">
              <div className="wrapper wrapper-content animated fadeInUp">
                  <div className="ibox">
                      <div className="ibox-content">
                          <div className="row">
                              <div className="col-lg-12">
                                  <div className="m-b-md">
                                      <h2>{this.state.name}</h2>
                                  </div>
                                  <dl className="dl-horizontal">
                                      <dt>Status:</dt> <dd><span className="label label-primary">Active</span></dd>
                                  </dl>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-lg-5">
                                  <dl className="dl-horizontal">

                                      <dt>Created by:</dt> <dd>{this.state.author}</dd>

                                      <dt>Provider:</dt> <dd><a href="#" className="text-navy"> Dev Bootcamp</a> </dd>

                                  </dl>
                              </div>
                              <div className="col-lg-7" id="cluster_info">
                                  <dl className="dl-horizontal" >

                                      <dt>Last Updated:</dt> <dd>16.08.2014 12:15:57</dd>
                                      <dt>Created:</dt> <dd> 	10.07.2014 23:36:57 </dd>
                                      <dt>Developers:</dt>
                                      <dd className="project-people">
                                      </dd>
                                  </dl>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-lg-12">
                                  <dl className="dl-horizontal">
                                      <dt>Completion:</dt>
                                      <dd>
                                          <div className="progress progress-striped active m-b-sm">
                                              <div style={{width: "60%"}} className="progress-bar"></div>
                                          </div>
                                          <small>Your web application is <strong>60%</strong> complete.</small>
                                      </dd>
                                  </dl>
                              </div>
                          </div>
                          <div className="row m-t-sm">
                              <div className="col-lg-12">
                              <div className="panel blank-panel">
                              <div className="panel-heading">
                                  <div className="panel-options">
                                      <ul className="nav nav-tabs">
                                          <li className="active"><a href="#tab-1" data-toggle="tab">Dashboard</a></li>
                                          <li className=""><a href="#tab-2" data-toggle="tab">Last activity</a></li>
                                      </ul>
                                  </div>
                              </div>

                              <div className="panel-body">

                              <div className="tab-content">
                              <div className="tab-pane active" id="tab-1">
                            <div className="ibox-content">
                                  <div>
                                      <span className="pull-right text-right">
                                      <small>Average number of tasks completed per day: <strong>38</strong></small>
                                          <br/>
                                          Total tasks completed: 243
                                      </span>
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
                                      <input type="text" placeholder="Add new task. " className="input input-sm form-control"/>
                                      <span className="input-group-btn">
                                              <button type="button" className="btn btn-sm btn-white"> <i className="fa fa-plus"></i> Add task</button>
                                      </span>
                                  </div>

                                  <ul className="sortable-list connectList agile-list" id="todo">
                                      <li className="warning-element" id="task1">
                                          Simply dummy text of the printing and typesetting industry.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                              <i className="fa fa-clock-o"></i> 12.10.2015
                                          </div>
                                      </li>
                                      <li className="success-element" id="task2">
                                          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                              <i className="fa fa-clock-o"></i> 05.04.2015
                                          </div>
                                      </li>
                                      <li className="info-element" id="task3">
                                          Sometimes by accident, sometimes on purpose (injected humour and the like).
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                              <i className="fa fa-clock-o"></i> 16.11.2015
                                          </div>
                                      </li>
                                      <li className="danger-element" id="task4">
                                          All the Lorem Ipsum generators
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-primary">Done</a>
                                              <i className="fa fa-clock-o"></i> 06.10.2015
                                          </div>
                                      </li>
                                      <li className="warning-element" id="task5">
                                          Which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                              <i className="fa fa-clock-o"></i> 09.12.2015
                                          </div>
                                      </li>
                                      <li className="warning-element" id="task6">
                                          Packages and web page editors now use Lorem Ipsum as
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-primary">Done</a>
                                              <i className="fa fa-clock-o"></i> 08.04.2015
                                          </div>
                                      </li>
                                      <li className="success-element" id="task7">
                                          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                              <i className="fa fa-clock-o"></i> 05.04.2015
                                          </div>
                                      </li>
                                      <li className="info-element" id="task8">
                                          Sometimes by accident, sometimes on purpose (injected humour and the like).
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                              <i className="fa fa-clock-o"></i> 16.11.2015
                                          </div>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>

                      <div className="col-lg-4">
                          <div className="ibox">
                              <div className="ibox-content">
                                  <h3>In Progress</h3>
                                  <p className="small"><i className="fa fa-hand-o-up"></i> Drag task between list</p>
                                  <ul className="sortable-list connectList agile-list" id="inprogress">
                                      <li className="success-element" id="task9">
                                          Quisque venenatis ante in porta suscipit.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                              <i className="fa fa-clock-o"></i> 12.10.2015
                                          </div>
                                      </li>
                                      <li className="success-element" id="task10">
                                          Phasellus sit amet tortor sed enim mollis accumsan in consequat orci.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                              <i className="fa fa-clock-o"></i> 05.04.2015
                                          </div>
                                      </li>
                                      <li className="warning-element" id="task11">
                                          Nunc sed arcu at ligula faucibus tempus ac id felis. Vestibulum et nulla quis turpis sagittis fringilla.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                              <i className="fa fa-clock-o"></i> 16.11.2015
                                          </div>
                                      </li>
                                      <li className="warning-element" id="task12">
                                          Ut porttitor augue non sapien mollis accumsan.
                                          Nulla non elit eget lacus elementum viverra.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                              <i className="fa fa-clock-o"></i> 09.12.2015
                                          </div>
                                      </li>
                                      <li className="info-element" id="task13">
                                          Packages and web page editors now use Lorem Ipsum as
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-primary">Done</a>
                                              <i className="fa fa-clock-o"></i> 08.04.2015
                                          </div>
                                      </li>
                                      <li className="success-element" id="task14">
                                          Quisque lacinia tellus et odio ornare maximus.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                              <i className="fa fa-clock-o"></i> 05.04.2015
                                          </div>
                                      </li>
                                      <li className="danger-element" id="task15">
                                          Enim mollis accumsan in consequat orci.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                              <i className="fa fa-clock-o"></i> 11.04.2015
                                          </div>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-4">
                          <div className="ibox">
                              <div className="ibox-content">
                                  <h3>Completed</h3>
                                  <p className="small"><i className="fa fa-hand-o-up"></i> Drag task between list</p>
                                  <ul className="sortable-list connectList agile-list" id="completed">
                                      <li className="info-element" id="task16">
                                          Sometimes by accident, sometimes on purpose (injected humour and the like).
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                              <i className="fa fa-clock-o"></i> 16.11.2015
                                          </div>
                                      </li>
                                      <li className="warning-element" id="task17">
                                          Ut porttitor augue non sapien mollis accumsan.
                                          Nulla non elit eget lacus elementum viverra.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                              <i className="fa fa-clock-o"></i> 09.12.2015
                                          </div>
                                      </li>
                                      <li className="warning-element" id="task18">
                                          Which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                              <i className="fa fa-clock-o"></i> 09.12.2015
                                          </div>
                                      </li>
                                      <li className="warning-element" id="task19">
                                          Packages and web page editors now use Lorem Ipsum as
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-primary">Done</a>
                                              <i className="fa fa-clock-o"></i> 08.04.2015
                                          </div>
                                      </li>
                                      <li className="success-element" id="task20">
                                          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                              <i className="fa fa-clock-o"></i> 05.04.2015
                                          </div>
                                      </li>
                                      <li className="info-element" id="task21">
                                          Sometimes by accident, sometimes on purpose (injected humour and the like).
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                              <i className="fa fa-clock-o"></i> 16.11.2015
                                          </div>
                                      </li>
                                      <li className="warning-element" id="task22">
                                          Simply dummy text of the printing and typesetting industry.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                              <i className="fa fa-clock-o"></i> 12.10.2015
                                          </div>
                                      </li>
                                      <li className="success-element" id="task23">
                                          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.
                                          <div className="agile-detail">
                                              <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                              <i className="fa fa-clock-o"></i> 05.04.2015
                                          </div>
                                      </li>
                                  </ul>
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
