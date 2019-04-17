'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Plan(apiKey, json, apiMethod) {
  if(!(this instanceof Plan)) {
    return new Plan(json, apiMethod);
  }
  _.extend(this, new APIResource(json, apiMethod));
  this.apiKey = apiKey;
}

var staticApi = {

  all: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Plan.all);
    return new APIMethod("get", "/plans", methodArgs, undefined, APIList.constructBldr(_.bind(Plan, null, this.apiKey)), this.apiKey).execute();
  },

  retrieve: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Plan.retrieve);
    return new APIMethod("get", "/plans/:id", methodArgs, undefined, APIResource.constructBldr(_.bind(Plan, null, this.apiKey)), this.apiKey).execute();
  },

  create: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Plan.create);
    return new APIMethod("post", "/plans", methodArgs, undefined, APIResource.constructBldr(_.bind(Plan, null, this.apiKey)), this.apiKey).execute();
  },

};

Plan = _.extend(
  Plan,
  staticApi,
  // assign aliases
  {
    list: this.all,
    find: this.retrieve,
  }
);

Plan.prototype = {

};

module.exports = Plan;
