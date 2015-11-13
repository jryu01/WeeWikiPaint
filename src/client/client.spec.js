'use strict';
/*jshint expr: true*/
/*globals dump, wwp:true, $*/

var expect = chai.expect;

describe('Drawing area', function () {

  var $drawingDiv;
  var paper;

  var getDrawingElements = function (paper) {
    var elements = [];
		paper.forEach(function (element) {
			elements.push(element);
		});
    return elements;
  };

  var pathFor = function (drawingElement) {
    //Note: might not work in ie9 and below version.
    var pathValue = drawingElement.node.attributes.d.value;
    return pathValue.substring(1).replace('L', ',').split(',').map(Number);
  };

  var paperPaths = function (paper) {
    return getDrawingElements(paper).map(pathFor);
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
    wwp.drawLine(20, 40, 10, 90);
    expect(paperPaths(paper)).to.deep.equal([[20, 40, 10, 90]]);
  });

  it('should draw line segments in respone to mouse drags', function () {
    $drawingDiv.trigger($.Event('mousedown', { offsetX: 20, offsetY: 30 }));
    $drawingDiv.trigger($.Event('mousemove', { offsetX: 50, offsetY: 60 }));
    $drawingDiv.trigger($.Event('mouseup', { offsetX: 50, offsetY: 60 }));

    expect(paperPaths(paper)).to.deep.equal([[20, 30, 50, 60]]);
  });

  // it('should consider border when calculating mouse target', function () {
  // });
});
