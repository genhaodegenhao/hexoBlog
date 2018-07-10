---
title: clip
date: 2016-07-09 14:23:30
tags: clip 裁剪
---
### 关于clip的小总结
clip是用来检索和设置对象的可视区域，必须和绝对定位(position:absolute)结合使用。

clip 属性基础语法：

	clip:rect(top,right,bottom,left);
	
四个方向都是相对于左上角(0,0)位置的偏移，现代主流浏览器都支持该属性。

直接上栗子：

	<div class="wrap">
		<div class="circle left"></div>
		<div class="circle right"></div>
	</div>

步骤：
	
1、先画一个圆（做个例子，画法次要），如图：

![](http://ww2.sinaimg.cn/mw690/006vSKfZgw1f5nng2gxivj306706bdfr.jpg);


2、裁剪左半圆：

![](http://ww3.sinaimg.cn/mw690/006vSKfZgw1f5nng1kldoj304y05edfo.jpg);
	
假使这个圆的半径为50px,则<span style="color:red">clip:rect(0,50px,100px,0);</span>

白话：距左上角(0,0)top为0；right为圆的一半，即50px；bottom为圆的直径，即100px；left为0。	
3、裁剪右半圆：

![](http://ww4.sinaimg.cn/mw690/006vSKfZgw1f5nng218wcj304605d0sk.jpg);

同理右半圆：<span style="color:red">clip:rect(0,100px,100px,50px);</span>