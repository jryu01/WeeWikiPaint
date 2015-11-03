'use strict';
/*jshint expr: true*/
/*globals dump, wwp:true, $*/

var expect = chai.expect;

describe('Drawing area', function () {

  var $drawingDiv;

  afterEach(function () {
    $drawingDiv.remove();
  });

  it('should be initialized in predefined div', function () {
    // create div that's assumed to be in our home page
    $drawingDiv = $('<div></div>');
    $(document.body).append($drawingDiv);

    // initialize it
    wwp.initializeDrawingArea($drawingDiv[0]);

    // verify it was initialized correctly
    var tagName = $drawingDiv.children()[0].tagName;
    expect(tagName).to.equal('svg');
  });

  it('should have same dimensions as its enclosing div', function () {
    $drawingDiv = $('<div style="height: 200px; width: 400px;"></div>');
    $(document.body).append($drawingDiv);

    var paper = wwp.initializeDrawingArea($drawingDiv[0]);
    expect(paper.width).to.equal(400);
    expect(paper.height).to.equal(200);
  });

  it('should draw a line', function () {
    $drawingDiv = $('<div style="height: 200px; width: 400px;">hi</div>');
    $(document.body).append($drawingDiv);

    var paper = wwp.initializeDrawingArea($drawingDiv);
    wwp.drawLine(20, 40, 90, 90);

    var elements = [];
		paper.forEach(function (element) {
			elements.push(element);
		});
    var path = elements[0].node.attributes.d.value;
    expect(path).to.equal('M20,40L90,90');
  });

});
