'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Event(apiKey, json, apiMethod) {
  if(!(this instanceof Event)) {
    return new Event(json, apiMethod);
  }
  _.extend(this, new APIResource(json, apiMethod));
  this.apiKey = apiKey;
}

var staticApi = {

  all: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Event.all);
    return new APIMethod("get", "/events", methodArgs, undefined, APIList.constructBldr(_.bind(Event, null, this.apiKey)), this.apiKey).execute();
  },

  retrieve: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Event.retrieve);
    return new APIMethod("get", "/events/:id", methodArgs, undefined, APIResource.constructBldr(_.bind(Event, null, this.apiKey)), this.apiKey).execute();
  },

};

Event = _.extend(
  Event,
  staticApi,
  // assign aliases
  {
    list: this.all,
  }
);

Event.prototype = {

};

module.exports = Event;
