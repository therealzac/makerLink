var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventConstants = require('../constants/eventConstants.js');

var EventStore = new Store(AppDispatcher);

var _events = {};

EventStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case EventConstants.EVENT_RECEIVED:
      addEvent(payload.calendar);
      EventStore.__emitChange();
      break;

    case EventConstants.EVENTS_RECEIVED:
      setEvents(payload.calendar);
      EventStore.__emitChange();
      break;
  }
}

var setEvents = function (calendar) {
  var events = calendar.events.items;

  events.forEach(function (event) {
    event.title = event.summary;
  })

  _events = events;
}

var addEvent = function (calendar) {
  _events.push(calendar.event);
}

EventStore.clearEvents = function () {
  _events = {};
}

EventStore.getEvents = function () {
  return _events;
}

module.exports = EventStore;
