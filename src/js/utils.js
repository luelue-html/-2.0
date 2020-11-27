"use strict";

// 判断数组中是否包含某个值
function has(arr, item) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === item) {
      return true;
    }
  }

  return false;
} // 数组去重


function norepeat(arr) {
  var arr2 = [];

  for (var i = 0, len = arr.length; i < len; i++) {
    if (!has(arr2, arr[i])) {
      arr2.push(arr[i]);
    }
  }

  return arr2;
} // 获取元素样式，兼容谷、歌火狐、IE678


function getStyle(dom, attr) {
  if (dom.currentStyle) {
    //IE
    return dom.currentStyle[attr];
  } else {
    return getComputedStyle(dom, null)[attr];
  }
} // 获取下一个兄弟节点


function getNextNode(dom) {
  if (dom.nextElementSibling) {
    return dom.nextElementSibling;
  } else {
    return dom.nextSibling;
  }
} // 获取上一个兄弟节点


function getPrevNode(dom) {
  if (dom.previousElementSibling) {
    return dom.previousElementSibling;
  } else {
    return dom.previousSibling;
  }
} // 生成6位随机验证码（数字、字母（大小））


function randomCode() {
  var arr = [1, 1, 1, 1, 1, 1];

  for (var i in arr) {
    do {
      var ascii = randomInt(48, 122);
    } while (ascii > 57 && ascii < 65 || ascii > 90 && ascii < 97);

    arr[i] = String.fromCharCode(ascii);
  }

  return arr.join('');
} // 生成区间随机整数


function randomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
} // 生成随机的十六进制颜色值 # 


function randomColor() {
  var str = '0123456789abcdef';
  var col = '#';

  for (var i = 0; i < 6; i++) {
    var index = randomInt(0, 15);
    col += str[index];
  }

  return col;
} // 添加事件监听（兼容低版本浏览器）


function addEvent(dom, type, cb) {
  if (dom.attachEvent) {
    dom.attachEvent('on' + type, cb);
  } else {
    dom.addEventListener(type, cb);
  }
} // 移除事件监听（兼容低版本浏览器）


function removeEvent(dom, type, cbName) {
  if (dom.detachEvent) {
    dom.detachEvent('on' + type, cbName);
  } else {
    dom.removeEventListener(type, cbName);
  }
} // 事件委托封装


function on(parent, type, selector, callback) {
  addEvent(parent, type, function (ev) {
    var e = ev || event; //事件对象

    var target = e.target || e.srcElement; //事件源
    // 获取选择器第一个字符（ . ）

    var sel_first = selector.substr(0, 1); // 记录第一个字符之后的属性值（ add ）

    var sel_last = null; // 记录选择器类型（id className tagName）

    var sel_type = null; // 判断传入的是什么选择器

    switch (sel_first) {
      case '.':
        // 类选择器
        sel_last = selector.slice(1);
        sel_type = 'className';
        break;

      case '#':
        // id选择器
        sel_last = selector.slice(1);
        sel_type = 'id';
        break;

      default:
        sel_last = selector;
        sel_type = 'tagName';
    } // 只有传入selector元素被点击时触发


    if (sel_type === 'tagName') {
      // 如果是标签选择器，转成大写
      sel_last = sel_last.toUpperCase();
    }

    if (target[sel_type] === sel_last) {
      // callback(e);
      callback.call(target, e);
    } // 判断target是否为selector元素或selector的子元素
    // while(target !== parent){
    //     if (sel_type === 'tagName') {
    //         // 如果是标签选择器，转成大写
    //         sel_last = sel_last.toUpperCase();
    //     }
    //     if (target[sel_type] === sel_last) {
    //         // callback(e);
    //         callback.call(target,e);
    //     }
    //     target = target.parentNode;
    // }

  });
}