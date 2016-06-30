var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var ChannelConstants = require('../constants/channelConstants.js');
var ApiUtil = require('../util/apiUtil.js');

var ChannelStore = new Store(AppDispatcher);

var _channel = {};

ChannelStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ChannelConstants.CHANNEL_RECEIVED:
      setChannel(payload.channel);
      ChannelStore.__emitChange();
      break;
  }
}

var setChannel = function (channel) {
  _channel = channel;
}

var clearChannel = function () {
  _channel = {};
}

ChannelStore.getChannel = function () {
  return _channel;
}

module.exports = ChannelStore;
