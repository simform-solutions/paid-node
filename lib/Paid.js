'use strict';

var _ = require('lodash');

var Account = require('./resources/Account');
var Customer = require('./resources/Customer');
var Event = require('./resources/Event');
var Invoice = require('./resources/Invoice');
var Plan = require('./resources/Plan');
var Subscription = require('./resources/Subscription');
var Transaction = require('./resources/Transaction');

function Paid(apiKey) {
  this.apiKey = apiKey;
}

Paid = _.extend(Paid, {
  apiKey: null,

  apiBase: "https://api.paidapi.com/v0",
  apiStaging: "https://api-staging.paidapi.com/v0",
  apiVersion: "v0",
  supportEmail: "support@paidapi.com",
  docsUrl: "https://paidapi.com/docs",

  Account: Account,
  Customer: Customer,
  Event: Event,
  Invoice: Invoice,
  Plan: Plan,
  Subscription: Subscription,
  Transaction: Transaction
});

module.exports = Paid;
