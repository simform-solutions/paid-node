'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Transaction(json, apiMethod) {
  _.extend(this, new APIResource(json, apiMethod));
}

Transaction = _.extend(Transaction, {

  all: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.all);
    return new APIMethod("get", "/transactions", methodArgs, undefined, APIList.constructBldr(Transaction)).execute();
  },
  list: this.all,

  retrieve: function(id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.retrieve);
    return new APIMethod("get", "/transactions/:id", methodArgs, undefined, APIResource.constructBldr(Transaction)).execute();
  },
  find: this.retrieve,

  create: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.create);
    return new APIMethod("post", "/transactions", methodArgs, undefined, APIResource.constructBldr(Transaction)).execute();
  },

  // These are roughly the same as the ones on the prototype, but don't require a new Transaction().
  update: function(id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.update);
    return new APIMethod("put", "/transactions/:id", methodArgs, undefined, APIResource.constructBldr(Transaction)).execute();
  },

  markAsPaid: function(id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.markAsPaid);
    return new APIMethod("post", "/transactions/:id/mark_as_paid", methodArgs, undefined, APIResource.constructBldr(Transaction)).execute();
  },

});

Transaction.prototype = {

  save: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.prototype.save);
    methodArgs.params = _.extend(this, methodArgs.params);
    return new APIMethod("put", "/transactions/:id", methodArgs, this, APIResource.constructBldr(Transaction)).execute();
  },

  markAsPaid: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.prototype.markAsPaid);
    return new APIMethod("post", "/transactions/:id/mark_as_paid", methodArgs, this, APIResource.constructBldr(Transaction)).execute();
  },

};

module.exports = Transaction;
