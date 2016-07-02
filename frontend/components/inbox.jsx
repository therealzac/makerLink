const React = require('react');
const ApiUtil = require('../util/apiUtil.js');
const LinkedStateMixin = require('react-addons-linked-state-mixin');

const Inbox = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return this.props;
  },

  componentDidMount: function () {
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(newProps);
  },

  updateMessage: function (e) {
    e.preventDefault();

    this.setState({message: e.currentTarget});
  },

  sendMessage: function () {
    var text = this.state.message.value;
    var username = this.state.user.first_name;
    var channel = this.state.project.slack_id;

    ApiUtil.postMessageToChannel(text, username, channel, this.resetEntry);
  },

  resetEntry: function () {
    this.setState({message: {}});
  },

  parseDate: function (timestamp) {
    var created = new Date(parseInt(timestamp) * 1000);

    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]

    var date = [
       monthNames[created.getMonth()],
       created.getDate() + ",",
       created.getFullYear() + ",",
    ].join(" ");

    var time = [
      created.getHours() % 12,
      created.getMinutes() < 10 ? "0" + created.getMinutes() : created.getMinutes()
    ].join(":");

    var timeSuffix = created.getHours() < 12 ? "AM" : "PM";

    return [date, time, timeSuffix].join(" ");
  },

  renderMessages: function () {
    if (!this.state.channel || !this.state.channel.messages) { return }

    var self = this;
    var messages = this.state.channel.messages.slice(0);
    messages.reverse();

    return (
      messages.map(function(message, idx){

        return (
          <tr className="read" key={idx}>
            <td className="mail-ontact"><a>{message.username}</a></td>
            <td className="mail-subject"><a>{message.text}</a></td>
            <td className="text-right mail-date">{self.parseDate(message.ts)}</td>
          </tr>
        )
      })
    );
  },

  render: function () {
    var messageEntry = this.state.message ? this.state.message.value : "";
    return(
        <div className="wrapper wrapper-content">
        <div className="row">
            <div className="col-lg-12 animated fadeInRight">
            <div className="mail-box-header">

                <h2>
                  {this.state.project.name}
                </h2>

                <div className="mail-tools tooltip-demo m-t-md">

                    <div className="btn-group pull-right">
                        <button className="btn btn-white btn-sm"><i className="fa fa-arrow-left"></i></button>
                        <button className="btn btn-white btn-sm"><i className="fa fa-arrow-right"></i></button>
                    </div>

                    <button className="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Refresh inbox"><i className="fa fa-refresh"></i> Refresh</button>
                </div>
            </div>
                <div className="mail-box">

                <table className="table table-hover table-mail">
                  <tbody>
                    { this.renderMessages() }
                  </tbody>
                </table>
                <div className="input-group">
                    <input type="text" className="form-control input-sm" value={messageEntry} onChange={this.updateMessage}/>
                      <div className="input-group-btn">
                          <button type="send" className="btn btn-sm btn-primary" onClick={this.sendMessage}>
                              Send
                          </button>
                      </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Inbox;
