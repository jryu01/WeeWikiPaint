/*globals wwp*/

wwp = {};

(function () {
  'use strict';

  wwp.createElement = function () {
    var element = document.createElement('div');
    element.setAttribute('id', 'tdjs');
    element.setAttribute('foo', 'bar');
    document.body.appendChild(element);
  };

}());