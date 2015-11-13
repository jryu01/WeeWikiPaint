/* globals wwp:true, Raphael, $ */

wwp = {};

(function () {
  'use strict';

  var paper;

  wwp.initializeDrawingArea = function (drawingAreaElement) {

    paper = new Raphael(drawingAreaElement);

    var $drawingArea = $(drawingAreaElement);
    var prevX;
    var prevY;
    var isDragging = false;

    $drawingArea.mousemove(function (event) {
      if (!isDragging) { return; }
      var x = event.offsetX;
      var y = event.offsetY;
      wwp.drawLine(prevX, prevY, x, y);
      prevX = x;
      prevY = y;
    });
    //
    // $drawingArea.mouseenter(function (event) {
    //   prevX = event.offsetX;
    //   prevY = event.offsetY;
    // });
    //
    $drawingArea.mousedown(function (event) {
      prevX = event.offsetX;
      prevY = event.offsetY;
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
