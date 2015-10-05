'use strict';
/*jshint expr: true*/
/*globals dump, chai*/

var expect = chai.expect;

describe('Nothing', function () {

  it('should pass', function () {
    dump('hello whenever');
    expect(true).to.be.ok;
  });

});