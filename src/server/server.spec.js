'use strict';

var expect = require("chai").expect,
    server = require("./server");

describe(".number", function () {
  it('should returns 3', function () {
    expect(server.number()).to.equals(3);
  });
});