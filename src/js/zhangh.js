"use strict";

var user = document.querySelector('.user');
var pass = document.querySelector('.pass');
var login = document.querySelector('.btn');
var btn1 = document.querySelector('.abc');
var register = document.querySelector('.but'); // 登录

login.onclick = function () {
  var us = user.value;
  var ps = pass.value;
  console.log(122); // 验证

  if (!us || !ps) {
    alert('账号或密码不能为空');
    return;
  } // 提交数据


  ajax({
    url: 'http://localhost/2010js/wyyx/src/date/user.php',
    type: 'post',
    data: {
      user: us,
      pass: ps,
      type: 'login'
    },
    dataType: 'json',
    success: function success(json) {
      alert(json.msg);
    },
    error: function error(code) {
      alert(code);
    }
  });
}; // 注册


register.onclick = function () {
  var us = user.value;
  var ps = pass.value; // 验证

  if (!us || !ps) {
    alert('账号或密码不能为空');
    return;
  } // 提交数据


  ajax({
    url: 'http://localhost/2010js/wyyx/src/date/user.php',
    type: 'post',
    data: {
      user: us,
      pass: ps,
      type: 'add'
    },
    dataType: 'json',
    success: function success(json) {
      alert(json.msg);
    },
    error: function error(code) {
      alert(code);
    }
  });
};