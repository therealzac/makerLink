var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var MessageConstants = require('../constants/sessionConstants.js');
var ApiUtil = require('../util/apiUtil.js');
var History = require('react-router').History;

var MessageStore = new Store(AppDispatcher);

var initialMessages = {
  receivedMessages: [],
  unreadMessages: [],
  sentMessages: [],
  drafts: [],
  trash: []
}

var _messages = initialMessages;

MessageStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case MessageConstants.MESSAGES_RECIEVED:
      setMessages(payload.messages);
      __emitChange();
      break;
  }
}

var setMessages = function (messages) {
  _messages = messages;
}

var clearMessages = function () {
  _messages = initialMessages
}

MessageStore.getMessages = function () {
  return _messages;
}

module.exports = MessageStore;
