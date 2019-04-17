'use strict';

var _ = require('lodash');

var Account = require('./resources/Account');
var Customer = require('./resources/Customer');
var Event = require('./resources/Event');
var Invoice = require('./resources/Invoice');
var Plan = require('./resources/Plan');
var Subscription = require('./resources/Subscription');
var Transaction = require('./resources/Transaction');

var staticApi = {
  Account: Account,
  Customer: Customer,
  Event: Event,
  Invoice: Invoice,
  Plan: Plan,
  Subscription: Subscription,
  Transaction: Transaction,
};

function Paid(apiKey) {
  var self = this;
  this.apiKey = apiKey;

  // pass context to the functions to be able to use particular apiKey
  // attach those functions to the Paid object
  _.assign(this, _.mapValues(_.cloneDeep(staticApi), function (funcGroup) {
    return _.mapValues(funcGroup, function (func) {
      if(typeof func === 'function') {
        return _.bind(func, self);
      }
    });
  }));
}

Paid = _.extend(Paid, {
  apiKey: null,

  apiBase: "https://api.paidapi.com/v0",
  apiStaging: "https://api-staging.paidapi.com/v0",
  apiVersion: "v0",
  supportEmail: "support@paidapi.com",
  docsUrl: "https://paidapi.com/docs",
}, staticApi);

module.exports = Paid;
