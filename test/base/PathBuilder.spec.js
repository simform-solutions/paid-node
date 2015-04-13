'use strict';

require('../testHelper');
var Chai = require('chai'),
    expect = Chai.expect,
    assert = Chai.assert;

var PathBuilder = require('../../lib/base/PathBuilder');

describe('PathBuilder', function() {
  // Setup
  var instance;
  var param;
  beforeEach(function() {
    instance = {
      abc: "abc-value"
    };
    param = {
      dog: "dog-value"
    };
  });

  it('uses instance properties', function() {
    var path = "/a/:abc/123";
    var expected = "/a/abc-value/123";

    var actual = PathBuilder(path, instance);
    assert.equal(expected, actual);
  });

  it('uses param properties', function() {
    var path = "/a/:dog/123";
    var expected = "/a/dog-value/123";

    var actual = PathBuilder(path, instance, param);
    assert.equal(expected, actual);
  });

  it('uses both instance and param properties', function() {
    var path = "/a/:dog/:abc/123";
    var expected = "/a/dog-value/abc-value/123";

    var actual = PathBuilder(path, instance, param);
    assert.equal(expected, actual);
  });

});

