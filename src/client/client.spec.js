'use strict';
/*jshint expr: true*/
/*globals dump, wwp:true*/

var expect = chai.expect;

describe('Nothing', function () {

  it('should run', function () {
    wwp.createElement();
    var extractedDiv = document.getElementById('tdjs');
    expect(extractedDiv.getAttribute('foo')).to.equal('bar');
  });

});