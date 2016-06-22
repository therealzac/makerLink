// Let's make <Card text='Write the docs' /> draggable!

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

var Card = React.createClass({
  propTypes: {
    text: PropTypes.string.isRequired,

    // Injected by React DnD:
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
  },

  render: function () {
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;
    var text = "CARD!!";

    return connectDragSource(
      <li className="info-element">
        {text}
      </li>
    );
  }
});

// Export the wrapped component:
module.exports = DragSource("KanbanItem", source, collect)(Card);
