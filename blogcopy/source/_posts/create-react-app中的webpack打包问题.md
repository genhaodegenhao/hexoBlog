---
title: create-react-app中的webpack项目打包问题
date: 2017-08-08 12:00:00
tags: react webpack
---
#### 使用create-react-app创建一个react模板，

1、在终端中输入:
	
	npm install -g create-react-app

2、使用create-react-app创建一个react项目：
	
	create-ract-app myFirstApp

3、安装所需插件：

	npm install

4、接下来就可以运行该项目了

	npm start

#### 项目打包
项目的打包可以直接输入以下指令：
	
	npm run build

此时项目中会多出一个build的文件夹，里面是我们打包好的静态文件，可以直接把该文件放在服务器上去访问。

#### 注意：
1、访问线上的index.html时，出现空白页面，并且在console中有报错；

原因：引入的文件（css和js）的路径是绝对路径；

解决方法：把绝对路径改为相对路径即可访问；

步骤：

a)、运行以下指令将隐藏的配置文件显示出来：

	npm run eject

b)、找到config文件夹下的path.js文件，找到如下的代码，pathname的绝对路径改为相对路径，

	const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');

改为：
	
	const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : './');
	
2、打包后的css和js文件会多出一个.map的文件；

解决方法：打开config文件夹下的webpack.config.prod.js文件，找到devtool: 'source-map',大约在55行，把此行注释掉即可；
