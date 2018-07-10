---
title: js获取url地址中带有的参数
date: 2016-11-03 10:30:30
tags: url 参数
---
### 如何用js获取url地址中带有的参数
如：url = http://www.baidu.com?id=2&http://www.genhao.cn

	function GetUrlValue() {
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i ++) {
				 //url中参数为中文的话可加decodeURI防止乱码
			     theRequest[strs[i].split("=")[0]]=return decodeURI(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
	var Value = new Object();
	Value = GetUrlValue();

如果想要获取url后面的id=index，

	var val = Value["id"];
	console.log(val);  // 2

如果想要获取url（id）后面的参数:

	var val = Value["url"];
	console.log(val);  // http://www.genhao.cn

<h2>亲测可用！</h2>