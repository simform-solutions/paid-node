'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Subscription(json, apiMethod) {
  _.extend(this, new APIResource(json, apiMethod));
}

Subscription = _.extend(Subscription, {

  all: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Subscription.all);
    return new APIMethod("get", "/subscriptions", methodArgs, undefined, APIList.constructBldr(Subscription)).execute();
  },
  list: this.all,

  retrieve: function(id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Subscription.retrieve);
    return new APIMethod("get", "/subscriptions/:id", methodArgs, undefined, APIResource.constructBldr(Subscription)).execute();
  },
  find: this.retrieve,

  create: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Subscription.create);
    return new APIMethod("post", "/subscriptions", methodArgs, undefined, APIResource.constructBldr(Subscription)).execute();
  },

  // These are roughly the same as the ones on the prototype, but don't require a new Subscription().
  cancel: function(id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Subscription.cancel);
    return new APIMethod("post", "/subscriptions/:id/cancel", methodArgs, undefined, APIResource.constructBldr(Subscription)).execute();
  },

});

Subscription.prototype = {

  cancel: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Subscription.prototype.cancel);
    return new APIMethod("post", "/subscriptions/:id/cancel", methodArgs, this, APIResource.constructBldr(Subscription)).execute();
  },

};

module.exports = Subscription;
