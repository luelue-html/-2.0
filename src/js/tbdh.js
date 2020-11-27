"use strict";

var new1 = document.querySelector(".new");

window.onscroll = function () {
  var stop = document.documentElement.scrollTop || document.body.scrollTop;

  if (stop >= 116) {
    new1.style.position = "fixed";
    new1.style.top = 0;
    new1.style.zIndex = 100;
    new1.style.backgroundColor = "white";
    new1.style.width = 1092 + "px";
  } else {
    new1.style.position = "static";
  }
};