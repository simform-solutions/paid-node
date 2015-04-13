'use strict';

require('../testHelper');
var Chai = require('chai'),
    expect = Chai.expect,
    assert = Chai.assert;

var HeadersBuilder = require('../../lib/base/HeadersBuilder');

describe('HeadersBuilder', function() {

  it('handles null headers', function() {
    var actual = HeadersBuilder();
    assert.deepEqual(actual, {});

    actual = HeadersBuilder(null);
    assert.deepEqual(actual, {});
  });

  it('uses http basic auth with just an authValue', function() {
    var actual = HeadersBuilder({}, "api-key");
    assert.property(actual, "Authorization");
    assert.match(actual.Authorization, /Basic .*/);
  });

  it('inserts an authKey: authValue pair when both are provided', function() {
    var actual = HeadersBuilder({}, "api-key", "API_KEY");
    assert.propertyVal(actual, "API_KEY", "api-key");
  });

  it('retains existing headers', function() {
    var actual = HeadersBuilder({ dog: "cat", mouse: { lion: 123 }}, "api-key", "API_KEY");
    assert.propertyVal(actual, "dog", "cat");
    assert.property(actual, "mouse");
    assert.deepPropertyVal(actual, "mouse.lion", 123);
    assert.property(actual, "API_KEY");
  })

});

