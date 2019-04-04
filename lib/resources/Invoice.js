'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Invoice(apiKey, json, apiMethod) {
  if(!(this instanceof Invoice)) {
    return new Invoice(json, apiMethod);
  }
  _.extend(this, new APIResource(json, apiMethod));
  this.apiKey = apiKey;
}

var staticApi = {

  all: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.all);
    return new APIMethod("get", "/invoices", methodArgs, undefined, APIList.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  retrieve: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.retrieve);
    return new APIMethod("get", "/invoices/:id", methodArgs, undefined, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  create: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.create);
    return new APIMethod("post", "/invoices", methodArgs, undefined, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  // These are roughly the same as the ones on the prototype, but don't require a new Invoice().
  issue: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.issue);
    return new APIMethod("post", "/invoices/:id/issue", methodArgs, undefined, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  markAsPaid: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.markAsPaid);
    return new APIMethod("post", "/invoices/:id/mark_as_paid", methodArgs, undefined, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  void: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.void);
    return new APIMethod("post", "/invoices/:id/void", methodArgs, undefined, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  update: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.void);
    return new APIMethod("put", "/invoices/:id", methodArgs, undefined, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  charge: function(id, params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.charge);
    return new APIMethod("post", "/invoices/:id/charge", methodArgs, this, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },
};

Invoice = _.extend(
  Invoice,
  staticApi,
  // assign aliases
  {
    list: this.all,
    find: this.retrieve,
  }
);

Invoice.prototype = {

  issue: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.issue);
    return new APIMethod("post", "/invoices/:id/issue", methodArgs, this, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  charge: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.charge);
    return new APIMethod("post", "/invoices/:id/charge", methodArgs, this, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  markAsPaid: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.markAsPaid);
    return new APIMethod("post", "/invoices/:id/mark_as_paid", methodArgs, this, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  void: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.void);
    return new APIMethod("post", "/invoices/:id/void", methodArgs, this, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

  update: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.prototype.update);
    return new APIMethod("put", "/invoices/:id", methodArgs, this, APIResource.constructBldr(_.bind(Invoice, null, this.apiKey)), this.apiKey).execute();
  },

};

module.exports = Invoice;
