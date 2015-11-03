/* globals wwp:true, Raphael */

wwp = {};

(function () {
  'use strict';

  // var raphael = Raphael;
  var paper;

  wwp.initializeDrawingArea = function (drawingAreaElement) {
    paper = new Raphael(drawingAreaElement);
    return paper;
  };

  wwp.drawLine = function (startX, startY, endX, endY) {
    paper.path("M" + startX + "," + startY + "L" + endX + "," + endY);
  };

}());
