---
title: jquery学习路上遇到的小坑
date: 2016-12-16 13:19:41
tags: jquery 坑
---
### jquery路上的不断填坑

#### 1、jQuery中没有innerText、innerHtml

document.getElementById("username") 获得的是dom对象,所有对象都有innerHTML；

$("#username")获得的是jquery对象,无innerHTML

解决方法：

	$("#username").html("根号");
	or
    $("#username")[0].innerHTML="根号";

#### 2、jquery中ajax data格式？

	data: {
		username:username.value,
		phone:phone.value,
		msg:msg.value
	}

#### 3、jquery获取img的元素设置src？

 var url = “”；

获取：

      $("#imgId")[0].src = url; 

修改： 

      $("#imgId").attr('src',path);

原生获取：

    document.getElementById("imgId").src = url;

<strong>未完待续...</strong>