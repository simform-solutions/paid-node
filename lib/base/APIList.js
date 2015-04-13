'use strict';

var _ = require('lodash');

function APIList(json, apiMethod, klass) {
  if(!(this instanceof APIList)) {
    return new APIList(json, apiMethod, klass);
  }

  this.apiMethod = apiMethod;
  var instances = new Array();
  _.each(json.data, function(instanceJson) {
    instances.push(new klass(instanceJson));
  });
  json.data = instances;
  return _.extend(this, json);
}

APIList = _.extend(APIList, {
  constructBldr: function(klass) {
    return function(apiMethod) {
      return function(json) {
        if(klass && typeof klass === 'function') {
          return new APIList(json, apiMethod, klass);
        } else {
          return json
        }
      };
    };
  }
});

module.exports = APIList;
