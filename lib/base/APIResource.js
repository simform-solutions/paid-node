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
    delete temp.options;

    // Pull out the params & headers.
    // Merge the rest into the params.
    var params = temp.params || {};
    delete temp.params;
    var headers = temp.headers || {};
    delete temp.headers;
    params = _.extend(params, temp);

    return {
      params: params,
      headers: headers
    }
  },

});

module.exports = APIResource;
