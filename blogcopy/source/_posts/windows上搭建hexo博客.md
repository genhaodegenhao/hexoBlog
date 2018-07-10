---
title: windows上搭建hexo博客
date: 2016-09-22 16:20:48
tags: windows hexo 博客
---

主要步骤：

在windows上下载的git软件，可在官网上下载（太慢，有时候中间会出现网络错误导致文件下载不下来，亲自试过），强烈建议在电脑上的软件管理上下载，这样可以匹配到自己电脑上的操作系统位数。

安装的过程不说了，成功安装后，随便在某处单机右键会出现Git Bash Here的标志。

安装hexo：

	npm install -g hexo

之后在你喜欢的某盘下（我的在e盘）创建hexo文件夹，cd hexo，单机右键选择git bash here，输入命令行
	
	hexo init
	hexo generate
	hexo server

一个命令一个命令来，输入hexo s（hexo server）后会出现一个localhost:4000的连接，复制到浏览器中可以观看搭建好的博客。

<span style="color:red">在windows上搭建hexo博客跟在mac上大致一样，可参考我之前发布的文章。</span>

文档编写：

mac上可以选择Mou这个软件编写.md的文档，windows上可以用MarkdownPad2,<a href="http://markdownpad.com/">前去下载</a>