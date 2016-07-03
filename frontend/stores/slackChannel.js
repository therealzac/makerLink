var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var ChannelConstants = require('../constants/channelConstants.js');
var ApiUtil = require('../util/apiUtil.js');

var ChannelStore = new Store(AppDispatcher);

var _channel = {};

ChannelStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ChannelConstants.SLACK_RECEIVED:
      setChannel(payload.slack);
      ChannelStore.__emitChange();
      break;

    case ChannelConstants.SLACK_MESSAGE_RECEIVED:
      addMessage(payload.message);
      ChannelStore.__emitChange();
      break;
  }
}

var setChannel = function (slack) {
  _channel = slack.channel;
}

var addMessage = function (message) {
  _channel.messages.unshift(message);
  if (_channel.messages.length > 6 ) { _channel.messages.pop() };
}

var clearChannel = function () {
  _channel = {};
}

ChannelStore.getChannel = function () {
  return _channel;
}

module.exports = ChannelStore;
