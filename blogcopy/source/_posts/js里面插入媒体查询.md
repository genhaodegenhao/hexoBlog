---
title: js里面插入媒体查询
date: 2016-11-11 10:20:30
tags: js 媒体查询
---
### js里面插入媒体查询

	var mq=window.matchMedia('screen and (min-width: 800px)');

	//当媒体查询的状态改变时,例如页面由799变成了801px
	mq.addListener(widthWatch);
	function widthWatch(){
   		if(mq.matches){
        	//........满足条件
    	}else{
        	//........
    	}
	}
	widthWatch();