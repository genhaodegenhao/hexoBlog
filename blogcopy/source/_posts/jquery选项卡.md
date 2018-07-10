---
title: jquery选项卡
date: 2017-08-18 18:03:31
tags:
---
html：

	<ul class="tab">
	       <li>最新</li>
	       <li class="cur">热门</li>
	       <li>新闻</li>
	 </ul>
	 <div>11</div>
	 <div class="on">22</div>
	 <div>33</div>

css：

	div{margin:0;padding:0;width:184px;height:200px;border:1px solid #ccc;display:none;}
	.tab{margin:0;padding:0;list-style:none;width:200px;overflow:hidden;}
	.tab li{float:left;width:60px;height:30px;background:#ccc;color:#fff;border:1px solid red; text-align:center;line-height:30px;cursor:pointer; }
	.on{display:block;}
	.tab li.cur{background:blue;}

js:

	  $(document).ready(function(){
	        $(".tab li").click(function(){
	        $(".tab li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
	$("div").hide().eq($(this).index()).show();
	       //另一种方法: 
			$("div").eq($(".tab li").index(this)).addClass("on").siblings().removeClass('on'); 
	        });
	    });

<span style="color:red">mark:了解eq(),index(),siblings()函数。</span>

第一种方法解释：

$(this).index()表示点击当前元素的索引值，

eq($(this).index())表示匹配点击的当前元素，

siblings()表示同级元素，在此表示与li的同级元素。