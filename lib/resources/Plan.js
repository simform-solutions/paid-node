'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Plan(json, apiMethod) {
  if(!(this instanceof Plan)) {
    return new Plan(json, apiMethod);
  }
  _.extend(this, new APIResource(json, apiMethod));
}

Plan = _.extend(Plan, {

  all: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Plan.all);
    return new APIMethod("get", "/plans", methodArgs, undefined, APIList.constructBldr(Plan)).execute();
  },
  list: this.all,

  retrieve: function(id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Plan.retrieve);
    return new APIMethod("get", "/plans/:id", methodArgs, undefined, APIResource.constructBldr(Plan)).execute();
  },
  find: this.retrieve,

  create: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Plan.create);
    return new APIMethod("post", "/plans", methodArgs, undefined, APIResource.constructBldr(Plan)).execute();
  },

});

Plan.prototype = {

};

module.exports = Plan;
