---
title: less学习小总结
date: 2016-12-01 10:55:56
tags: less
---
### less特点
学习一门语言或者技术之前要知道它是什么，怎么使用，有什么特点，能解决什么样的问题。

<p style="color:red">（百度了很多关于less使用的文章，但是都不尽如人意，大多都是介绍less的优点，和sass的对比，至于具体怎样使用说的都是很模糊的，看了文章之后还是不知道怎样着手去做，所以我就自己去摸索，在学习过程中把每一步都进行了总结，希望能帮到想学习less的同源人。）</p>

#### less：

一、它是一门css预处理器

二、使用：安装node（可参考我之前的文章），新建一个项目文件夹，点击右键打开git bash，在终端中输入命令行
	 
	npm install -g less

完成安装之后如下图所示：

![](http://ww2.sinaimg.cn/mw1024/006vSKfZgw1fab5zfzm4yj30om06l401.jpg)
	
在项目文件下新建一个index.less（名字随便起）的文件，然后进行编译，在终端中输入
	
	lessc index.less > index.css

不报错证明编译成功。在html中引入该index.css文件，更改index.less中的代码，需重新编译后同步到index.css文件中。

三、特点：

1、可声明变量：
	
less代码:
	
	@background-color: #ffffff;
	@text-color: #1A237E;
	p{
  		background-color: @background-color;
  		color: @text-color;
  		padding: 15px;
	}
	ul{
  		background-color: @background-color;
	}
	li{
  		color: @text-color;
	}

编译完之后的css代码：

	p{
	    background-color: #ffffff;
	    color: #1A237E;
	    padding: 15px;
	}
	ul{
	    background-color: #ffffff;
	}
	li{
	    color: #1A237E;
	}

<strong>如果需要修改p标签和ul标签的background-color，只需要修改声明的变量即可；</strong>

2、Maxin

Less 允许我们将已有的 class 和 id 的样式应用到另一个不同的选择器上。 下面这个例子可以清楚地说明这一点。

	#circle{
	  background-color: #4CAF50;
	  border-radius: 100%;
	}
	#small-circle{
	  width: 50px;
	  height: 50px;
	  #circle
	}
	#big-circle{
	  width: 100px;
	  height: 100px;
	  #circle
	}

将其转换成 CSS 代码如下
	
	#circle {
	    background-color: #4CAF50;
	    border-radius: 100%;
	}
	#small-circle {
	    width: 50px;
	    height: 50px;
	    background-color: #4CAF50;
	    border-radius: 100%;
	}
	#big-circle {
	    width: 100px;
	    height: 100px;
	    background-color: #4CAF50;
	    border-radius: 100%;
	}

如果你不想 mixin 也以一种规则的形式出现在 CSS 代码中，那么你可以在它的后面加上括号：

	#circle(){
	    background-color: #4CAF50;
	    border-radius: 100%;
	}
	#small-circle{
	    width: 50px;
	    height: 50px;
	    #circle
	}
	#big-circle{
	    width: 100px;
	    height: 100px;
	    #circle
	}

此时编译成 CSS :
	
	#small-circle {
	    width: 50px;
	    height: 50px;
	    background-color: #4CAF50;
	    border-radius: 100%;
	}
	#big-circle {
	    width: 100px;
	    height: 100px;
	    background-color: #4CAF50;
	    border-radius: 100%;
	}

Mixin 另一个比较酷的功能就是它支持传入参数，下面这个例子就为 circle 传入一个指定宽高的参数，默认是 25px。 这将创建一个 25×25的小圆和一个 100×100 的大圆。
	
	#circle(@size: 25px){
	    background-color: #4CAF50;
	    border-radius: 100%;
	    width: @size;
	    height: @size;
	}
	#small-circle{
	    #circle
	}
	#big-circle{
	    #circle(100px)
	}

转换成 CSS :

	#small-circle {
	    background-color: #4CAF50;
	    border-radius: 100%;
	    width: 25px;
	    height: 25px;
	}
	#big-circle {
	    background-color: #4CAF50;
	    border-radius: 100%;
	    width: 100px;
	    height: 100px;
	}

3、嵌套

嵌套可用于以与页面的HTML结构相匹配的方式构造样式表，同时减少了冲突的机会。下面是一个无序列表的例子。

	ul{
	    background-color: #03A9F4;
	    padding: 10px;
	    list-style: none;
	
	    li{
	        background-color: #fff;
	        border-radius: 3px;
	        margin: 10px 0;
	    }
	}

编译成 CSS 代码：

	ul {
	    background-color: #03A9F4;
	    padding: 10px;
	    list-style: none;
	}
	ul li {
	    background-color: #fff;
	    border-radius: 3px;
	    margin: 10px 0;
	}

就像在其它高级语言中一样， Less 的变量根据范围接受它们的值。如果在指定范围内没有关于变量值的声明， less 会一直往上查找，直至找到离它最近的声明。

回到 CSS 中来，我们的 li 标签将有白色的文本，如果我们在 ul 标签中声明 @text-color 规则。

	@text-color: #000000;
	ul{
	    @text-color: #fff;
	    background-color: #03A9F4;
	    padding: 10px;
	    list-style: none;
	    li{
	        color: @text-color;
	        border-radius: 3px;
	        margin: 10px 0;
	    }
	}

编译生成的 CSS 代码如下：

	ul {
	    background-color: #03A9F4;
	    padding: 10px;
	    list-style: none;
	}
	ul li {
	    color: #ffffff;
	    border-radius: 3px;
	    margin: 10px 0;
	}


4、运算

你可以对数值和颜色进行基本的数学运算。比如说我们想要两个紧邻的 div 标签，第二个标签是第一个标签的两倍宽并且拥有不同的背景色。

	@div-width: 100px;
	@color: #03A9F4;
	div{
	    height: 50px;
	    display: inline-block;
	}
	#left{
	    width: @div-width;
	    background-color: @color - 100;
	}
	#right{
	    width: @div-width * 2;
	    background-color: @color;
	}

编译成 CSS 如下：
	
	div {
	    height: 50px;
	    display: inline-block;
	}
	#left {
	    width: 100px;
	    background-color: #004590;
	}
	#right {
	    width: 200px;
	    background-color: #03a9f4;
	}

5、函数

Less 中也有函数，这让它看起来像一门编程语言了，不是吗？

让我们来看一下  fadeout， 一个降低颜色透明度的函数。

	@var: #004590;
	
	div{
	  height: 50px;
	  width: 50px;
	  background-color: @var;
	  &:hover{
	    background-color: fadeout(@var, 50%)
	  }
	}

编译成 CSS 如下所示：

	div {
	    height: 50px;
	    width: 50px;
	    background-color: #004590;
	}
	div:hover {
	    background-color: rgba(0, 69, 144, 0.5);
	}