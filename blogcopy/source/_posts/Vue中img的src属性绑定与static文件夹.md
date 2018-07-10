---
title: Vue中img的src属性
date: 2017-05-10 18:55:21
tags: vue src
---

不少人在vue的开发中遇到这样一个问题： img的src属性绑定url变量，然而图片加载失败。

大部分的情况中，是开发者使用了错误的写法，例如：

	<img src="{{ imgUrl }}"/>

这样写肯定是不对的，正确的写法应该使用v-bind:

	<img v-bind:src="imgUrl"/>

不过，有时候即使使用了正确的语法，依旧无法显示图片，因为你的imgUrl使用了本地图片的路径。
例如，有下面一个文件结构：

![](http://upload-images.jianshu.io/upload_images/2204269-3bc8a440ae7f38fa.png?imageMogr2/auto-orient/strip%7CimageView2/2)

现在，我们要在App.vue里使用位于src/assets/目录下的logo.png图片，于是，我们设：

	imgUrl = './assets/logo.png'

奇怪的事情出现了，图片加载失败。查看网页源代码，发现一个错误：

![](http://upload-images.jianshu.io/upload_images/2204269-50e42d42bbf3519f.png?imageMogr2/auto-orient/strip%7CimageView2/2)

看这个错误代码，我们发现，网页把根域名作为相对路径的根目录了，然而我们文件的路径是相对于项目文件的根目录的，当然就找不到了。

既然这样，那我们去找build后的dist文件夹。发现文件的结构是这样：

是不是说只要把url改成./static/img/logo.png就可以了呢？依然是不行的。打开img文件夹我们可以发现，所有的文件名后都被添加上了一个随机字符串，原始的文件名已经无法对应了。

那么，到底应该怎么加载本地图片呢？回头看vue-cli的文件结构，发现其中有一个叫做static的文件夹，尝试将logo.png放入这个文件夹，然后修改imgUrl：

	imgUrl = '/static/logo.png'

成功读取到了logo.png. 执行npm run build后查看dist文件，发现logo.png原封不动地放在了根目录下。

原来，之前的目录结构是有问题的，图片一类的静态文件，应该放在这个static文件夹下，这个文件夹下的文件（夹）会按照原本的结构放在网站根目录下。这时我们再去使用/static绝对路径，就可以访问这些静态文件了。

##### 一种方法
	<img :src="imgUrl">
	
	 data() {
	    return {
	      imgUrl: './static/img/logo.png'
	 };

##### 另一种方法

直接引用：

	<img src="../static/img/logo.png">