/* globals wwp:true, Raphael, $ */

wwp = {};

(function () {
  'use strict';

  var paper;

  wwp.initializeDrawingArea = function (drawingAreaElement) {
    paper = new Raphael(drawingAreaElement);

    var $drawingArea = $(drawingAreaElement);

    $drawingArea.on('click', function (event) {
      var x = event.offsetX;
      var y = event.offsetY;
      wwp.drawLine(0, 0, x, y);
    });
    // var prevX;
    // var prevY;
    // var isDragging = false;
    //
    // $drawingArea.mousemove(function (event) {
    //   var x = event.offsetX;
    //   var y = event.offsetY;
    //   if (prevX && isDragging) {
    //     wwp.drawLine(prevX, prevY, x, y);
    //   }
    //   prevX = x;
    //   prevY = y;
    // });
    //
    // $drawingArea.mouseenter(function (event) {
    //   prevX = event.offsetX;
    //   prevY = event.offsetY;
    // });
    //
    // $drawingArea.mousedown(function (event) {
    //   isDragging = true;
    // });
    //
    // $drawingArea.mouseup(function (event) {
    //   isDragging = false;
    // });

    return paper;
  };

  wwp.drawLine = function (startX, startY, endX, endY) {
    paper.path("M" + startX + "," + startY + "L" + endX + "," + endY);
  };

}());
