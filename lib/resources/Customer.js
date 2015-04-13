'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Customer(json, apiMethod) {
  _.extend(this, new APIResource(json, apiMethod));
}

Customer = _.extend(Customer, {

  all: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Customer.all);
    return new APIMethod("get", "/customers", methodArgs, undefined, APIList.constructBldr(Customer)).execute();
  },
  list: this.all,

  retrieve: function(id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Customer.retrieve);
    return new APIMethod("get", "/customers/:id", methodArgs, undefined, APIResource.constructBldr(Customer)).execute();
  },
  find: this.retrieve,

  byExternalId: function(external_id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Customer.byExternalId);
    return new APIMethod("get", "/customers/by_external_id", methodArgs, undefined, APIResource.constructBldr(Customer)).execute();
  },

  create: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Customer.create);
    return new APIMethod("post", "/customers", methodArgs, undefined, APIResource.constructBldr(Customer)).execute();
  },

  // These are roughly the same as the ones on the prototype, but don't require a new Customer().
  update: function(id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Customer.update);
    return new APIMethod("put", "/customers/:id", methodArgs, undefined, APIResource.constructBldr(Customer)).execute();
  },

  generateInvoice: function(id, params, headers, callback) {
    var Invoice = require('./Invoice');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.generateInvoice);
    return new APIMethod("post", "/customers/:id/generate_invoice", methodArgs, undefined, APIResource.constructBldr(Invoice)).execute();
  },

  invoices: function(id, params, headers, callback) {
    var Invoice = require('./Invoice');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.invoices);
    return new APIMethod("get", "/invoices?customer_id=:id", methodArgs, undefined, APIList.constructBldr(Invoice)).execute();
  },

  transactions: function(id, params, headers, callback) {
    var Transaction = require('./Transaction');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.transactions);
    return new APIMethod("get", "/transactions?customer_id=:id", methodArgs, undefined, APIList.constructBldr(Transaction)).execute();
  },

});

Customer.prototype = {

  save: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Customer.prototype.save);
    methodArgs.params = _.extend(this, methodArgs.params);
    return new APIMethod("put", "/customers/:id", methodArgs, this, APIResource.constructBldr(Customer)).execute();
  },

  generateInvoice: function(params, headers, callback) {
    var Invoice = require('./Invoice');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.prototype.generateInvoice);
    return new APIMethod("post", "/customers/:id/generate_invoice", methodArgs, this, APIResource.constructBldr(Invoice)).execute();
  },

  invoices: function(params, headers, callback) {
    var Invoice = require('./Invoice');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.prototype.invoices);
    return new APIMethod("get", "/invoices?customer_id=:id", methodArgs, this, APIList.constructBldr(Invoice)).execute();
  },

  transactions: function(params, headers, callback) {
    var Transaction = require('./Transaction');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.prototype.transactions);
    return new APIMethod("get", "/transactions?customer_id=:id", methodArgs, this, APIList.constructBldr(Transaction)).execute();
  },

};

module.exports = Customer;
