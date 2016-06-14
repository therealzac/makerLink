var React = require('react');
var ProjectIndexItem = require('./projectIndexItem.jsx');

var ProjectIndex = React.createClass({
  getInitialState: function () {
    return this.props;
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(newProps);
  },

  renderColumns: function () {
    var dev = this.state.dev,
        admin = this.state.admin,
        projects = this.state.projects;

    var columnSize = Math.ceil(projects.length / 4);
    var columns = [];

    // Index projects while rendering them for O(1) update.
    var projectIdx = 0;

    for (var i = 0; i < 4; i++) {
      columns.push(projects.slice(i * columnSize, (i + 1) * columnSize));
    }

    return columns.map(function (column, colIdx) {
      return (
        <div className="col-md-3" key={colIdx}>
          {
            column.map(function(project, rowIdx) {
              project.projectIdx = projectIdx;
              projectIdx++;

              return (
                <ProjectIndexItem
                  dev={dev}
                  admin={admin}
                  key={projectIdx}
                  project={project}>
                </ProjectIndexItem>
              )
            })
          }
        </div>
      )
    });
  },

  render: function () {
    return (
        <div className="ibox-content" style={{background: "rgba(0, 0, 0, 0.1)"}}>
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                  { this.renderColumns() }
                </div>
            </div>
        </div>
    );
  }
});

module.exports = ProjectIndex;
