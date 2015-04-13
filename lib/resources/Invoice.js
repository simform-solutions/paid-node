'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Invoice(json, apiMethod) {
  _.extend(this, new APIResource(json, apiMethod));
}

Invoice = _.extend(Invoice, {

  all: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.all);
    return new APIMethod("get", "/invoices", methodArgs, undefined, APIList.constructBldr(Invoice)).execute();
  },
  list: this.all,

  retrieve: function(id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.retrieve);
    return new APIMethod("get", "/invoices/:id", methodArgs, undefined, APIResource.constructBldr(Invoice)).execute();
  },
  find: this.retrieve,

  create: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.create);
    return new APIMethod("post", "/invoices", methodArgs, undefined, APIResource.constructBldr(Invoice)).execute();
  },

  // These are roughly the same as the ones on the prototype, but don't require a new Invoice().
  issue: function(id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.issue);
    return new APIMethod("post", "/invoices/:id/issue", methodArgs, undefined, APIResource.constructBldr(Invoice)).execute();
  },

  markAsPaid: function(id, params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.markAsPaid);
    return new APIMethod("post", "/invoices/:id/mark_as_paid", methodArgs, undefined, APIResource.constructBldr(Invoice)).execute();
  },

});

Invoice.prototype = {

  issue: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.issue);
    return new APIMethod("post", "/invoices/:id/issue", methodArgs, this, APIResource.constructBldr(Invoice)).execute();
  },

  markAsPaid: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Invoice.markAsPaid);
    return new APIMethod("post", "/invoices/:id/mark_as_paid", methodArgs, this, APIResource.constructBldr(Invoice)).execute();
  },

};

module.exports = Invoice;
