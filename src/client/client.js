/* globals wwp:true, Raphael, $ */

wwp = {};

(function () {
  'use strict';

  var paper;

  wwp.initializeDrawingArea = function (drawingAreaElement) {

    paper = new Raphael(drawingAreaElement);

    var $drawingArea = $(drawingAreaElement);
    var start;

    $drawingArea.mousemove(function (event) {
      if (!start) { return; }
      var end = { x: event.offsetX, y: event.offsetY };
      wwp.drawLine(start.x, start.y, end.x, end.y);
      start.x = end.x;
      start.y = end.y;
    });

    $drawingArea.mousedown(function (event) {
      start = { x: event.offsetX, y: event.offsetY };
    });

    $(document).mouseup(function (event) {
      start = undefined;
    });

    return paper;
  };

  wwp.drawLine = function (startX, startY, endX, endY) {
    paper.path("M" + startX + "," + startY + "L" + endX + "," + endY);
  };

}());
