var React = require('react');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;

/**
 * Implements the drag source contract.
 */
var source = {
  beginDrag: function (props) {
    return {
      text: props.text
    };
  }
}

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


var KanbanItem = React.createClass({
  propTypes: {
    task: PropTypes.object.isRequired,

    // Injected by React DnD:
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
  },

  getInitialState: function () {
    return this.props;
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(newProps);
  },

  sendTask: function () {
    this.state.handleTaskUpdateCallback(this.state.task);
  },

  render: function () {
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;

    return connectDragSource(
      <li className="info-element" onMouseUp={this.sendTask}>
        {this.state.task.body}
        <div className="agile-detail">
          <i className="fa fa-clock-o"></i> {this.state.task.updated_at}
        </div>
      </li>
    )
  }
});

module.exports = DragSource("KanbanItem", source, collect)(KanbanItem);
