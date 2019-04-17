'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');


function Account(apiKey, json, apiMethod) {
  if(!(this instanceof Account)) {
    return new Account(json, apiMethod);
  }
  _.extend(this, new APIResource(json, apiMethod));
  this.apiKey = apiKey;
}

Account = _.extend(Account, {

  create: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Account.retrieve);
    return new APIMethod("post", "/account", methodArgs, undefined, APIResource.constructBldr(_.bind(Account, null, this.apiKey)), this.apiKey).execute();
  },
  
  retrieve: function(params, headers) {
    var methodArgs = APIResource.prepareArguments(arguments, Account.retrieve);
    return new APIMethod("get", "/account", methodArgs, undefined, APIResource.constructBldr(_.bind(Account, null, this.apiKey)), this.apiKey).execute();
  }

});

Account.prototype = _.extend(APIResource.prototype, {
});

module.exports = Account;
