'use strict';

require('../testHelper');
var Chai = require('chai'),
    expect = Chai.expect,
    assert = Chai.assert;

var ParamsBuilder = require('../../lib/base/ParamsBuilder');

describe('ParamsBuilder', function() {

  it('handles null params', function() {
    var actual = ParamsBuilder();
    assert.deepEqual(actual, {});

    actual = ParamsBuilder(null);
    assert.deepEqual(actual, {});
  });

  it('inserts an authKey: authValue pair when both are provided', function() {
    var actual = ParamsBuilder({}, "api-key", "API_KEY");
    expect(actual).to.have.property("API_KEY", "api-key");
  });

  it('retains existing params', function() {
    var actual = ParamsBuilder({ dog: "cat", mouse: { lion: 123 }}, "api-key", "API_KEY");
    expect(actual).to.have.property("dog");
    expect(actual).to.have.property("mouse");
    expect(actual).to.have.property("API_KEY");
  })

});

