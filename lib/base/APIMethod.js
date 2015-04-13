'use strict';

var _ = require('lodash');
var Promise = require('bluebird');

var APIError = require('../errors/APIError');
var Request = require('./Request');
var ParamsBuilder = require('./ParamsBuilder');
var HeadersBuilder = require('./HeadersBuilder');
var PathBuilder = require('./PathBuilder');

function APIMethod(method, path, pHandCb, instance, constructBldr, apiKey, apiBase) {
  if(!(this instanceof APIMethod)) {
    return new APIMethod(method, path, pHandCb, instance, constructBldr, apiKey, apiBase);
  }

  // Do this here (not before) otherwise circuluar deps will screw you :\
  // Long term this should likely be fixed by having instances of everything.
  var Paid = require('../Paid');
  this.apiKey = (typeof apiKey === 'undefined') ? Paid.apiKey : apiKey;
  this.apiBase = (typeof apiBase === 'undefined') ? Paid.apiBase : apiBase;

  this.method = method.toUpperCase();
  this.params = ParamsBuilder(pHandCb.params, apiKey, Paid.paramsAuthKey);
  this.path = PathBuilder(path, instance, this.params);
  this.headers = HeadersBuilder(pHandCb.headers, this.apiKey, Paid.headersAuthKey);

  this.callback = pHandCb.callback;
  if(constructBldr && typeof constructBldr === 'function') {
    this.constructCb = constructBldr(this);
  } else {
    this.constructCb = function(json) { return json; }
  }
}

APIMethod.prototype = _.extend(APIMethod.prototype, {
  onSuccess: function(deferred) {
    return function(body, code) {
      this.response = { body: body, code: code };
      if(typeof body === 'string') {
        try {
          this.parseResponse();
        } catch(jsonError) {
        }
      } else {
        this.response.json = body;
      }

      if(this.error) {
        deferred.reject(this.error);
      } else {
        deferred.resolve(this.constructCb(this.response.json));
      }
    }.bind(this);
  },

  onError: function(deferred) {
    return function(body, code) {
      this.response = { body: body, code: code };
      this.error = new APIError(body, this);
      deferred.reject(this.error);
    }.bind(this);
  },

  url: function() {
    return this.apiBase + "" + this.path;
  },

  parseResponse: function() {
    try {
      this.response.json = JSON.parse(this.response.body);
      return this.response.json;
    } catch(jsonError) {
      this.error = new APIError("Invalid response from server. Not JSON parsable.", this);
      return this.error;
    }
  },

  createDeferred: function(callback) {
      var deferred = Promise.defer();

      if (callback) {
        // Callback, if provided, is a simply translated to Promise'esque:
        // (Ensure callback is called outside of promise stack)
        deferred.promise.then(function(res) {
          setTimeout(function(){ callback(res, null) }, 0);
        }, function(err) {
          setTimeout(function(){ callback(null, err); }, 0);
        });
      }

      return deferred;
  },

  // Issue is with the promise - if i dont provide a CB the new klass() code is never run.


  execute: function() {
    var deferred = this.createDeferred(this.callback);
    Request(this.method, this.url(), this.params, this.headers, this.onSuccess(deferred), this.onError(deferred));
    return deferred.promise;
  }
});

module.exports = APIMethod;
