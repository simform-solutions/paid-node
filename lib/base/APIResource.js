'use strict';

var _ = require('lodash');

var Util = require('./Util');

function APIResource(json, apiMethod) {
  if(!(this instanceof APIResource)) {
    return new APIResource(json, apiMethod);
  }
  this.apiMethod = apiMethod;

  if(typeof json === 'string') {
    json = { id: json };
  }
  _.extend(this, json);
}

APIResource = _.extend(APIResource, {

  determineArgs: function(params, headers, callback) {
    if(typeof params === 'function') {
      callback = params;
      params = {};
      headers = {}
    } else if(typeof headers === 'function') {
      callback = headers;
      headers = {};
    }
    return {
      params: params,
      headers: headers,
      callback: callback
    };
  },

  // Inception time... prob should look into a way to make this cleaner.
  constructBldr: function(klass) {
    return function(apiMethod) {
      return function(json) {
        if(klass && typeof klass === 'function') {
          return new klass(json, apiMethod);
        } else {
          return json
        }
      };
    };
  },

  // This should get cleaned up eventually.. but it works for now.
  prepareArguments: function(args, func) {
    var argNames = Util.getArgNames(func);

    var temp = {};
    _.each(args, function(arg, index) {
      temp[argNames[index]] = arg;
    });

    // Find the callback (in case args were missing).
    var callback = temp.callback;
    if(!callback) {
      var cbKey = _.findLastKey(temp, function(arg) {
        return (typeof arg === 'function');
      });
      callback = temp[cbKey];
      delete temp[cbKey];
    } else {
      delete temp.callback;
    }

    // Pull out the params & headers.
    // Merge the rest into the params.
    var params = temp.params || {};
    delete temp.params;
    var headers = temp.headers || {};
    delete temp.headers;
    params = _.extend(params, temp);

    return {
      params: params,
      headers: headers,
      callback: callback
    }
  },

});

module.exports = APIResource;
