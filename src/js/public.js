"use strict";

function isPrime(num) {
  //1 不是一个素数，排除1这个值
  if (num === 1) return false; //判断num是否是一个素数，
  //如果是素数，函数返回 一个true
  //如果不是素数，函数返回 一个false;

  for (var i = 2; i < num; i++) {
    if (num % i === 0) {
      //执行到这里，num不是一个素数
      return false; //不是素数
    }
  } //当程序执行到这里，说明num是一个素数


  return true;
} //获取min-max之间的随机整数


function getRand(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min);
} //获取随机六进制颜色值


function getColor() {
  var str = "0123456789abcdef"; //index 0-15

  var color = "#"; //随机到str中取出六个字符
  //将这六个字符拼接在#后面返回

  for (var i = 0; i < 6; i++) {
    color += str[getRand(0, 15)]; //利用随机下标到str中随机取出字符
  }

  return color;
} //随机获取num位置验证码


function getYZM(num) {
  //num位验证码
  //字符从哪来？
  //从ascii码中来 48-122范围取出
  //排除58-64 91-96
  var yzm = "";
  var rand;

  for (var i = 0; i < num; i++) {
    //随机获取对应字符
    //yzm += String.fromCharCode(getRand(48,122));//yzm包括了一些特殊字符
    //排除58-64 91-96
    rand = getRand(48, 122);

    if (rand >= 58 && rand <= 64 || rand >= 91 && rand <= 96) {
      //重新获取
      i--;
    } else {
      yzm += String.fromCharCode(rand);
    }
  }

  return yzm;
} //本地化时间函数封装


function getDateToLocal(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var f = date.getMinutes();
  var s = date.getSeconds();
  var w = date.getDay(); //w 0-6

  var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  return y + "年" + toDB(m) + "月" + toDB(d) + "日 " + toDB(h) + ":" + toDB(f) + ":" + toDB(s) + " " + week[w];
} //给1-9的数字前加0处理


function toDB(num) {
  //0-9 前要加0 
  return num < 10 ? "0" + num : num;
} //封装时间差函数,获取时间差秒数


function getDifTime(startDate, endDate) {
  return (endDate.getTime() - startDate.getTime()) / 1000;
}

function $(idName) {
  return document.getElementById(idName);
} //获取obj的子元素节点


function getChildren(obj) {
  //获取obj下的所有的子节点
  var childList = obj.childNodes;
  var list = []; //用于保存元素节点集合
  //循环每一个元素

  for (var i = 0; i < childList.length; i++) {
    //判断每一个元素是否是元素节点
    if (childList[i].nodeType === 1) {
      //是元素节点
      //将元素节点添加到一个新的数组中
      list.push(childList[i]);
    }
  }

  return list;
}

function getFirstChild(obj) {
  //console.log(getChildren(obj)[0]);
  //return getChildren(obj)[0] ? getChildren(obj)[0] : null;
  var ele = getChildren(obj)[0]; //if(ele){//ele有对象隐式类型转换，更消耗性能

  if (!!ele) {
    //程序性能优化
    return ele;
  }

  return null;
}

function getLastChild(obj) {
  var list = getChildren(obj);
  var lastEle = list[list.length - 1];

  if (!!lastEle) {
    //程序性能优化
    return lastEle;
  }

  return null;
}

function myTrim(str) {
  var start = 0; //不是空格的开始下标

  var end = 0; //不是空格的结束下标
  //从前往后遍历str,找到第一个不是空格的下标

  for (var i = 0; i < str.length; i++) {
    if (str[i] != " ") {
      start = i; //保存start下标

      break;
    }
  } //从后往前遍历str,找到第一个不是空格的下标


  for (var i = str.length - 1; i >= 0; i--) {
    if (str[i] != " ") {
      end = i; //保存end下标

      break;
    }
  }

  return str.substring(start, end + 1);
}

function getButton(eve) {
  //现代浏览器中 0 1 2
  //ie 1 4 2
  //eve接收事件对象的形参
  //通过这个形参可以判断是不是ie8浏览器
  //eve上undefined的情况下是ie8浏览器
  if (!!eve) {
    //eve对象存在，是现代浏览器
    return eve.button;
  } //这里的代码在ie8环境下执行


  var button = window.event.button;

  switch (button) {
    case 1:
      return 0;

    case 4:
      return 1;

    case 2:
      return 2;
  }
} //判断ele元素中是否有value的类


function hasClass(ele, value) {
  var cName = myTrim(ele.className);
  if (cName === "") return false;
  var cNameList = cName.split(" ");

  for (var i = 0; i < cNameList.length; i++) {
    if (cNameList[i] === value) {
      return true;
    }
  }

  return false;
} //删除ele中的value的class类


function removeClass(ele, value) {
  var cName = myTrim(ele.className); //去掉左右空格，防止class="    "这种情况出现

  if (cName === "") return;
  if (!hasClass(ele, value)) return;
  var cNameList = cName.split(" ");

  for (var i = 0; i < cNameList.length; i++) {
    if (cNameList[i] === value) {
      cNameList.splice(i, 1);
      i--;
    } else if (cNameList[i] === "") {
      //删除空格是为了，避免出现多个空格 的情况 
      cNameList.splice(i, 1);
      i--;
    }
  }

  ele.className = cNameList.join(" ");
} //给ele添加value这个class名称


