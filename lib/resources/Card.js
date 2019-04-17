'use strict';

var _ = require('lodash');
var APIMethod = require('../base/APIMethod');
var APIResource = require('../base/APIResource');
var APIList = require('../base/APIList');


function Card(apiKey, json, apiMethod) {
  if(!(this instanceof Card)) {
    return new Card(json, apiMethod);
  }
  _.extend(this, new APIResource(json, apiMethod));
  this.apiKey = apiKey;
}

var staticApi = {

};

Card = _.extend(
  Card,
  staticApi
);

Card.prototype = {

};

module.exports = Card;
