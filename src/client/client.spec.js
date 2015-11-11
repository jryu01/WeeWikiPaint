'use strict';
/*jshint expr: true*/
/*globals dump, wwp:true, $*/

var expect = chai.expect;

describe('Drawing area', function () {

  var $drawingDiv;
  var paper;

  var drawingElements = function (paper) {
    var elements = [];
		paper.forEach(function (element) {
			elements.push(element);
		});
    return elements;
  };
  var pathFor = function (drawingElement) {
    var box = drawingElement.getBBox();
    return 'M' + box.x + ',' + box.y + 'L' + box.x2 + ',' + box.y2;
  };

  beforeEach(function () {
    // create div that's assumed to be in our home page
    $drawingDiv = $('<div style="height: 200px; width: 400px;"></div>');
    $(document.body).append($drawingDiv);
    //initialize paper
    paper = wwp.initializeDrawingArea($drawingDiv[0]);
  });

  afterEach(function () {
    $drawingDiv.remove();
  });

  it('should have same dimensions as its enclosing div', function () {
    expect(paper.width).to.equal(400);
    expect(paper.height).to.equal(200);
  });

  it('should draw a line', function () {
    wwp.drawLine(20, 40, 90, 90);
    var elements = drawingElements(paper);
    expect(pathFor(elements[0])).to.equal('M20,40L90,90');
  });

});
