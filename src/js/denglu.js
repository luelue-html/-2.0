"use strict";

var btn1 = $1('.abc');
var btn2 = $1('.btn');
var login = $1('.login');
var user = $1('.user');
var pass = $1('.pass');
var auto = $1('.auto');
var mask = $1('.mask');
var close = $1('.x');

btn1.onclick = function () {
  login.style.display = 'block';
  mask.style.display = 'block';
};

close.onclick = function () {
  login.style.display = 'none';
  mask.style.display = 'none';
};