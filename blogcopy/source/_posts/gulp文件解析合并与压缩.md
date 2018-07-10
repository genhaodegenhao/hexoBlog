---
title: 文件解析合并与压缩
date: 2016-05-17 17:25:31
tags: 解析 合并 压缩
---
### 文件解析
gulp在开发过程中是异常好用的工具，为什么这么说呢，那是因为你还没有接触过jade,less,coffee,这些文件是网页的内容的另一种形式，不知道的可以去百度一下！！！代码很简单，但是不能完全被浏览器解析，也许在将来的某一天，浏览器就能支持了呢，所以现在解析的重担还要我们来扛，用了这个那都不是事！！！废话不多说，赶紧开始吧！

#### 解析less文件-css
#### 下载名为gulp-less的插件：

	$ npm install gulp-less --save-dev
	
出现如下图横线所示表示安装完成

![](http://ww4.sinaimg.cn/mw690/005SH7k8gw1f3zbrod7ocj308l03rq3f.jpg)

#### 打开gulpfile.js文件
填写如下代码：
![](http://ww4.sinaimg.cn/mw690/005SH7k8gw1f3zc7fnu0uj30ot04hq4z.jpg)

保存，回到终端，在项目文件夹中输入：
	
	$ gulp less
	
执行完成后会在css文件夹下生成一个以后缀为.css的文件，解析成功！

<span style="color:skyblue;">解析文件的命令大同小异，我就不一一列举了，下面给出需要下载库的名称，在gulpfile.js里面require一下。</span>

* **gulp-jade 将jade文件解析成html**

* **gulp-coffee 将coffee文件解析成js**

### 文件合并
	$ npm install gulp-concat --save-dev
	
下载完之后，也要在gulpfile.js里写合并任务：

![](http://ww3.sinaimg.cn/mw690/005SH7k8gw1f3zcbzppp5j30b804ft9t.jpg)

执行完成后会在html文件夹下合并成一个以后缀为.html的文件。

**当然css和js都可以用这一个任务执行，只要更改文件路径，格式，合成名称及格式，输出地址就行了。**

### 文件压缩
	$ npm install gulp-jsmin --save-dev

下载完成后，打开gulpfile.js书写任务：

![](http://ww3.sinaimg.cn/mw690/005SH7k8gw1f3zc7en6nxj30ap04cgmn.jpg)

执行完成后会在js文件夹下压缩成一个以后缀为.js的文件。