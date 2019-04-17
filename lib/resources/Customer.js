'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Customer(apiKey, json, apiMethod) {
  if(!(this instanceof Customer)) {
    return new Customer(apiKey, json, apiMethod);
  }
  _.extend(this, new APIResource(json, apiMethod));
  this.apiKey = apiKey;
}

var staticApi = {

  all: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Customer.all);
    return new APIMethod("get", "/customers", methodArgs, undefined, APIList.constructBldr(_.bind(Customer, null, this.apiKey)), this.apiKey).execute();
  },

  retrieve: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Customer.retrieve);
    return new APIMethod("get", "/customers/:id", methodArgs, undefined, APIResource.constructBldr(_.bind(Customer, null, this.apiKey)), this.apiKey).execute();
  },

  byExternalId: function(external_id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Customer.byExternalId);
    return new APIMethod("get", "/customers/by_external_id", methodArgs, undefined, APIResource.constructBldr(_.bind(Customer, null, this.apiKey)), this.apiKey).execute();
  },

  create: function(params, headers ) {
    var methodArgs = APIResource.prepareArguments(arguments, Customer.create);
    return new APIMethod("post", "/customers", methodArgs, undefined, APIResource.constructBldr(_.bind(Customer, null, this.apiKey)), this.apiKey).execute();
  },

  // These are roughly the same as the ones on the prototype, but don't require a new Customer().
  update: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Customer.update);
    return new APIMethod("put", "/customers/:id", methodArgs, undefined, APIResource.constructBldr(_.bind(Customer, null, this.apiKey)), this.apiKey).execute();
  },

  generateInvoice: function(id, params, headers) {
    var Invoice = require('./Invoice');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.generateInvoice);
    return new APIMethod("post", "/customers/:id/generate_invoice", methodArgs, undefined, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  generateInvoices: function(id, params, headers) {
    var Invoice = require('./Invoice');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.generateInvoice);
    return new APIMethod("post", "/customers/:id/generate_invoices", methodArgs, undefined, APIList.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  invoices: function(id, params, headers) {
    var Invoice = require('./Invoice');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.invoices);
    return new APIMethod("get", "/invoices?customer_id=:id", methodArgs, undefined, APIList.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  transactions: function(id, params, headers) {
    var Transaction = require('./Transaction');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.transactions);
    return new APIMethod("get", "/transactions?customer_id=:id", methodArgs, undefined, APIList.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  },

};

Customer = _.extend(
  Customer,
  staticApi,
  // assign aliases
  {
    list: staticApi.all,
    find: staticApi.retrieve,
  }
);

Customer.prototype = {

  save: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Customer.prototype.save);
    methodArgs.params = _.extend(this, methodArgs.params);
    return new APIMethod("put", "/customers/:id", methodArgs, this, APIResource.constructBldr(_.bind(Customer, null, this.apiKey)), this.apiKey).execute();
  },

  generateInvoice: function(params, headers) {
    var Invoice = require('./Invoice');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.prototype.generateInvoice);
    return new APIMethod("post", "/customers/:id/generate_invoice", methodArgs, this, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  generateInvoices: function(params, headers) {
    var Invoice = require('./Invoice');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.prototype.generateInvoice);
    return new APIMethod("post", "/customers/:id/generate_invoices", methodArgs, this, APIList.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  invoices: function(params, headers) {
    var Invoice = require('./Invoice');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.prototype.invoices);
    return new APIMethod("get", "/invoices?customer_id=:id", methodArgs, this, APIList.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  transactions: function(params, headers) {
    var Transaction = require('./Transaction');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.prototype.transactions);
    return new APIMethod("get", "/transactions?customer_id=:id", methodArgs, this, APIList.constructBldr(_.bind(Transaction, null, this.apiKey)), this.apiKey).execute();
  },

  addCard: function(params, headers) {
    var Card = require('./Card');
    var methodArgs = APIResource.prepareArguments(arguments, Customer.prototype.addCard);
    return new APIMethod("post", "/customers/:id/cards", methodArgs, this, APIResource.constructBldr(_.bind(Card, null, this.apiKey)), this.apiKey).execute();
  },

};

module.exports = Customer;
