var React = require('react');
var KanbanItem = require('./kanbanItem.jsx');
var ApiUtil = require('../../util/apiUtil.js');

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

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

var Column = React.createClass({
  propTypes: {
    // column: PropTypes.object.isRequired,
  // x: PropTypes.number.isRequired,
  // y: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired
},
  getInitialState: function () {
    return {}
  },

  componentWillReceiveProps: function (nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      // You can use this as enter handler
    }

    if (this.props.isOver && !nextProps.isOver) {
      // You can use this as leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }

    this.setState(nextProps);
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
    // Your component receives its own props as usual
    var position = this.props.position;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    var isOver = this.props.isOver;
    var canDrop = this.props.canDrop;
    var connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <ul className="sortable-list connectList agile-list">
        { this.renderTasks() }
      </ul>
    )
  }
});


module.exports = DropTarget("KanbanItem", ColumnTarget, collect)(Column);
