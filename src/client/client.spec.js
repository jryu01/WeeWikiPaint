'use strict';
/*jshint expr: true*/
/*globals dump, chai*/

var expect = chai.expect;

describe('Nothing', function () {

  it('should run', function () {
    var extractedDiv = document.getElementById('tdjs');
    expect(extractedDiv.getAttribute('foo')).to.equal('bar');
  });

});