function addClass(ele, value) {
  var cName = myTrim(ele.className); //去掉左右空格，防止class="    "这种情况出现

  if (cName === "") {
    //直接将value添加到ele的class中
    ele.className = value;
    return; //不需要再往后执行
  }

  ; //程序执行到这里，class中是有内容的
  //判断value在ele的class中是否存在，
  //存在不需要再添加

  if (hasClass(ele, value)) return; //存在就退出，不往后执行
  //不存在累加在最后

  ele.className += " " + value;
}

function getPreviousSibling(ele) {
  var pEle = ele.parentNode;
  var firstEle = getFirstChild(pEle);
  if (firstEle === ele) return null;
  var prevNode = ele.previousSibling;

  if (prevNode.nodeType != 1) {
    return getPreviousSibling(prevNode);
  }

  return prevNode;
} //根据key获取查询串中的应对value


function getSearch(key) {
  var search = location.search.substring(1); //去掉问号
  //console.log(search.substring(1));

  if (search === "") return ""; //用&转换成数组

  var searchList = search.split("&"); //console.log(searchList)

  var list = [];

  for (var i = 0; i < searchList.length; i++) {
    list = searchList[i].split("=");

    if (list[0] === key) {
      return decodeURIComponent(list[1]);
    }
  }

  return "";
} //获取所有cName的元素集合


function getByClassName(cName) {
  var eleList = document.getElementsByTagName("*");
  var newList = [];

  for (var i = 0; i < eleList.length; i++) {
    if (hasClass(eleList[i], cName)) {
      newList.push(eleList[i]);
    }
  }

  return newList;
} //阻止事件默认行为


function preventDefault(e) {
  //e形参传递的是兼容后的事件 对象
  //判断是否在ie8下运行
  //e.preventDefault:高版本浏览器是一个函数,在ie8是一个undefined
  //if(e.preventDefault != undefined){

  /*if(!!e.preventDefault){//函数存在 是高版本浏览器
  	e.preventDefault();
  }else{
  	e.returnValue = false;
  }*/
  !!e.preventDefault ? e.preventDefault() : e.returnValue = false;
} //阻止事件冒泡


function stopProp(e) {
  /*if(!!e.stopPropagation){
  	e.stopPropagation();
  }else{
  	e.cancelBubble = true;
  }*/
  !!e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
} //事件监听的兼容封装


function addEvent(ele, event, callBack, flag) {
  //是否是ie8
  if (!!ele.addEventListener) {
    //高版本浏览器
    ele.addEventListener(event, callBack, flag);
  } else {
    //ie8
    ele.attachEvent("on" + event, callBack);
  }
} // 解除事件绑定


function removeEvent(ele, event, callBack) {
  if (!!ele.removeEventListener) {
    ele.removeEventListener(event, callBack);
  } else {
    ele.detachEvent("on" + event, callBack);
  }
} //hasOther(uVal):功能是判断uVal是否包含了除数字、字母、下划线以外的其它字符，如果有返回true，如果没有返回false


function hasOther(val) {
  var ch = "";

  for (var i = 32; i <= 127; i++) {
    //排除数字，字母，下划线
    if (!(i >= 48 && i <= 57 || i >= 65 && i <= 90 || i == 95 || i >= 97 && i <= 122)) {
      ch = String.fromCharCode(i); //console.log(ch);

      if (val.indexOf(ch) != -1) {
        return true;
      }
    }
  }

  return false;
} // 全选和不选

/* var all = document.querySelector("input[name=all]");
    var one = document.querySelectorAll("input[name=one]");
    all.onchange = function(){
        var _this = this;
        // 赋值
        one.forEach(function(ele,index){
            ele.checked = _this.checked;
                         //引用
        });
    }
    // 当ones只要有一个没有被选中，all要切换为未选中
    // 当ones所有的都选中了，all要切换为选中状态
    // 点击每一个one
 for(var i = 0;i < one.length; i++){ 
    one[i].onchange = function(){
            var isChecked = true;
            // 判断是否所有的one都被选中了  all要切换为选中状态
            // 至少有一个没有被选中的，all要切换为未选中
            for(var j = 0;j < one.length; j++){
                if(one[j].checked === false){
                    // 只要执行到了这里。说明至少有一个没有被选中
                    isChecked = false;
                }
            }
            // 如何知道说明至少有一个没有被选中
            // isChecked为true说明全部选中了

            if(isChecked){
                // one都被选中了。all要切换为选中状态
                all.checked = true;
            }else {
                all.checked = false
            }
            
        }
	} */
// 冒泡排序


function maoPao(arr) {
  // 比较轮数
  for (var i = 0; i < arr.length - 1; i++) {
    //每一轮比较的次数
    for (var j = 0; j < arr.length - (i + 1); j++) {
      if (arr[j] > arr[j + 1]) {
        //交换两个数位置
        var tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  } // return arr;

}
/* var a = [5,58,6,8,9,4];   
maoPao(a);
console.log(a); */