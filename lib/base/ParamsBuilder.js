'use strict';

var _ = require('lodash');

function ParamsBuilder(params, authValue, authKey) {
  params = (typeof params === 'undefined') ? {} : params;
  params = params || {};
  authValue = (typeof authValue === 'undefined') ? null : authValue;
  authKey = (typeof authKey === 'undefined') ? null : authKey;

  var ret = {}
  if(authKey && authValue) {
    ret[authKey] = authValue;
  }
  ret = _.merge(ret, params);
  return ret;
}

module.exports = ParamsBuilder;
