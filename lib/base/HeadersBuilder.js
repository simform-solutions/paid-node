'use strict';

var _ = require('lodash');

function HeadersBuilder(headers, authValue, authKey) {
  headers = (typeof headers === 'undefined') ? {} : headers;
  headers = headers || {};
  authValue = (typeof authValue === 'undefined') ? null : authValue;
  authKey = (typeof authKey === 'undefined') ? null : authKey;

  var ret = {}
  if(authKey) {
    ret[authKey] = authValue;
  } else if(authValue) {
    ret = _.merge(ret, _httpBasicAuthHeaders(authValue))
  }
  ret = _.merge(ret, headers);
  return ret;
}

function _httpBasicAuthHeaders(authValue) {
  var base64Key = new Buffer(authValue + ":").toString('base64');
  return {
    'Authorization': "Basic " + base64Key
  };
}

module.exports = HeadersBuilder;
