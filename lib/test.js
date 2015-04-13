// Test Code

var _ = require('lodash');
var Paid = require('./Paid');
Paid.apiKey = "sk_test_ma6AiJSf4HitoUwI6cXhaQ";


var testAccount, testCustomer, testPlan, testSubscription, testTransaction, testInvoice, testEvent;
console.log("Looking up the account...");
Paid.Account.retrieve().catch(function(e) { throw e; }).then(function(account) {
  console.log("Found: ");
  console.log(account);
  testAccount = account;



}).catch(function(e) { throw e; }).then(function() {
console.log("Creating a customer...");
  return Paid.Customer.create({
    name: "Paid",
    email: "hello@paidapi.com",
    description: "Obviously this is just a description.",
    phone: "4155069330",
    address_line1: "2261 Market Street",
    address_line2: "#567",
    address_city: "San Francisco",
    address_state: "CA",
    address_zip: "94114"
  });
}).catch(function(e) { throw e; }).then(function(customer) {
  console.log("Created: ");
  console.log(customer);
  testCustomer = customer;
  return customer;
}).catch(function(e) { throw e; }).then(function(customer) {
  console.log("Retrieving the created customer...");
  return Paid.Customer.retrieve(customer.id);
}).catch(function(e) { throw e; }).then(function(lookup) {
  console.log("Found customer with id=" + lookup.id);
  console.log("Updating customer with id=" + lookup.id);
  lookup.name = "Test New Name";
  lookup.external_id = Math.random().toString(36);
  return lookup.save();
}).catch(function(e) { throw e; }).then(function(updated) {
  console.log("Updated customer with id=" + updated.id + " to have name of " + updated.name);
  return updated.external_id;
}).catch(function(e) { throw e; }).then(function(ext_id) {
  console.log("lookin gup a customer by external id of " + ext_id);
  return Paid.Customer.byExternalId(ext_id);
}).catch(function(e) { throw e; }).then(function(by_ext_id) {
  console.log("Found by ext id: id=" + by_ext_id.id + " and ext_id=" + by_ext_id.external_id);
}).catch(function(e) { throw e; }).then(function() {
  console.log("Looking up all customers");
  return Paid.Customer.all();
}).catch(function(e) { throw e; }).then(function(customerList) {
  _.each(customerList.data, function(customer) {
    console.log("  Customer.all returned a customer..." + customer.id);
  });



}).catch(function(e) { throw e; }).then(function() {
  console.log("Creating a plan");
  return Paid.Plan.create({
    description: "Plan for testing stuff",
    name: "Test Plan " + new Date().toDateString() + Math.random().toString(36),
    interval: "month",
    interval_count: 1,
    amount: 5000
  });
}).catch(function(e) { throw e; }).then(function(plan) {
  console.log("Created:");
  console.log(plan);
  testPlan = plan;

  console.log("Retrieving the created plan...");
  return Paid.Plan.retrieve(plan.id);
}).catch(function(e) { throw e; }).then(function(plan) {
  console.log("Retrieved plan with id = " + plan.id);

  console.log("Looking up all plans...");
  return Paid.Plan.all();
}).catch(function(e) { throw e; }).then(function(planList) {
  _.each(planList.data, function(plan) {
    console.log("  Plan.all returned a plan..." + plan.id);
  });




}).catch(function(e) { throw e; }).then(function() {
  console.log("Creating a subscription for customer=" + testCustomer.id + " and plan=" + testPlan.id + "...");
  return Paid.Subscription.create({
    starts_on: "2016-01-01",
    plan: testPlan.id,
    customer: testCustomer.id
  });
}).catch(function(e) { throw e; }).then(function(subscription) {
  console.log("Created: ");
  console.log(subscription);
  testSubscription = subscription;

  console.log("Retrieving sub with id=" + subscription.id);
  return Paid.Subscription.retrieve(subscription.id);
}).catch(function(e) { throw e; }).then(function(subscription) {
  console.log("Found sub with id=" + subscription.id);

  console.log("Looking up all subs");
  return Paid.Subscription.all();
}).catch(function(e) { throw e; }).then(function(subList) {
  _.each(subList.data, function(sub) {
    console.log("  Subscription.all returned a sub..." + sub.id);
  });




}).catch(function(e) { throw e; }).then(function() {
  console.log("Creating a transactions with customer=" + testCustomer.id);
  return Paid.Transaction.create({
    amount: 100,
    description: 'a description',
    customer: testCustomer.id,
    paid: false
  });

}).catch(function(e) { throw e; }).then(function(trans) {
  console.log("Created: ");
  console.log(trans);
  testTransaction = trans;

  console.log("looking up the trans");
  return Paid.Transaction.retrieve(trans.id);
}).catch(function(e) { throw e; }).then(function(trans) {
  console.log("found trans with id=" + trans.id);
  console.log("updated the trans");
  trans.description = "an updated desc";
  return trans.save();
}).catch(function(e) { throw e; }).then(function(trans) {
  console.log("Updated with " + trans.description);

  console.log("looking up all transactions");
  return Paid.Transaction.all();
}).catch(function(e) { throw e; }).then(function(transList) {
  _.each(transList.data, function(trans) {
    console.log("  Transaction.all returned a trans..." + trans.id);
  });

  console.log("looking up all of customerid=" + testCustomer.id + " transactions");
  return testCustomer.transactions();
}).catch(function(e) { throw e; }).then(function(transList) {
  _.each(transList.data, function(trans) {
    console.log("  customer.transactions returned a trans..." + trans.id);
  });


}).catch(function(e) { throw e; }).then(function() {
  console.log("Creating an invoice with customer=" + testCustomer.id);
  return testCustomer.generateInvoice();
}).catch(function(e) { throw e; }).then(function(invoice) {
  console.log("created:");
  console.log(invoice);
  testInvoice = invoice;

  console.log("retrieving...");
  return Paid.Invoice.retrieve(invoice.id);
}).catch(function(e) { throw e; }).then(function(invoice) {
  console.log("Retrieved the invoice with the id=" + invoice.id);

  console.log("lookup all invoices");
  return Paid.Invoice.all();
}).catch(function(e) { throw e; }).then(function(invoiceList) {
  _.each(invoiceList.data, function(invoice) {
    console.log("  Invoice.all returned a invoice..." + invoice.id);
  });

  console.log("looking up a customer's invoices");
  return testCustomer.invoices();
}).catch(function(e) { throw e; }).then(function(invoiceList) {
  _.each(invoiceList.data, function(invoice) {
    console.log("  testCustomer.invoices returned a invoice..." + invoice.id);
  });




}).catch(function(e) { throw e; }).then(function() {
  console.log("looking up all events");
  return Paid.Event.all();
}).catch(function(e) { throw e; }).then(function(eventList) {
  _.each(eventList.data, function(event) {
    console.log("  Event.all returned a event..." + event.id);
  });

  console.log("retrieving first one");
  return Paid.Event.retrieve(eventList.data[0].id);
}).catch(function(e) { throw e; }).then(function(event) {
  console.log("found event with id=" + event.id);
  testEvent = event;




}).catch(function(e) { throw e; }).then(function() {
  console.log("mark trans as paid");
  return testTransaction.markAsPaid();
}).catch(function(e) { throw e; }).then(function() {
  console.log("marked as paid");

  console.log("issuing the invoice");
  return testInvoice.issue();
}).catch(function(e) { throw e; }).then(function() {
  console.log("issued");

  console.log("marking the invoice as paid");
  // return testInvoice.markAsPaid({ via: "ach" });
}).catch(function(e) { throw e; }).then(function() {
  console.log("marked as paid.");
  console.log("cancelling sub");
  return testSubscription.cancel();
}).catch(function(e) { throw e; }).then(function() {
  console.log("cancelled");
});


