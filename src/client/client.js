/* globals wwp:true, Raphael, $ */

wwp = {};

(function () {
  'use strict';

  // var raphael = Raphael;
  var paper;

  wwp.initializeDrawingArea = function (drawingAreaElement) {
    var $drawingArea = $(drawingAreaElement);
    var prevX;
    var prevY;
    var isDragging = false;
    paper = new Raphael(drawingAreaElement);

    $drawingArea.mousemove(function (event) {
      var x = event.offsetX;
      var y = event.offsetY;
      if (prevX && isDragging) {
        wwp.drawLine(prevX, prevY, x, y);
      }
      prevX = x;
      prevY = y;
    });

    $drawingArea.mouseenter(function (event) {
      prevX = event.offsetX;
      prevY = event.offsetY;
    });

    $drawingArea.mousedown(function (event) {
      isDragging = true;
    });

    $drawingArea.mouseup(function (event) {
      isDragging = false;
    });

    return paper;
  };

  wwp.drawLine = function (startX, startY, endX, endY) {
    paper.path("M" + startX + "," + startY + "L" + endX + "," + endY);
  };

}());
