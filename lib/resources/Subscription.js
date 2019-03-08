'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Subscription(apiKey, json, apiMethod) {
  if(!(this instanceof Subscription)) {
    return new Subscription(json, apiMethod);
  }
  _.extend(this, new APIResource(json, apiMethod));
  this.apiKey = apiKey;
}

var staticApi = {

  all: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Subscription.all);
    return new APIMethod("get", "/subscriptions", methodArgs, undefined, APIList.constructBldr(_.bind(Subscription, null, this.apiKey)), this.apiKey).execute();
  },

  retrieve: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Subscription.retrieve);
    return new APIMethod("get", "/subscriptions/:id", methodArgs, undefined, APIResource.constructBldr(_.bind(Subscription, null, this.apiKey)), this.apiKey).execute();
  },

  create: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Subscription.create);
    return new APIMethod("post", "/subscriptions", methodArgs, undefined, APIResource.constructBldr(_.bind(Subscription, null, this.apiKey)), this.apiKey).execute();
  },

  // These are roughly the same as the ones on the prototype, but don't require a new Subscription().
  cancel: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Subscription.cancel);
    return new APIMethod("post", "/subscriptions/:id/cancel", methodArgs, undefined, APIResource.constructBldr(_.bind(Subscription, null, this.apiKey)), this.apiKey).execute();
  },

};

Subscription = _.extend(
  Subscription,
  staticApi,
  // assign aliases
  {
    list: this.all,
    find: this.retrieve,
  }
);

Subscription.prototype = {

  cancel: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Subscription.prototype.cancel);
    return new APIMethod("post", "/subscriptions/:id/cancel", methodArgs, this, APIResource.constructBldr(_.bind(Subscription, null, this.apiKey)), this.apiKey).execute();
  },

};

module.exports = Subscription;
