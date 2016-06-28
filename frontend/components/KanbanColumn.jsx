var React = require('react');
var KanbanItem = require('./kanbanItem.jsx');
var ApiUtil = require('../util/apiUtil.js');

var PropTypes = React.PropTypes;

var DropTarget = require('react-dnd').DropTarget;
var findDOMNode = require('react-dom').findDOMNode;

var ColumnTarget = {
  canDrop: function (props, monitor) {
    var item = monitor.getItem();
    return true;
  },

  hover: function (props, monitor, component) {
    var clientOffset = monitor.getClientOffset();
    var componentRect = findDOMNode(component).getBoundingClientRect();
    var isJustOverThisOne = monitor.isOver({ shallow: true });
    var canDrop = monitor.canDrop();
  },

  drop: function (props, monitor, component) {
    var task = monitor.getItem();

    if (monitor.didDrop() || task.status === props.statusCode) { return }

    task.status = props.statusCode;

    ApiUtil.updateTask(task, props.projectIdx);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

var Column = React.createClass({
  propTypes: {
    isOver: PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return this.props;
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(newProps);
  },

    renderTasks: function () {
      if (!this.state.tasks) { return }
      return this.state.tasks.map(function (task, idx) {
          return (
              <KanbanItem
                task={task}
                key={idx}>
              </KanbanItem>
            )
        });
    },

  render: function () {
    // ReactDND vars:
    var position = this.props.position,
        isOver = this.props.isOver,
        canDrop = this.props.canDrop,
        connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <ul className="sortable-list connectList agile-list">
        { this.renderTasks() }
      </ul>
    )
  }
});


module.exports = DropTarget("KanbanItem", ColumnTarget, collect)(Column);
