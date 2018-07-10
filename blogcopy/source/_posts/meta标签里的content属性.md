---
title: meta标签里的content属性
date: 2016-09-26 17:25:30
tags: meta content
---
### META
meta标签分两大部分：HTTP标题信息（http-equiv）和页面描述信息（name）。

	<meta name="apple-touch-fullscreen" content="yes">
添加到主屏幕“后，全屏显示

	<meta name="apple-mobile-web-app-capable" content="yes" />
这meta的作用就是删除默认的苹果工具栏和菜单栏。

content有两个值”yes”和”no”,当我们需要显示工具栏和菜单栏时，这个行meta就不用加了，默认就是显示。

	<meta name=”apple-mobile-web-app-status-bar-style” content=black” /> 
默认值为default（白色），可以定为black（黑色）和black-translucent（灰色半透明）。

### 一般放这三个足已
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<meta http-equiv="description" name="description" content="描述">
	<meta name="keywords" http-equiv="keywords" content="关键字">