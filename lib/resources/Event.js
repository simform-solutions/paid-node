'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Event(json, apiMethod) {
  _.extend(this, new APIResource(json, apiMethod));
}

Event = _.extend(Event, {

  all: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Event.all);
    return new APIMethod("get", "/events", methodArgs, undefined, APIList.constructBldr(Event)).execute();
  },
  list: this.all,

  retrieve: function(id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Event.retrieve);
    return new APIMethod("get", "/events/:id", methodArgs, undefined, APIResource.constructBldr(Event)).execute();
  },

});

Event.prototype = {

};

module.exports = Event;
