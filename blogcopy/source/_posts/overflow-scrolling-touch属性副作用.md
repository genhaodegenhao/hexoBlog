---
title: -webkit-overflow-scrolling:touch属性副作用--QQ内置浏览器空白处理
date: 2017-12-05 21:30:47
tags: QQ浏览器
---
最近遇到一个看似非常简单但处理起来也比较简单的bug，不卖关子，进入主题：

使用framework7+react写了一个singlePage，IOS下的Safari，微信内置浏览器，谷歌浏览器，QQ浏览器等第三方浏览器均显示正常；

<span style="color:red">唯独QQ内置浏览器出现了不可预见的bug：向下/向上快速滑动页面的时候，页面会出现空白，等滑动结束后内容显示；</span>安卓无此问题。

因为想让页面的滑动效果与原生一样，故添加了-webkit-overflow-scrolling:touch这个属性，（如果不了解这个属性，可参考[这篇文章](https://www.cnblogs.com/wuyinghong/p/7450041.html?utm_source=debugrun&utm_medium=referral)；）增加惯性滑动的效果，页面滑动也像原生那样瞬间流畅了，哈哈；

但是在QQ内置浏览器下快速滑动页面会出现空白，滑动停止后内容才显示，我考虑的是-webkit-overflow-scrolling:touch属性导致的，然后百度搜相关文章/博客均无解，感觉不会再爱了...在最绝望想和产品沟通的时候，无意间翻墙找到了解决的方法，特意分享出来：

	-webkit-backface-visibility: hidden;
	-webkit-transform: translate3d(0,0,0);

在滑动范围的父级添加以上css，即可解决；

表达下我自己的看法：百度不是全能的，偶尔谷歌一下，也可以发现新大陆...