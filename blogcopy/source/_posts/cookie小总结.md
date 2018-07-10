---
title: cookie小总结
date: 2016-12-16 10:35:40
tags: cookie 登录 用户名显示
---
### cookie
英文翻译为“饼干”。以下是本人在学习cookie时的小总结，欢迎使用和提出宝贵意见：

看这样一个例子（登录后显示相应的用户名）：

![](http://ww1.sinaimg.cn/mw690/005SH7k8gw1fasfytds6vj30ji0133yf.jpg)

#### 一、原生的方法，创建cookie，获取cookie，删除cookie。
1、创建cookie：

	function setCookie(name,value,timer){
		var date1=new Date();
		var day=date1.getDate();
		date1.setDate(day+timer);
		document.cookie=name+"="+value+"; expires="+date1;
	}

传入的三个参数分别是用户名，密码，有效时间。比如创建了以下cookie：

	name=根号; value=666; expires=7;

2、获取cookie：

创建完cookie之后，下一步我们就要获取我们创建的cookie，<span style="color:red">安全起见，只保存用户名，不保存密码</span>

	function getCookie(name){
		var cookie1=document.cookie;	//获取所有的cookie，然后通过分割的方法来获取我们想要的单一值
		var arr=cookie1.split("; ");	//arr = ["name=根号","value=666"]
		for (i=0;i<arr.length;i++) {
			var arr2=arr[i].split("=");	//["name","根号"],["value","666"]
			if(arr2[0]==name){
				return arr2[1];	//根号
			}
		}
	}

3、删除cookie：

删除cookie，不是真正的去删除它，而是去设置过期的时间，

	function removeCookie(name){
		setCookie(name," ",-1);		
	}

<span style="color:blue">赶紧制作个小demo测试下吧，PS：在服务器环境下测试（非本地路径）</span>

#### 二、利用cookie.js这个库创建，获取和删除cookie

1、创建cookie：

	$.cookie('name', 'value', { expires: 7, path: '/' });

2、获取cookie：

	$.cookie('name'); // => "value"
	$.cookie('nothing'); // => undefined

Read all available cookies:

	$.cookie(); // => { "name": "value" }

3、删除cookie：

	$.removeCookie('name', { path: '/' });

[cookie.js下载](https://github.com/genhaodegenhao/cookie)