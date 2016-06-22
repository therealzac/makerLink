var React = require('react');
var KanbanItem = require('./kanbanItem.jsx');
var findDOMNode = require('react-dom').findDOMNode;
var DropTarget = require('react-dnd').DropTarget;
var PropTypes = React.PropTypes;
var self = this;

var ColumnTarget = {
  canDrop: function (props, monitor) {
    // You can disallow drop based on props or item
    var thisColumn = monitor.getItem();
    console.log("dragging!");
    // console.log(thisColumn);
    return true;
  },

  hover: function (props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    var clientOffset = monitor.getClientOffset();
    var componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    var isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    var canDrop = monitor.canDrop();
  },

  drop: function (props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    var item = monitor.getItem();

    // You can do something with it
    ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};


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
  getInitialState: function () {
    return {}
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
    var self = this;
    var idx;

    return (
      <ul className="sortable-list connectList agile-list">
        { this.renderTasks() }
      </ul>
    )
  }
});

module.exports = DropTarget("KanbanItem", ColumnTarget, collect)(Column);
