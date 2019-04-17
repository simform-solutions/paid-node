'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Transaction(apiKey, json, apiMethod) {
  if(!(this instanceof Transaction)) {
    return new Transaction(json, apiMethod);
  }
  _.extend(this, new APIResource(json, apiMethod));
  this.apiKey = apiKey;
}

var staticApi = {

  all: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.all);
    return new APIMethod("get", "/transactions", methodArgs, undefined, APIList.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  },

  retrieve: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.retrieve);
    return new APIMethod("get", "/transactions/:id", methodArgs, undefined, APIResource.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  },

  create: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.create);
    return new APIMethod("post", "/transactions", methodArgs, undefined, APIResource.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  },

  // These are roughly the same as the ones on the prototype, but don't require a new Transaction().
  update: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.update);
    return new APIMethod("put", "/transactions/:id", methodArgs, undefined, APIResource.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  },

  delete: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.delete);
    return new APIMethod("delete", "/transactions/:id", methodArgs, undefined, APIResource.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  },

  markAsPaid: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.markAsPaid);
    return new APIMethod("post", "/transactions/:id/mark_as_paid", methodArgs, undefined, APIResource.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  },

  createRefund: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.createRefund);
    return new APIMethod("post", "/transactions/:id/refunds", methodArgs, undefined, APIResource.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  }

}

Transaction = _.extend(
  Transaction,
  staticApi,
  // assign aliases
  {
    list: this.all,
    find: this.retrieve,
  }
);

Transaction.prototype = {

  save: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.prototype.save);
    methodArgs.params = _.extend(this, methodArgs.params);
    return new APIMethod("put", "/transactions/:id", methodArgs, this, APIResource.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  },

  delete: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.prototype.delete);
    methodArgs.params = _.extend(this, methodArgs.params);
    return new APIMethod("delete", "/transactions/:id", methodArgs, this, APIResource.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  },

  markAsPaid: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.prototype.markAsPaid);
    return new APIMethod("post", "/transactions/:id/mark_as_paid", methodArgs, this, APIResource.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  },

  createRefund: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Transaction.prototype.createRefund);
    return new APIMethod("post", "/transactions/:id/refunds", methodArgs, this, APIResource.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  }

};

module.exports = Transaction;
