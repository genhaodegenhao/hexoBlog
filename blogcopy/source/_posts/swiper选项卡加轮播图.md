---
title: swiper选项卡加轮播图
date: 2016-07-13 11:04:46
tags: swiper 选项卡 hover效果
---
### swiper带有轮播图和hover效果的选项卡

在API中找到  <span style="color:red"> paginationBulletRender </span>属性，这个属性带两个参数，一个是 <span style="color:red">index，</span>表示slider的个数，有几个slider就出现几个圆点（默认的，可以更改其样式）；另一个是 <span style="color:red">className，</span>表示span里面的选择器swiper-pagination-bullet，可以更改其圆点的形状，大小，背景颜色等样式。

###  1)、点击按钮切换slider页面：

	var mySwiper = new Swiper('.swiper-container', {
	    autoplay:3000,
	    loop:true,
	    pagination: '.swiper-pagination',
	    paginationClickable: true,          //点击圆点切换slider，在鼠标悬停切换页面时，这句话必须加上并设置为true。
	    paginationBulletRender: function (index, className) {
		    switch (index) {                    //index表示数字，从0开始；
		      case 0: name='swiper应用';
		      	break;
		      case 1: name='swiper教程';
		      	break;
		      case 2: name='swiper介绍';
		      	break;
		      default: name='';
		    }
	     	return '<span class="' + className + '">' + name + '</span>';
	    },
	}); 
	
### 2)、鼠标悬停（类似hover效果）切换页面：

在swiper.js库里找到 paginationContainer[a]，在529行，后面的<span style="color:red"> ”click”</span>改为<span style="color:red"> ”mouseover"</span>即可。

如果想改变页面切换的速度，可以在162行的<span style="color:red">speed</span>中更改，默认是300。

<span style="color:red">自己总结的，希望可以帮到你~ ~ ~</span>