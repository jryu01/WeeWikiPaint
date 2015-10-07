/* globals wwp:true, Raphael */

wwp = {};

(function () {
  'use strict';

  var raphael = Raphael;

  wwp.initializeDrawingArea = function (drawingAreaElement) {
    var paper = raphael(drawingAreaElement);

    return paper;
  };

}());