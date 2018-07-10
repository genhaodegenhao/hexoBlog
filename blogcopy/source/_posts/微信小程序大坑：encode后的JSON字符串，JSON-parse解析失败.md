---
title: 微信小程序大坑：encode后的JSON字符串，JSON.parse解析失败
date: 2018-05-24 16:42:14
tags: 微信小程序 JSONparse
---
今天，在写微信小程序的时候遇到JSON.parse的一个大坑。

问题简单描述：

我想在跨页面跳转时传递一个对象以便下个页面可以使用并进行操作；因为url参数是字符串类型，所以要先把obj进行JSON.stringify(obj),下个页面再JSON.parse(obj);思路很简单，但是在JSON.parse(obj)时报以下错误；

	var obj = {
		"name": "genhao",
		"image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114"
	}


![](https://wx2.sinaimg.cn/mw1024/006vSKfZgy1frmiyyhgymj30r105cq3o.jpg)。

查资料：有的说在小程序中JSON.parse不能使用，考虑到安全问题；呵呵呵~

翻墙查资料：<span style="color:red">由于对象中包含 url 属性，JSON.parse 方法无法解析包含"？"、"&"之类的字符;</span>

发现obj中确实有"?"之类的字符；把"?"去掉后不报错了，确定是这个原因导致的。

解决方法：可以将encodeURIComponent(obj)进行编码，把"?"/"&"之类的字符转义，然后在下个页面decodeURIComponent(obj)解码再JSON.parse(obj)就可以成功了。

路漫漫其修远兮~~~