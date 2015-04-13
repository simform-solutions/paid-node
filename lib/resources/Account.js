'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');


function Account(json, apiMethod) {
  _.extend(this, new APIResource(json, apiMethod));
}

Account = _.extend(Account, {

  retrieve: function(params, headers, callback) {
    var methodArgs = APIResource.prepareArguments(arguments, Account.retrieve);
    return new APIMethod("get", "/account", methodArgs, undefined, APIResource.constructBldr(Account)).execute();
  }

});

Account.prototype = _.extend(APIResource.prototype, {
});

module.exports = Account;
